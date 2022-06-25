/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { GrCode } from "react-icons/gr";
import { IoRocketSharp } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";

import Callout from "../components/Callout";
import Card from "../components/Card";
import LandingFooter from "../components/footers/LandingFooter";
import HighlightedText from "../components/HighlightedText";
import LandingNavigation from "../components/navs/LandingNavigation";
import Pole from "../components/Pole";

const featuresMain = [
  {
    content:
      "Start with a powerful TypeScript/JavaScript monorepo built with React and Next.js",
    title: "React Next.js Boilerplate"
  },
  {
    content:
      "Takeoff automatically configures your components with ChakraUI, DaisyUI, Tailwind CSS, or a blank slate",
    title: "Choose Your UI Framework"
  },
  {
    content:
      "Create products, connect with Stripe, and start getting paid immediately",
    title: "Subscription Payments"
  }
];

const languageImages = [
  { alt: "JavaScript", src: "/images/logos/javascript.png" },
  { alt: "TypeScript", src: "/images/logos/typescript.png" }
];

const uiImages = [
  { alt: "Influx UI", src: "/images/logos/influxui.png" },
  { alt: "Chakra UI", src: "/images/logos/chakraui.png" },
  { alt: "daisyUI", src: "/images/logos/daisy.svg" },
  { alt: "Tailwind CSS", src: "/images/logos/tailwind.svg" }
];

const appsPackagesInfo = [
  {
    description:
      "Fullstack web application with database, Stripe subscriptions, and user Authentication enabled",
    name: "app"
  },
  { description: "Website for marketing/landing page", name: "marketing" },
  {
    description:
      "React component library configured for your CSS framework of choice shared with app and marketing",
    name: "ui"
  }
];

