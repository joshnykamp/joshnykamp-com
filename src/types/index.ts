export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  readingTime: string;
  ogImage?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export interface Photo {
  id: number;
  src: string;
  alt: string;
  collection: string;
  location?: string;
}
