import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev Website | Welcome" },
    { name: "description", content: "A friendly website." },
  ];
}

export default function HomePage() {
  return <>Home Page</>;
}
