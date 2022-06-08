import * as React from "react";
import { BsHash } from "react-icons/bs";

const AnchorHeading = (props: any) => {
  const id: string = (props.children as string)
    .split(" ")
    .join("-")
    .toLowerCase();

  return (
    <props.type
      className="before:block before:content-[' '] before:-mt-24 before:h-24 before:invisible before:pointer-events-none"
      id={id}
      style={{ width: "fit-content" }}
      {...props}
    >
      <a
        href={`#${id}`}
        className="font-bold relative group no-underline hover:underline lg:hover:no-underline !decoration-black dark:!decoration-white !text-black dark:!text-white"
      >
        <span className="absolute top-0 hidden transition-all !text-black dark:!text-white  ease-in opacity-0 -left-10 lg:inline group-hover:opacity-100">
          <BsHash
            className={props.type === "h2" ? "mt-1 h-6 w-6" : "mt-0.5 h-5 w-5"}
          />
        </span>
        {props.children}
      </a>
    </props.type>
  );
};

export default AnchorHeading;
