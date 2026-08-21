#!/usr/bin/env tsx
/**
 * Re-exchanges the stored Instagram long-lived user token for a fresh
 * ~60-day one — a sliding refresh, no browser interaction needed, as long
 * as the current token hasn't fully expired yet. Run this monthly.
 *
 * If INSTAGRAM_LONG_LIVED_USER_TOKEN has already lapsed, this will fail —
 * run `npm run social:auth:instagram` for a full re-auth instead.
 *
 * Usage: npm run social:refresh:instagram
 */
import { loadEnv, upsertEnvLocal } from "./lib/env-file";
import { exchangeForLongLivedToken, resolveInstagramAccount } from "./lib/instagram-oauth";

async function main() {
  loadEnv();

  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const currentToken = process.env.INSTAGRAM_LONG_LIVED_USER_TOKEN;

  if (!appId || !appSecret || !currentToken) {
    console.error(
      "Missing FACEBOOK_APP_ID/FACEBOOK_APP_SECRET/INSTAGRAM_LONG_LIVED_USER_TOKEN — run `npm run social:auth:instagram` first."
    );
    process.exit(1);
  }

  const { access_token: refreshedToken, expires_in } = await exchangeForLongLivedToken(
    currentToken,
    appId,
    appSecret
  );

  const { pageAccessToken, instagramBusinessAccountId } = await resolveInstagramAccount(refreshedToken);
  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  upsertEnvLocal({
    INSTAGRAM_LONG_LIVED_USER_TOKEN: refreshedToken,
    INSTAGRAM_ACCESS_TOKEN: pageAccessToken,
    INSTAGRAM_BUSINESS_ACCOUNT_ID: instagramBusinessAccountId,
    INSTAGRAM_TOKEN_EXPIRES_AT: expiresAt,
  });

  console.log(`✓ Instagram token refreshed — expires ${expiresAt}`);
}

main().catch((error) => {
  console.error(`✗ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
