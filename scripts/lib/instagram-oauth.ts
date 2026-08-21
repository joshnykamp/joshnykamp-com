const GRAPH_API_VERSION = "v20.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export async function exchangeForLongLivedToken(
  shortLivedToken: string,
  appId: string,
  appSecret: string
): Promise<{ access_token: string; expires_in: number }> {
  const url = new URL(`${GRAPH_API_BASE}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("fb_exchange_token", shortLivedToken);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Long-lived token exchange failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

/** Resolves the Facebook Page + linked Instagram Business Account from a long-lived user token. */
export async function resolveInstagramAccount(
  longLivedUserToken: string
): Promise<{ pageAccessToken: string; instagramBusinessAccountId: string }> {
  const accountsUrl = new URL(`${GRAPH_API_BASE}/me/accounts`);
  accountsUrl.searchParams.set("access_token", longLivedUserToken);

  const accountsResponse = await fetch(accountsUrl);
  if (!accountsResponse.ok) {
    throw new Error(`Failed to list Facebook Pages: ${accountsResponse.status} ${await accountsResponse.text()}`);
  }

  const { data } = (await accountsResponse.json()) as {
    data: Array<{ id: string; access_token: string; name: string }>;
  };

  if (!data || data.length === 0) {
    throw new Error("No Facebook Pages found for this account — link a Page to your Instagram account first.");
  }

  const page = data[0];

  const pageUrl = new URL(`${GRAPH_API_BASE}/${page.id}`);
  pageUrl.searchParams.set("fields", "instagram_business_account");
  pageUrl.searchParams.set("access_token", page.access_token);

  const pageResponse = await fetch(pageUrl);
  if (!pageResponse.ok) {
    throw new Error(`Failed to resolve Instagram account: ${pageResponse.status} ${await pageResponse.text()}`);
  }

  const pageJson = (await pageResponse.json()) as { instagram_business_account?: { id: string } };
  if (!pageJson.instagram_business_account) {
    throw new Error(
      `Facebook Page "${page.name}" has no linked Instagram Business/Creator account.`
    );
  }

  return {
    pageAccessToken: page.access_token,
    instagramBusinessAccountId: pageJson.instagram_business_account.id,
  };
}
