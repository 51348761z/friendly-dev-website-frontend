import { Link } from "react-router";

type PostCardProps = {
  post: PostMeta;
};
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="rounded-lg bg-gray-800 p-6 shadow">
      <h3 className="text-2xl font-semibold text-blue-400">{post.title}</h3>
      <time dateTime={post.date} className="mb-2 text-sm text-gray-400">
        {new Date(post.date).toLocaleDateString("zh-CN")}
      </time>
      <p className="mb-4 text-gray-300">{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className="py-2 text-sm text-blue-300 capitalize hover:underline"
      >
        Read More 👉
      </Link>
    </article>
  );
};
