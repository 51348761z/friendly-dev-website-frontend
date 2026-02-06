import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import { fetchPost } from "~/services/posts";
import type { Route } from "./+types/details";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { slug } = params;
  if (!slug) {
    throw new Response("Slug is required", { status: 400 });
  }

  return fetchPost(slug);
};

const BlogPostDetailsPage = ({ loaderData: post }: Route.ComponentProps) => {
  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">{post.title}</h1>
      <time className="mb-6 block text-sm text-gray-400" dateTime={post.date}>
        {new Date(post.date).toDateString()}
      </time>

      <img
        src={post.image}
        alt={post.title}
        className="mb-6 h-64 w-full rounded-md object-cover"
      />

      <div className="prose prose-invert mb-12 max-w-none">
        <ReactMarkdown>{post.body}</ReactMarkdown>
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
