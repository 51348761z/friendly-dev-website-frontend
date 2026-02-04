import { Hero } from "~/components/Hero";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev Website | Welcome" },
    { name: "description", content: "A friendly website." },
  ];
}

export default function HomePage() {
  return (
    <section>
      <Hero
        name="Louis"
        text="I'm a passionate developer who loves building friendly and engaging web experiences. Welcome to my corner of the internet!"
      />
    </section>
  );
}
