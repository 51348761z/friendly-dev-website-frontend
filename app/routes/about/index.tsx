const AboutPage = () => {
  return (
    <section className="mx-auto max-w-5xl bg-gray-900 px-6 py-16">
      {/* Intro */}
      <section className="mb-12 flex flex-col items-center gap-10 md:flex-row md:items-start">
        <img
          src="images/profile.jpg"
          alt="Portrait of Louis"
          className="h-40 w-40 rounded-full border-4 border-blue-500 object-cover shadow-md"
        />
        <div>
          <h2 className="mb-2 text-3xl font-bold text-white">
            Hey, I'm Louis! 👋
          </h2>
          <p className="text-lg text-gray-300">
            I'm a passionate developer who loves building cool projects and
            sharing my journey. This website is a place where I showcase my
            work, share insights, and connect with fellow devs. Thanks for
            stopping by!
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="mb-12" aria-labelledby="mission-title">
        <h2
          id="mission-title"
          className="mb-4 text-2xl font-semibold text-white"
        >
          My Mission
        </h2>
        <p className="leading-relaxed text-gray-300">
          My mission is to create a friendly and welcoming space for developers
          of all levels. Whether you're just starting out or you're a seasoned
          pro, I want this website to be a place where you can find inspiration,
          learn new things, and feel part of a supportive community. I'm
          committed to sharing my knowledge and experiences in a way that's
          accessible and enjoyable for everyone.
        </p>
      </section>

      {/* Tech Stack */}
      <section aria-labelledby="tech-stack-title">
        <h2
          id="tech-stack-title"
          className="mb-4 text-2xl font-semibold text-white"
        >
          🚀 Tech I use
        </h2>
        <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
          {[
            "React",
            "TypeScript",
            "Remix",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "MongoDB",
            "Vercel",
          ].map((tech) => (
            <li key={tech} className="rounded-md bg-gray-700 px-3 py-1">
              {tech}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default AboutPage;
