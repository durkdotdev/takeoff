import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface DocumentationPage {
  content: MDXRemoteSerializeResult;
  data: DocumentationPageMetadata;
  next?: {
    slug: string;
    title: string;
  };
  previous?: {
    slug: string;
    title: string;
  };
}

export interface DocumentationPageMetadata {
  category: string;
  description: string;
  index: number;
  slug: string;
  title: string;
}
