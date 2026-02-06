import { Link } from "react-router";
import type { Post } from "~/type";

type PostCardProps = {
  post: Post;
};
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="relative rounded-lg bg-gray-800 p-6 shadow">
      <h3 className="text-2xl font-semibold text-blue-400">{post.title}</h3>
      <time dateTime={post.date} className="mb-2 text-sm text-gray-400">
        {new Date(post.date).toDateString()}
      </time>
      <p className="mb-4 text-gray-300">{post.excerpt}</p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="mb-4 h-40 w-full rounded-lg object-cover"
        />
      )}
      <Link
        to={`/posts/${post.documentId}`}
        className="absolute right-10 bottom-1 py-2 text-sm text-blue-300 capitalize hover:underline"
      >
        Read More 👉
      </Link>
    </article>
  );
};
