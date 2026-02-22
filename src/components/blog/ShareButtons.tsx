"use client";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      label: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encoded}`,
    },
    {
      label: "Twitter/X",
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById("copy-link-btn");
      if (btn) {
        btn.textContent = "Copied!";
        setTimeout(() => { if (btn) btn.textContent = "Copy link"; }, 2000);
      }
    });
  };

  return (
    <div>
      <p className="label-mono mb-4">Share this post</p>
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            {p.label} →
          </a>
        ))}
        <button
          id="copy-link-btn"
          onClick={copyLink}
          className="btn-outline text-sm"
        >
          Copy link
        </button>
      </div>
    </div>
  );
}
