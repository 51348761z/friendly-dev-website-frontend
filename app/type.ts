export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
}

export interface Post {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface StrapiResponse<T> {
  data: T[];
}

export interface StrapiProjectAttributes {
  id: number;
  documentId: string;
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
  image?: {
    url: string;
    format?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

export interface StrapiPostAttributes {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  date: string;
  image?: {
    url: string;
    format?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}