const HomePage = () => {
  return (
    <>
      <style>{`
        #__next {
          flex-direction: column !important;
        }
      `}</style>
      <NextSeo
        description="TAKEOFF launches SaaS projects instantly instead of wasting months of your development time. Never worry about authentication, payment flows, or project setup again."
        canonical="https://takeoff.durk.dev"
        openGraph={{
          url: "https://takeoff.durk.dev",
          title: "TAKEOFF",
          description:
            "TAKEOFF launches SaaS projects instantly instead of wasting months of your development time. Never worry about authentication, payment flows, or project setup again.",
          site_name: "https://takeoff.durk.dev"
        }}
        title="TAKEOFF - Free SaaS Boilerplate"
        twitter={{
          site: "@durkdotdev",
          cardType: "summary_large_image"
        }}
      />

      <LandingNavigation />

      <main>
        <div className="flex flex-col w-full mx-auto">
          <div className="flex flex-col items-center justify-center px-6 my-16">
            <span className="text-2xl font-extralight">Introducing</span>

            <h1 className="mt-2 mb-8 text-5xl font-bold">TAKEOFF</h1>

            <p className="max-w-3xl mb-8 text-2xl font-bold text-center">
              TAKEOFF is an{" "}
              <span className="bg-yellow-200"> open-source, free</span> SaaS
              boilerplate that saves months of your development time.
            </p>

            <p className="max-w-3xl mb-8 text-xl text-center">
              Never worry about{" "}
              <HighlightedText>authentication</HighlightedText>,{" "}
              <HighlightedText>payment flows</HighlightedText>, or{" "}
              <HighlightedText>project setup</HighlightedText> again.
            </p>

            <div className="flex flex-col items-center space-y-8">
              <pre className="px-8 py-4 bg-black rounded-lg shadow-lg text-neutral-100 shadow-fuchsia-400/60">
                npx create-takeoff
              </pre>

              <Link href="/docs">
                <a className="px-4 py-3 text-sm font-bold text-indigo-300 uppercase border border-black rounded-lg shadow-lg hover:bg-neutral-100 shadow-fuchsia-400/40">
                  Documentation
                </a>
              </Link>
            </div>
          </div>

          <Pole className="mx-auto">
            <IoRocketSharp className="w-4 h-4" />
          </Pole>

          <div className="flex justify-center mx-6 my-16">
            <Image
              alt="Terminal Recording"
              className="min-h-[338px] min-w-[600px] rounded-lg shadow-lg shadow-fuchsia-400/60"
              height={338}
              src="/images/takeoff_terminal.gif"
              width={600}
            />
          </div>

          <Callout>
            <div className="w-full p-16 border-black md:w-1/2 bg-neutral-100 md:border-r border-y md:rounded-r-lg">
              <div className="flex flex-col max-w-lg mx-auto space-y-4 text-center md:mx-0 md:text-left">
                <span className="text-lg font-bold text-black uppercase">
                  Launch a Saas In One Command
                </span>

                <p className="w-full max-w-lg font-extralight">
                  Start building on top of a full-feature SaaS template with
                  authentication and subscription payments configured within a
                  high performance Turborepo monorepo.
                </p>
              </div>
            </div>

            <div className="relative flex justify-center h-full md:py-16 md:justify-start md:w-1/2">
              <pre className="px-8 py-4 bg-black rounded-lg shadow-lg text-neutral-100 shadow-fuchsia-400/60">
                npx create-takeoff
              </pre>
            </div>
          </Callout>

          <Callout>
            <div className="relative flex justify-center h-full md:py-16 md:justify-end md:w-1/2">
              <div className="flex flex-wrap items-center space-x-4 space-y-4 md:space-x-8 md:space-y-8">
                {languageImages.map((image) => (
                  <img
                    alt={image.alt}
                    className="h-10 rounded sm:h-12"
                    key={image.alt}
                    src={image.src}
                  />
                ))}
              </div>
            </div>

            <div className="w-full p-16 border-black md:w-1/2 bg-neutral-100 md:border-l border-y md:rounded-l-lg">
              <div className="flex flex-col max-w-lg mx-auto space-y-4 text-center md:mx-0 md:text-left">
                <span className="text-lg font-bold text-black uppercase">
                  JavaScript and TypeScript Support
                </span>

                <p className="w-full max-w-lg font-extralight">
                  Choose which language your prefer. The TAKEOFF CLI creates
                  both JavaScript and TypeScript SaaS projects allowing you to
                  use the language you are most comfortable with.
                </p>
              </div>
            </div>
          </Callout>

          <Callout>
            <div className="w-full p-16 border-black md:w-1/2 bg-neutral-100 md:border-r border-y md:rounded-r-lg">
              <div className="flex flex-col max-w-lg mx-auto space-y-4 text-center md:mx-0 md:text-left">
                <span className="text-lg font-bold text-black uppercase">
                  Chose a CSS Framework
                </span>

                <p className="w-full max-w-lg font-extralight">
                  TAKEOFF creates a true boilerplate, you aren{"'"}t forced to
                  accept a pre-styled app. Choose the CSS Framework you like and
                  TAKEOFF configures the rest. You can design your SaaS to look
                  how you want, TAKEOFF just handles setting it up.
                </p>
              </div>
            </div>

            <div className="relative flex justify-center h-full md:py-16 md:justify-start md:w-1/2">
              <div className="flex flex-wrap items-center justify-center space-x-4 md:justify-start md:space-x-8">
                {uiImages.map((image) => (
                  <img
                    alt={image.alt}
                    className="h-6 sm:h-8"
                    key={image.alt}
                    src={image.src}
                  />
                ))}
              </div>
            </div>
          </Callout>

          <Callout>
            <div className="relative flex justify-center h-full md:py-16 md:justify-end md:w-1/2">
              <div className="flex flex-col max-w-lg px-6 space-y-4 md:space-y-8">
                {appsPackagesInfo.map((info) => (
                  <div className="flex items-center space-x-4" key={info.name}>
                    <span className="px-2 py-1 font-bold tracking-wider bg-indigo-200 border border-black rounded-lg shadow-lg shadow-fuchsia-400/60">
                      {info.name}
                    </span>

                    <p className="font-extralight">{info.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full p-16 border-black md:w-1/2 bg-neutral-100 md:border-l border-y md:rounded-l-lg">
              <div className="flex flex-col max-w-lg mx-auto space-y-4 text-center md:mx-0 md:text-left">
                <span className="text-lg font-bold text-black uppercase">
                  Start Shipping Immediately
                </span>

                <p className="w-full max-w-lg font-extralight">
                  You instantly start with two web applications and a React
                  component library equipped to handle subscription payments and
                  user authentication. Start building out your MVP and shipping
                  your product within minutes.
                </p>

                <br />

                <p className="w-full max-w-lg font-extralight">
                  Extra nice-to-haves, such as password reset and dark mode are
                  already configured in TAKEOFF projects. Ship your product from
                  Day 1 with a well polished, feature-rich application.
                </p>
              </div>
            </div>
          </Callout>

          <Pole className="mx-auto">
            <MdDashboardCustomize className="w-4 h-4" id="features" />
          </Pole>

          <section className="py-16 my-16 bg-indigo-200 border-black border-y">
            <div className="flex flex-col items-center w-full max-w-6xl px-4 mx-auto space-y-8">
              <div className="flex flex-col space-y-2 text-center">
                <span className="text-3xl font-bold text-black uppercase">
                  FEATURES
                </span>

                <p className="w-full max-w-2xl font-extralight">
                  TAKEOFF includes thousands of lines of high quality, tested
                  code to power your SaaS
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                {featuresMain.map((feature) => (
                  <Card
                    classes="mx-auto lg:mx-0 w-full max-w-2xl text-center"
                    key={feature.title}
                  >
                    <div className="flex flex-col space-y-2">
                      <h3 className="font-bold uppercase">{feature.title}</h3>
                      <p className="font-light">{feature.content}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <Link href="/docs/features">
                <a className="text-sm font-bold uppercase hover:underline">
                  View All Features
                </a>
              </Link>
            </div>
          </section>

          <Pole className="mx-auto">
            <GrCode className="w-4 h-4" />
          </Pole>

          <div className="flex flex-col items-center justify-center px-6 pb-16 my-16 text-center">
            <span className="text-2xl font-extralight">
              Start Using TAKEOFF
            </span>

            <h1 className="mt-2 mb-8 text-5xl font-bold uppercase">
              Get Started Today
            </h1>

            <div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-8">
              <pre className="px-8 py-4 bg-black rounded-lg shadow-lg text-neutral-100 shadow-fuchsia-400/60">
                npx create-takeoff
              </pre>

              <Link href="/docs">
                <a className="px-4 py-3 text-sm font-bold text-indigo-300 uppercase border border-black rounded-lg shadow-lg hover:bg-neutral-100 shadow-fuchsia-400/40">
                  Documentation
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </>
  );
};

export default HomePage;
