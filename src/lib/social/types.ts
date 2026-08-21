import type { Post } from "@/types";

export interface PublishInput {
  post: Post;
  url: string;
  text: string;
}

export interface PublishResult {
  platform: string;
  ok: boolean;
  postUrl?: string;
  id?: string;
  error?: string;
}

export interface SocialPublisher {
  name: string;
  isConfigured(): { ok: true } | { ok: false; reason: string };
  publish(input: PublishInput): Promise<PublishResult>;
}
