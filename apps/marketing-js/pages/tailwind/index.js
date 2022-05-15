import Link from "next/link";
import { Button } from "tailwind-js";

import { APP_URL } from "../../lib";

const HomePage = () => {
  return (
    <Link href={APP_URL}>
      <a>
        <Button>Get Started</Button>
      </a>
    </Link>
  );
};

export default HomePage;
