import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

import { DocumentationPage, DocumentationPageMetadata } from "../types";

export const getAllDocumentationPages = (): DocumentationPageMetadata[] => {
  const files = fs.readdirSync(path.join("markdown"));
  return files
    .filter((file) => file !== "example-entry.mdx")
    .map((file) => {
      const fileContents = fs.readFileSync(path.join("markdown", file), "utf8");
      let { data } = matter(fileContents);
      return data as DocumentationPageMetadata;
    })
    .sort(
      (a: DocumentationPageMetadata, b: DocumentationPageMetadata) =>
        a.index - b.index
    );
};

export const getDocumentationPage = async (
  slug: string
): Promise<DocumentationPage> => {
  const documentationPages = getAllDocumentationPages();
  const fileContents = fs.readFileSync(
    path.join("markdown", `${slug}.mdx`),
    "utf-8"
  );
  let { content, data } = matter(fileContents);
  data = data as DocumentationPageMetadata;
  const next = documentationPages.find(
    (documentationPage) => documentationPage.index === data.index + 1
  );
  const previous = documentationPages.find(
    (documentationPage) => documentationPage.index === data.index - 1
  );
  return {
    content: await serialize(content),
    data: data as DocumentationPageMetadata,
    next: next ? { slug: next.slug, title: next.title } : null,
    previous: previous ? { slug: previous.slug, title: previous.title } : null
  };
};

export const serializeMarkdown = async (
  markdown: string
): Promise<MDXRemoteSerializeResult> => {
  return await serialize(markdown, {
    mdxOptions: {
      remarkPlugins: [require("remark-prism")]
    }
  });
};
