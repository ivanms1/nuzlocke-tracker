import {
  LayoutGrid,
  Component,
  User,
  Skull,
  Monitor,
  XSquare,
  Table,
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
    icon: LayoutGrid,
    href: "/dashboard",
    pathname: "/dashboard",
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
      title: "Team",
      icon: Component,
      href: `/nuzlocke/${selectedNuzlocke?.id}`,
      pathname: "/nuzlocke/[id]",
    },
    {
      title: "PC",
      icon: Monitor,
      href: `/nuzlocke/${selectedNuzlocke?.id}/pc`,
      pathname: "/nuzlocke/[id]/pc",
    },
    {
      title: "Grave",
      icon: Skull,
      href: `/nuzlocke/${selectedNuzlocke?.id}/grave`,
      pathname: "/nuzlocke/[id]/grave",
    },
    {
      title: "Missed",
      icon: XSquare,
      href: `/nuzlocke/${selectedNuzlocke?.id}/missed`,
      pathname: "/nuzlocke/[id]/missed",
    },
    {
      title: "Overview",
      icon: Table,
      href: `/nuzlocke/${selectedNuzlocke?.id}/overview`,
      pathname: "/nuzlocke/[id]/overview",
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
