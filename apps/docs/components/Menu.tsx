import disableScroll from "disable-scroll";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import * as React from "react";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";

interface MenuProps {
  children: React.ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  React.useEffect(() => {
    open ? disableScroll.on() : disableScroll.off();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          className="fixed top-0 right-0 z-30 px-6 bg-indigo-200"
          initial={{ height: 0, width: 0 }}
          animate={{
            height: "100vh",
            width: "100vw"
          }}
          exit={{
            width: 0,
            transition: { duration: 0.3 }
          }}
        >
          <motion.div className="relative w-full h-full">
            <button
              className="absolute right-0 opacity-75 top-6 hover:opacity-100"
              onClick={() => setOpen(!open)}
            >
              <RiCloseFill className="w-6 h-6" />
            </button>
            {children}
          </motion.div>
        </motion.aside>
      ) : (
        <button
          className="flex items-center space-x-2 font-light opacity-75 hover:opacity-100"
          onClick={() => setOpen(!open)}
        >
          <span className="text-sm uppercase">Menu</span>
          <RiMenuFill className="w-4 h-4" />
        </button>
      )}
    </AnimatePresence>
  );
};

export default Menu;
