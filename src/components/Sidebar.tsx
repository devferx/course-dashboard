import Link from "next/link";
import { useRouter } from "next/router";

import { LogoIcon } from "./icons/logo";
import { CourseIcon } from "./icons/courseIcon";
import { LessonsIcon } from "./icons/LessonsIcon";
import { ModulesIcon } from "./icons/modulesIcon";

export const Sidebar = () => {
  return (
    <aside>
      <header className="p-10">
        <Link href="/">
          <LogoIcon />
        </Link>
      </header>
      <ul>
        <SidebarItem
          label="Cursos"
          renderIcon={(isActive) => <CourseIcon isActive={isActive} />}
          href="/"
        />
        <SidebarItem
          label="Classes"
          renderIcon={(isActive) => <LessonsIcon isActive={isActive} />}
          href="/lessons"
        />
        <SidebarItem
          label="Modulos"
          renderIcon={(isActive) => <ModulesIcon isActive={isActive} />}
          href="/modules"
        />
      </ul>
    </aside>
  );
};

interface SidebarItemProps {
  renderIcon: (isActive: boolean) => JSX.Element;
  href: string;
  label: string;
}

const SidebarItem = ({ renderIcon, href, label }: SidebarItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <li className="py-3 pl-10 hover:bg-slate-200">
      <Link href={href}>
        <a className="flex items-center gap-4">
          {renderIcon(isActive)}
          <span
            className={`text1-semibold ${
              isActive ? "text-black" : "text-gray3"
            }`}
          >
            {label}
          </span>
        </a>
      </Link>
    </li>
  );
};
