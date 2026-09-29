export const categories = ["All", "3D", "Audio", "Document", "Geospatial", "Image", "Tabular", "Text"] as const;

export type Category = Exclude<(typeof categories)[number], "All">;

export type BlogBlock =
  | { type: "paragraphs"; items: string[] }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  category: Category;
  author: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  topics: string[];
  body: BlogBlock[];
};

const intro = [
  "Stop us if this sounds familiar. Procurement approves the rollout. Licences go out to everyone. Three months later, a handful of people use it daily, most people opened it once, and finance is asking why the bill keeps climbing while usage keeps falling.",
  "Read that two ways and you get two different stories. Glass half full: hundreds of people picked up a brand-new tool inside a single quarter, faster than most companies ever roll out new software. Glass half empty: after three months, most of those same people have quietly stopped opening it. Both readings are true at once, and the gap between them is the only number in the whole rollout worth caring about.",
  "We stopped calling this a rollout problem a while ago. The tool did exactly what it was built to do. What broke down was the assumption that change management and training could stand in for infrastructure the business never built. Give that same rollout the best trainers and most patient change managers in the world, and the best-trained user still opens a blank session every morning, re-explaining what the team already knows. Training makes someone skilled at using the tool. It does nothing about the tool forgetting them between sessions. No amount of user skill fixes that.",
];

const body: BlogBlock[] = [
  { type: "paragraphs", items: intro },
  { type: "image", src: "/blog/article-motion.jpg", alt: "Blurred people walking through a bright office" },
  { type: "heading", text: "The Individual Tool, Doing Its Job" },
  { type: "paragraphs", items: intro },
];

const excerpt =
  "The demo always lands. Three months later, nobody uses it. Why enterprise AI stalls after the pilot - and the context layer that makes it compound.";

const topics = [
  "Enterprise Adoption",
  "Change Management",
  "Digital Transformation",
  "Team Enablement",
  "Product Strategy",
];

const shared = {
  excerpt,
  tag: "Enterprise adoption",
  author: "The Zaro Team",
  date: "July 1, 2026",
  readTime: "7 min read",
  topics,
  body,
};

export const posts: BlogPost[] = [
  {
    ...shared,
    slug: "five-hundred-licences",
    title: "Five Hundred Licences. Almost No One Uses Them.",
    category: "Text",
    date: "July 15, 2026",
    readTime: "6 min read",
    image: "/blog/licences.png",
    imageAlt: "Five hundred licences. No one using them.",
  },
  {
    ...shared,
    slug: "poland-invests-in-elevenlabs",
    title: "Universal Music Group and ElevenLabs",
    category: "Audio",
    image: "/blog/poland.png",
    imageAlt: "Poland invests in ElevenLabs",
  },
  {
    ...shared,
    slug: "encryption-and-traffic-management",
    title: "Universal Music Group and ElevenLabs",
    category: "Tabular",
    image: "/blog/encryption.png",
    imageAlt: "Encryption and traffic management",
  },
  {
    ...shared,
    slug: "elevenlabs-summit-warsaw",
    title: "Universal Music Group and ElevenLabs",
    category: "Image",
    image: "/blog/summit.png",
    imageAlt: "ElevenLabs Summit, Homecoming Warsaw",
  },
  {
    ...shared,
    slug: "causes-examples-mitigation",
    title: "Universal Music Group and ElevenLabs",
    category: "Document",
    image: "/blog/waves.png",
    imageAlt: "Causes, examples and mitigation strategies",
  },
  {
    ...shared,
    slug: "summit-homecoming",
    title: "Universal Music Group and ElevenLabs",
    category: "Geospatial",
    image: "/blog/summit.png",
    imageAlt: "ElevenLabs Summit, Homecoming Warsaw",
  },
  {
    ...shared,
    slug: "poland-elevenlabs-investment",
    title: "Universal Music Group and ElevenLabs",
    category: "3D",
    image: "/blog/poland.png",
    imageAlt: "Poland invests in ElevenLabs",
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
