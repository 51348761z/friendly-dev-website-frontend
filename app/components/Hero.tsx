import { Link } from "react-router";

export const Hero = ({ name = "[NAME]", text = "" }) => {
  return (
    <section className="bg-gray-700 px-4 py-20 text-center text-white transition-colors duration-300">
      <h2 className="mb-4 text-4xl font-bold">Hey, I'm {name}! 👋</h2>
      <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-400">
        {text ||
          "I'm a passionate developer who loves building friendly and engaging web experiences. Welcome to my corner of the internet!"}
      </p>

      {/* Navigation Links */}
      <div className="mt-4 flex justify-center gap-4">
        <Link
          to="/projects"
          className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          View Projects
        </Link>
        <Link
          to="/contact"
          className="rounded border border-blue-500 px-6 py-2 text-blue-400 transition hover:bg-blue-600 hover:text-white"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
};
