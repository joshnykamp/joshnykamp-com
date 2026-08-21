import { linkedinPublisher } from "./linkedin";
import { instagramPublisher } from "./instagram";
import type { SocialPublisher } from "./types";

export const PUBLISHERS: Record<string, SocialPublisher> = {
  linkedin: linkedinPublisher,
  instagram: instagramPublisher,
};

export type { PublishInput, PublishResult, SocialPublisher } from "./types";
export { buildLinkedInText, buildInstagramCaption } from "./captions";
