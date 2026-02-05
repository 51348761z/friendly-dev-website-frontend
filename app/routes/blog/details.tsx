import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import type { Route } from "./+types/details";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { slug } = params;
  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Response("Failed to fetch blog posts", { status: res.status });
  }

  const data: PostMeta[] = await res.json();

  const postMeta = data.find((p) => p.slug === slug);
  if (!postMeta) {
    throw new Response("Post not found", { status: 404 });
  }

  // Dynamically import raw markdown
  const markdown: { default: string } = await import(
    `../../posts/${slug}.md?raw`
  );

  return {
    postMeta,
    markdown: markdown.default,
  };
};

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta, markdown } = loaderData;

  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">
        {postMeta.title}
      </h1>
      <time
        className="mb-6 block text-sm text-gray-400"
        dateTime={postMeta.date}
      >
        {new Date(postMeta.date).toDateString()}
      </time>

      <div className="prose prose-invert mb-12 max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <Link
        to="/blog"
        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        👈 Back to Blog
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
