"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, posts, type BlogPost } from "@/lib/blog";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7d52f4]";

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="flex flex-wrap gap-x-1.5 text-[14px] leading-6 tracking-[0.16px] text-[#777169] sm:text-[16px]">
        <span className="whitespace-nowrap">{post.author} ·</span>
        <span className="whitespace-nowrap">{post.date} ·</span>
        <span className="whitespace-nowrap">{post.readTime}</span>
      </p>
      <img src="/blog/arrow-up-right.svg" alt="" width={25} height={25} className="size-[22px] shrink-0 sm:size-[25px]" />
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-[13px] leading-5 font-light tracking-[2px] text-[#5c5c5c] uppercase sm:text-[14px]">{children}</p>;
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid overflow-hidden rounded-[20px] bg-[#f5f5f7] lg:h-[407px] lg:grid-cols-[49.5%_1fr] ${focus}`}
    >
      <div className="relative aspect-[16/9] border-b border-[#d7d6d0] lg:aspect-auto lg:border-r lg:border-b-0">
        <img src={post.image} alt={post.imageAlt} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex flex-col justify-between gap-8 px-6 py-8 sm:px-7 lg:py-[51px]">
        <div className="flex flex-col gap-3">
          <Eyebrow>{post.tag}</Eyebrow>
          <h2 className="max-w-[440px] text-[26px] leading-[1.1] font-semibold tracking-[-0.32px] text-black group-hover:underline sm:text-[32px] sm:leading-[33px]">
            {post.title}
          </h2>
          <p className="max-w-[597px] text-[16px] leading-5 text-black/60">{post.excerpt}</p>
        </div>
        <Meta post={post} />
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col gap-[18px] overflow-hidden rounded-[20px] bg-[#f5f5f7] pb-8 ${focus}`}
    >
      <div className="relative h-[240px] border-b border-[#d7d6d0] bg-black sm:h-[326px]">
        <img src={post.image} alt={post.imageAlt} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 px-6 sm:px-7">
        <Eyebrow>{post.tag}</Eyebrow>
        <div className="flex flex-col gap-2">
          <h3 className="text-[22px] leading-[1.35] font-semibold tracking-[-0.22px] text-black group-hover:underline">
            {post.title}
          </h3>
          <p className="text-[16px] leading-5 text-black/60">{post.excerpt}</p>
        </div>
      </div>
      <div className="mt-auto px-6 sm:px-7">
        <Meta post={post} />
      </div>
    </Link>
  );
}

export function BlogIndex() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const visible = active === "All" ? posts : posts.filter((post) => post.category === active);
  const featured = active === "All" ? visible[0] : undefined;
  const rest = featured ? visible.slice(1) : visible;

  return (
    <main className="bg-[#fafaf8]">
      <section className="mx-auto flex w-full max-w-[1397px] flex-col gap-8 px-4 pt-28 pb-14 sm:pt-[206px] sm:pb-[117px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-[clamp(44px,7vw,72px)] leading-[1.14] font-normal text-black">
            From the <span className="text-[#7d52f4]">KLKT</span> team
          </h1>
          <p className="max-w-[736px] text-[18px] leading-[1.45] text-black/60 sm:text-[22px] sm:leading-8">
            Product updates, engineering deep-dives, and how teams are turning their context into software that runs itself.
          </p>
        </div>

        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((category) => {
            const selected = category === active;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-[8px] px-4 py-2 text-[14px] leading-5 font-medium transition-colors ${
                  selected ? "bg-[#7d52f4] text-white" : "bg-white text-[#7d52f4] hover:bg-[#f1ecfe]"
                } ${focus}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {featured ? <FeaturedCard post={featured} /> : null}

        {rest.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : null}

        {visible.length === 0 ? (
          <p className="rounded-[20px] bg-[#f5f5f7] px-7 py-16 text-center text-[18px] text-black/60">
            No posts in {active} yet.
          </p>
        ) : null}
      </section>
    </main>
  );
}
