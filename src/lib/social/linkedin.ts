import type { PublishInput, PublishResult, SocialPublisher } from "./types";

// LinkedIn access tokens on the default ("Share on LinkedIn" + "Sign In with
// LinkedIn using OpenID Connect") product tier have no refresh token — a
// fresh browser auth (`npm run social:auth:linkedin`) is required roughly
// every ~60 days. Warn ahead of the hard cutoff rather than surfacing a bare
// 401 from the API.
const EXPIRY_WARNING_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

// LinkedIn requires this to be bumped periodically as new API versions ship.
const LINKEDIN_API_VERSION = "202405";

function isConfigured(): { ok: true } | { ok: false; reason: string } {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;
  const expiresAt = process.env.LINKEDIN_TOKEN_EXPIRES_AT;

  if (!token || !personUrn) {
    return {
      ok: false,
      reason: "LinkedIn is not connected yet — run `npm run social:auth:linkedin`.",
    };
  }

  if (expiresAt) {
    const expiresAtMs = new Date(expiresAt).getTime();
    if (Number.isFinite(expiresAtMs) && expiresAtMs - Date.now() < EXPIRY_WARNING_WINDOW_MS) {
      return {
        ok: false,
        reason: `LinkedIn token expires ${expiresAt} — run \`npm run social:auth:linkedin\` to reconnect.`,
      };
    }
  }

  return { ok: true };
}

async function publish(input: PublishInput): Promise<PublishResult> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN!;
  const personUrn = process.env.LINKEDIN_PERSON_URN!;

  const response = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      "LinkedIn-Version": LINKEDIN_API_VERSION,
    },
    body: JSON.stringify({
      author: personUrn,
      commentary: input.text,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      content: {
        article: {
          source: input.url,
          title: input.post.title,
          description: input.post.excerpt,
        },
      },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return { platform: "linkedin", ok: false, error: `LinkedIn API ${response.status}: ${body}` };
  }

  const urn = response.headers.get("x-restli-id");
  return {
    platform: "linkedin",
    ok: true,
    id: urn ?? undefined,
    postUrl: urn ? `https://www.linkedin.com/feed/update/${urn}/` : undefined,
  };
}

export const linkedinPublisher: SocialPublisher = {
  name: "linkedin",
  isConfigured,
  publish,
};
