import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";
import { ShareButtons } from "@/components/blog/ShareButtons";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: post.ogImage ?? OG_DEFAULT_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="container-content max-w-2xl py-20">
      <header className="mb-12 pb-8 border-b border-stone-700">
        <p className="label-mono mb-4">{post.category}</p>
        <h1 className="heading-display text-3xl md:text-5xl mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-stone-500 text-sm font-mono">
          <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none mb-16">
        <MDXRemote source={post.content} />
      </div>

      <footer className="border-t border-stone-700 pt-10">
        <ShareButtons url={`${SITE_URL}/blog/${post.slug}`} title={post.title} />
      </footer>
    </article>
  );
}
