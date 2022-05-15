import React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="sticky top-0 flex-col hidden w-full h-screen max-w-xs overflow-y-auto bg-indigo-200 border-r border-black lg:flex">
      <div className="py-6 pl-6">{children}</div>
    </aside>
  );
};

export default Sidebar;
