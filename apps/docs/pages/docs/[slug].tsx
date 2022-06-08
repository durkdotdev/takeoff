import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";

import DocsNextPreviousLink from "../../components/DocsNextPreviousLink";
import DocsSidebar from "../../components/DocsSidebar";
import DocsNavigation from "../../components/navs/DocsNavigation";
import {
  getAllDocumentationPages,
  getDocumentationPage
} from "../../lib/markdown";
import { DocumentationPage, DocumentationPageMetadata } from "../../types";

interface DocsPageProps {
  documentationPages: DocumentationPageMetadata[];
  page: DocumentationPage;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = getAllDocumentationPages();
  return {
    paths: entries.map((entry) => {
      return { params: { slug: entry.slug } };
    }),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const documentationPages =
    getAllDocumentationPages() as DocumentationPageMetadata[];
  const page = await getDocumentationPage(params.slug as string);
  return {
    props: { documentationPages, page }
  };
};

const DocsPage = ({ documentationPages, page }: DocsPageProps) => {
  return (
    <>
      <NextSeo
        description={page.data.description}
        canonical={`https://takeoff-docs.durk.dev/${page.data.slug}`}
        openGraph={{
          url: `https://takeoff-docs.durk.dev/${page.data.slug}`,
          title: page.data.title,
          description: page.data.description,
          site_name: "https://takeoff-docs.durk.dev"
        }}
        title={page.data.title}
        twitter={{
          site: "@durkdotdev",
          cardType: "summary_large_image"
        }}
      />
      <DocsSidebar documentationPages={documentationPages} />
      <main>
        <DocsNavigation documentationPages={documentationPages} />
        <section className="flex justify-center w-full">
          <article className="w-full max-w-[52rem] px-6 py-12 prose prose-a:transition-all prose-a:ease-in prose-a:decoration-fuchsia-400 prose-a:decoration-2 hover:prose-a:text-fuchsia-400 prose-code:px-4 prose-code:py-1 prose-code:bg-indigo-200 prose-code:border prose-code:border-black prose-code:rounded-lg prose-code:shadow-lg prose-code:shadow-fuchsia-400/60 prose-pre:rounded-lg prose-pre:bg-black prose-pre:!text-white prose-pre:shadow-lg prose-pre:shadow-fuchsia-400/60 !text-black break-words">
            <MDXRemote {...page.content} />
          </article>
        </section>
        <div className="px-6 py-12 mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 w-full max-w-[52rem]">
          {page.previous && (
            <DocsNextPreviousLink direction="previous" page={page.previous} />
          )}
          <div className="flex-1" />
          {page.next && (
            <DocsNextPreviousLink direction="next" page={page.next} />
          )}
        </div>
      </main>
    </>
  );
};

export default DocsPage;
