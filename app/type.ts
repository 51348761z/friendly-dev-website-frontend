interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
}

interface PostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}
