#!/usr/bin/env tsx
/**
 * One-time interactive OAuth flow for LinkedIn posting access.
 *
 * Requires a LinkedIn Developer app already associated with a Company Page,
 * with the "Share on LinkedIn" and "Sign In with LinkedIn using OpenID
 * Connect" products added — see docs/social-publishing.md for that
 * (unavoidably manual) setup. This script just does the OAuth dance and
 * writes the resulting token into .env.local.
 *
 * Usage: npm run social:auth:linkedin
 */
import http from "http";
import crypto from "crypto";
import { loadEnv, upsertEnvLocal, readEnvLocal } from "./lib/env-file";
import { prompt, tryOpenBrowser } from "./lib/prompt";

const REDIRECT_PORT = 8765;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`;
const SCOPES = "openid profile w_member_social";

async function getClientCredentials() {
  loadEnv();

  let clientId = process.env.LINKEDIN_CLIENT_ID ?? readEnvLocal("LINKEDIN_CLIENT_ID");
  let clientSecret = process.env.LINKEDIN_CLIENT_SECRET ?? readEnvLocal("LINKEDIN_CLIENT_SECRET");

  if (!clientId) clientId = await prompt("LinkedIn Client ID: ");
  if (!clientSecret) clientSecret = await prompt("LinkedIn Client Secret: ");

  upsertEnvLocal({ LINKEDIN_CLIENT_ID: clientId, LINKEDIN_CLIENT_SECRET: clientSecret });

  return { clientId, clientSecret };
}

function waitForCallback(expectedState: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url ?? "", REDIRECT_URI);
      if (url.pathname !== "/callback") {
        res.writeHead(404).end();
        return;
      }

      const state = url.searchParams.get("state");
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<html><body>You can close this tab and return to the terminal.</body></html>");
      server.close();

      if (error) return reject(new Error(`LinkedIn authorization failed: ${error}`));
      if (state !== expectedState) return reject(new Error("State mismatch — possible CSRF, aborting."));
      if (!code) return reject(new Error("No authorization code returned."));

      resolve(code);
    });

    server.listen(REDIRECT_PORT);
  });
}

async function exchangeCodeForToken(
  code: string,
  clientId: string,
  clientSecret: string
): Promise<{ access_token: string; expires_in: number }> {
  const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function fetchPersonUrn(accessToken: string): Promise<string> {
  const response = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to resolve LinkedIn member id: ${response.status} ${await response.text()}`);
  }

  const { sub } = (await response.json()) as { sub: string };
  return `urn:li:person:${sub}`;
}

async function main() {
  const { clientId, clientSecret } = await getClientCredentials();
  const state = crypto.randomBytes(16).toString("hex");

  const authUrl = new URL("https://www.linkedin.com/oauth/v2/authorization");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId!);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("state", state);

  console.log("\nOpening LinkedIn authorization in your browser...");
  console.log(`If it doesn't open automatically, visit:\n${authUrl.toString()}\n`);
  tryOpenBrowser(authUrl.toString());

  const code = await waitForCallback(state);
  console.log("Authorization received, exchanging for an access token...");

  const { access_token, expires_in } = await exchangeCodeForToken(code, clientId!, clientSecret!);
  const personUrn = await fetchPersonUrn(access_token);
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  upsertEnvLocal({
    LINKEDIN_ACCESS_TOKEN: access_token,
    LINKEDIN_PERSON_URN: personUrn,
    LINKEDIN_TOKEN_EXPIRES_AT: expiresAt,
  });

  console.log(`\n✓ LinkedIn connected as ${personUrn}`);
  console.log(`  Token expires ${expiresAt} — re-run this script to reconnect after that.`);
}

main().catch((error) => {
  console.error(`\n✗ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
