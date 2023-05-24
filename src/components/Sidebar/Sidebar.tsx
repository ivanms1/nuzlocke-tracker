import {
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  PlayCircle,
  User,
} from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSelectedNuzlocke } from "src/state/selectedNuzlocke";

import { cn } from "@/utils/cn";
import { buttonVariants } from "../Button/Button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    icon: PlayCircle,
    href: "/dashboard",
    pathname: "/dashboard",
  },

  {
    title: "Browse",
    icon: LayoutGrid,
    href: "/browse",
    pathname: "/browse",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
    pathname: "/profile",
  },
];

function Sidebar({ className }: SidebarProps) {
  const { selectedNuzlocke } = useSelectedNuzlocke();
  const router = useRouter();

  const NUZLOCKE_ITEMS = [
    {
      title: "Overview",
      icon: Library,
      href: `/nuzlocke/${selectedNuzlocke?.id}`,
      pathname: "/nuzlocke/[id]",
    },
    {
      title: "Encounters",
      icon: ListMusic,
      href: `/nuzlocke/${selectedNuzlocke?.id}/encounters`,
      pathname: "/nuzlocke/[id]/encounters",
    },
    {
      title: "Stats",
      icon: Mic2,
      href: `/nuzlocke/${selectedNuzlocke?.id}/stats`,
      pathname: "/nuzlocke/[id]/stats",
    },
  ];

  return (
    <div className={cn("hidden pb-12 lg:block", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Nuzlockes
          </h2>

          <div className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;

              const isSelected = router.pathname === item.pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: isSelected ? "secondary" : "ghost",
                      size: "sm",
                    }),
                    "w-full justify-start"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        {selectedNuzlocke && (
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              {selectedNuzlocke.title}
            </h2>
            <div className="space-y-1">
              {NUZLOCKE_ITEMS.map((item) => {
                const Icon = item.icon;
                const isSelected = router.pathname === item.pathname;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({
                        variant: isSelected ? "secondary" : "ghost",
                        size: "sm",
                      }),
                      "w-full justify-start"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
