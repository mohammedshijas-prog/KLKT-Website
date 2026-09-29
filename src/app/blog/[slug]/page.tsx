import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7d52f4]";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} · KLKT`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const readNext = posts.filter((other) => other.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-[#fafaf8]">
      <div className="mx-auto grid w-full max-w-[1526px] gap-10 px-4 pt-28 pb-14 sm:pt-[222px] sm:pb-[117px] lg:grid-cols-[minmax(0,1103px)_371px] lg:justify-center lg:gap-5">
        <article className="flex min-w-0 flex-col gap-10 sm:gap-16">
          <header className="flex flex-col gap-3">
            <h1 className="max-w-[1000px] text-[clamp(38px,6vw,72px)] leading-[1.14] font-normal text-black">
              {post.title}
            </h1>
            <p className="text-[17px] leading-8 font-medium text-[#5c5c5c] sm:text-[22px]">
              {post.author} · {post.date} · {post.readTime}
            </p>
          </header>

          <div className="relative aspect-[1103/486] overflow-hidden rounded-[20px] border border-[#9a8f8f] bg-black">
            <img src={post.image} alt={post.imageAlt} className="absolute inset-0 size-full object-cover" />
          </div>

          {post.body.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="text-[28px] leading-[1.15] font-medium text-black sm:text-[36px]">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "image") {
              return (
                <div key={index} className="relative aspect-[1103/395] overflow-hidden rounded-[22px] bg-[#dcd8fc]">
                  <img src={block.src} alt={block.alt} className="absolute inset-0 size-full object-cover" />
                </div>
              );
            }
            return (
              <div key={index} className="flex flex-col gap-6 text-[17px] leading-[1.6] font-medium text-[#5c5c5c] sm:text-[22px] sm:leading-8">
                {block.items.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            );
          })}
        </article>

        <aside aria-labelledby="related-topics" className="lg:sticky lg:top-[120px] lg:self-start">
          <div className="flex flex-col gap-6 rounded-[20px] bg-[#fefefe] p-7">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[12px] font-medium tracking-[0.96px] text-[#5c5c5c] uppercase">Explore</p>
              <h2 id="related-topics" className="text-[28px] leading-[34px] font-medium text-[#1f1f1f]">
                Related topics
              </h2>
            </div>
            <ul className="flex flex-col gap-4">
              {post.topics.map((topic) => (
                <li key={topic} className="flex flex-col gap-2.5">
                  <Link href="/blog" className={`text-[18px] leading-6 font-medium text-[#1f1f1f] hover:text-[#7d52f4] ${focus}`}>
                    {topic}
                  </Link>
                  <span aria-hidden className="h-px w-full bg-[#d8d1d1] opacity-80" />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mx-auto w-full max-w-[1574px] px-4 pb-14 sm:pb-32">
        <h2 className="text-[clamp(38px,5vw,59px)] leading-[1.1] font-normal text-black">Read next</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-6">
          {readNext.map((other) => (
            <Link key={other.slug} href={`/blog/${other.slug}`} className={`group flex flex-col gap-3 ${focus}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-black sm:aspect-square sm:rounded-[29px]">
                <img
                  src={other.image}
                  alt={other.imageAlt}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="max-w-[493px] text-[24px] leading-[33px] font-normal text-black group-hover:underline sm:text-[28px]">
                {other.title}
              </h3>
              <div className="flex gap-[45px] text-[16px] leading-6 tracking-[0.16px] text-[#777169]">
                <span>{other.date}</span>
                <span>{other.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
