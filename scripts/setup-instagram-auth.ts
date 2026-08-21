#!/usr/bin/env tsx
/**
 * One-time interactive OAuth flow for Instagram posting access.
 *
 * Requires: an Instagram account converted to Professional (Business/
 * Creator), linked to a Facebook Page, and a Meta developer app with the
 * Instagram Graph API product added — see docs/social-publishing.md for
 * that (unavoidably manual) setup. This script does the OAuth dance and
 * writes the resulting tokens into .env.local.
 *
 * Usage: npm run social:auth:instagram
 */
import http from "http";
import crypto from "crypto";
import { loadEnv, upsertEnvLocal, readEnvLocal } from "./lib/env-file";
import { prompt, tryOpenBrowser } from "./lib/prompt";
import { exchangeForLongLivedToken, resolveInstagramAccount } from "./lib/instagram-oauth";

const REDIRECT_PORT = 8766;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`;
const SCOPES = "instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement";

async function getAppCredentials() {
  loadEnv();

  let appId = process.env.FACEBOOK_APP_ID ?? readEnvLocal("FACEBOOK_APP_ID");
  let appSecret = process.env.FACEBOOK_APP_SECRET ?? readEnvLocal("FACEBOOK_APP_SECRET");

  if (!appId) appId = await prompt("Facebook App ID: ");
  if (!appSecret) appSecret = await prompt("Facebook App Secret: ");

  upsertEnvLocal({ FACEBOOK_APP_ID: appId, FACEBOOK_APP_SECRET: appSecret });

  return { appId, appSecret };
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

      if (error) return reject(new Error(`Facebook authorization failed: ${error}`));
      if (state !== expectedState) return reject(new Error("State mismatch — possible CSRF, aborting."));
      if (!code) return reject(new Error("No authorization code returned."));

      resolve(code);
    });

    server.listen(REDIRECT_PORT);
  });
}

async function exchangeCodeForShortLivedToken(
  code: string,
  appId: string,
  appSecret: string
): Promise<string> {
  const url = new URL("https://graph.facebook.com/v20.0/oauth/access_token");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("code", code);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status} ${await response.text()}`);
  }

  const { access_token } = (await response.json()) as { access_token: string };
  return access_token;
}

async function main() {
  const { appId, appSecret } = await getAppCredentials();
  const state = crypto.randomBytes(16).toString("hex");

  const authUrl = new URL("https://www.facebook.com/v20.0/dialog/oauth");
  authUrl.searchParams.set("client_id", appId!);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("state", state);

  console.log("\nOpening Facebook/Instagram authorization in your browser...");
  console.log(`If it doesn't open automatically, visit:\n${authUrl.toString()}\n`);
  tryOpenBrowser(authUrl.toString());

  const code = await waitForCallback(state);
  console.log("Authorization received, exchanging for tokens...");

  const shortLivedToken = await exchangeCodeForShortLivedToken(code, appId!, appSecret!);
  const { access_token: longLivedToken, expires_in } = await exchangeForLongLivedToken(
    shortLivedToken,
    appId!,
    appSecret!
  );

  const { pageAccessToken, instagramBusinessAccountId } = await resolveInstagramAccount(longLivedToken);
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  upsertEnvLocal({
    INSTAGRAM_LONG_LIVED_USER_TOKEN: longLivedToken,
    INSTAGRAM_ACCESS_TOKEN: pageAccessToken,
    INSTAGRAM_BUSINESS_ACCOUNT_ID: instagramBusinessAccountId,
    INSTAGRAM_TOKEN_EXPIRES_AT: expiresAt,
  });

  console.log(`\n✓ Instagram connected (business account ${instagramBusinessAccountId})`);
  console.log(`  Token expires ${expiresAt} — run \`npm run social:refresh:instagram\` before then.`);
}

main().catch((error) => {
  console.error(`\n✗ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
