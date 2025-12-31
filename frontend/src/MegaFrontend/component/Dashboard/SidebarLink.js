import React from "react";
import * as Icons from "react-icons/vsc";
import { useLocation, NavLink, matchPath } from "react-router-dom";

function SidebarLink({ link, iconName, closeSidebar }) {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <NavLink
      to={link.path}
      onClick={closeSidebar} /* close sidebar on click */
      className={`flex items-center gap-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
        matchRoute(link.path) ? "bg-yellow-400 text-black font-medium" : ""
      }`}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      <span className="whitespace-nowrap">{link.name}</span>
    </NavLink>
  );
}


export default SidebarLink;
