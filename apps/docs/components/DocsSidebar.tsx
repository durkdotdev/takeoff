import * as React from "react";
import { Sidebar } from "ui";

import { DocumentationPageMetadata } from "../types";
import DocsLink from "./DocsLink";

const orderedCategories = ["app", "marketing", "ui", "deployment"];

interface SidebarProps {
  documentationPages: DocumentationPageMetadata[];
}

const DocsSidebar = ({ documentationPages }: SidebarProps) => {
  return (
    <Sidebar>
      <div className="flex flex-col space-y-3">
        {documentationPages
          .filter((documentationPage) => documentationPage.category === "main")
          .map((documentationPage) => (
            <DocsLink
              documentationPage={documentationPage}
              key={documentationPage.slug}
            />
          ))}

        {orderedCategories.map((category) => (
          <React.Fragment key={category}>
            <div className="!mt-6 py-1 text-sm font-extralight w-[calc(100%-2rem)] border-b border-black uppercase">
              {category}
            </div>
            {documentationPages
              .filter(
                (documentationPage) => documentationPage.category === category
              )
              .map((documentationPage) => (
                <DocsLink
                  documentationPage={documentationPage}
                  key={documentationPage.slug}
                />
              ))}
          </React.Fragment>
        ))}

        <div />
        {documentationPages
          .filter((documentationPage) => documentationPage.category === "end")
          .map((documentationPage) => (
            <DocsLink
              documentationPage={documentationPage}
              key={documentationPage.slug}
            />
          ))}
      </div>
    </Sidebar>
  );
};

export default DocsSidebar;
