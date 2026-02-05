import { Link } from "react-router";

export const AboutPreview = () => {
  return (
    <section className="mt-12 flex flex-col items-center gap-8 bg-gray-900 p-10 md:flex-row">
      <figure>
        <img
          src="images/profile.jpg"
          alt="profile photo"
          className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
        />
      </figure>
      <div>
        <h2 className="text-2xl font-bold text-white">👋 About Me</h2>
        <p className="mb-4 max-w-4xl text-gray-200">
          I'm Louis, a passionate developer who loves building cool projects and
          sharing my journey. This website is a place where I showcase my work,
          share insights, and connect with fellow devs. Thanks for stopping by!
        </p>
        <Link
          to="/about"
          className="inline-block text-sm text-blue-400 hover:underline"
        >
          Learn More About Me
        </Link>
      </div>
    </section>
  );
};
