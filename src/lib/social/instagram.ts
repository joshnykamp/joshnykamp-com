import { SITE_URL, OG_DEFAULT_IMAGE } from "@/lib/site";
import type { PublishInput, PublishResult, SocialPublisher } from "./types";

const GRAPH_API_VERSION = "v20.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

// Instagram/Facebook long-lived tokens don't auto-refresh — a sliding
// re-exchange (`npm run social:refresh:instagram`) has to run before this
// expires, or a full re-auth (`npm run social:auth:instagram`) is needed.
const EXPIRY_WARNING_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const MEDIA_STATUS_POLL_ATTEMPTS = 10;
const MEDIA_STATUS_POLL_DELAY_MS = 2000;

function isConfigured(): { ok: true } | { ok: false; reason: string } {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const expiresAt = process.env.INSTAGRAM_TOKEN_EXPIRES_AT;

  if (!token || !accountId) {
    return {
      ok: false,
      reason: "Instagram is not connected yet — run `npm run social:auth:instagram`.",
    };
  }

  if (expiresAt) {
    const expiresAtMs = new Date(expiresAt).getTime();
    if (Number.isFinite(expiresAtMs) && expiresAtMs - Date.now() < EXPIRY_WARNING_WINDOW_MS) {
      return {
        ok: false,
        reason: `Instagram token expires ${expiresAt} — run \`npm run social:refresh:instagram\` to renew it.`,
      };
    }
  }

  return { ok: true };
}

function resolveImageUrl(post: PublishInput["post"]): string {
  return `${SITE_URL}${post.ogImage ?? OG_DEFAULT_IMAGE}`;
}

async function graphRequest(path: string, params: Record<string, string>) {
  const url = new URL(`${GRAPH_API_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const response = await fetch(url, { method: "POST" });
  const json = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error(`Instagram Graph API ${response.status}: ${JSON.stringify(json)}`);
  }

  return json;
}

async function graphGet(path: string, params: Record<string, string>) {
  const url = new URL(`${GRAPH_API_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const response = await fetch(url);
  const json = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error(`Instagram Graph API ${response.status}: ${JSON.stringify(json)}`);
  }

  return json;
}

async function waitForMediaReady(creationId: string, accessToken: string): Promise<void> {
  for (let attempt = 0; attempt < MEDIA_STATUS_POLL_ATTEMPTS; attempt++) {
    const status = await graphGet(`/${creationId}`, {
      fields: "status_code",
      access_token: accessToken,
    });

    if (status.status_code === "FINISHED") return;
    if (status.status_code === "ERROR") {
      throw new Error(`Instagram media container failed to process: ${JSON.stringify(status)}`);
    }

    await new Promise((resolve) => setTimeout(resolve, MEDIA_STATUS_POLL_DELAY_MS));
  }

  throw new Error("Instagram media container did not finish processing in time.");
}

async function publish(input: PublishInput): Promise<PublishResult> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN!;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID!;
  const imageUrl = resolveImageUrl(input.post);

  try {
    const created = await graphRequest(`/${accountId}/media`, {
      image_url: imageUrl,
      caption: input.text,
      access_token: accessToken,
    });
    const creationId = created.id as string;

    await waitForMediaReady(creationId, accessToken);

    const published = await graphRequest(`/${accountId}/media_publish`, {
      creation_id: creationId,
      access_token: accessToken,
    });
    const mediaId = published.id as string;

    const media = await graphGet(`/${mediaId}`, {
      fields: "permalink",
      access_token: accessToken,
    });

    return {
      platform: "instagram",
      ok: true,
      id: mediaId,
      postUrl: (media.permalink as string) ?? undefined,
    };
  } catch (error) {
    return {
      platform: "instagram",
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export const instagramPublisher: SocialPublisher = {
  name: "instagram",
  isConfigured,
  publish,
};
