import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { routes, RouteNode } from "@/lib/routes";

interface SidebarItemProps {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  items?: SidebarItemProps[];
}

function SidebarItem({ item }: { item: SidebarItemProps }) {
  const hasChildren = item.items && item.items.length > 0;

  if (hasChildren) {
    return (
      <Collapsible key={item.url} className="group/collapsible-main">
        <SidebarMenuItem>
          <div className="flex items-center">
            <SidebarMenuButton asChild className="flex-1">
              <Link href={item.url} className="flex items-center">
                {item.icon && <item.icon className="mr-2 size-4" />}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="truncate flex-1 text-left">
                      {item.title}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </SidebarMenuButton>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-center w-6 h-6 hover:bg-accent hover:text-accent-foreground rounded-sm">
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible-main:rotate-90" />
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <SidebarMenuSub className="w-full">
              {item.items?.map((subItem: SidebarItemProps) => (
                <SidebarMenuSubItem key={subItem.url} className="w-full">
                  {subItem.items && subItem.items.length > 0 ? (
                    <Collapsible className="group/collapsible-sub w-full">
                      <div className="flex items-center">
                        <SidebarMenuSubButton asChild className="flex-1 w-full">
                          <Link
                            href={subItem.url}
                            className="flex items-center w-full"
                          >
                            {subItem.icon && (
                              <subItem.icon className="mr-2 size-4" />
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="truncate flex-1 text-left">
                                  {subItem.title}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{subItem.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </Link>
                        </SidebarMenuSubButton>
                        <CollapsibleTrigger asChild>
                          <button className="flex items-center justify-center w-6 h-6 hover:bg-accent hover:text-accent-foreground rounded-sm">
                            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible-sub:rotate-90" />
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <SidebarMenuSub className="w-full ml-0 pl-4">
                          {subItem.items.map((nestedItem: SidebarItemProps) => (
                            <SidebarMenuSubItem
                              key={nestedItem.url}
                              className="w-full"
                            >
                              <SidebarMenuSubButton asChild className="w-full">
                                <Link
                                  href={nestedItem.url}
                                  className="flex items-center w-full"
                                >
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="truncate flex-1 text-left">
                                        {nestedItem.title}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{nestedItem.title}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuSubButton asChild className="w-full">
                      <Link
                        href={subItem.url}
                        className="flex items-center w-full"
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="truncate flex-1 text-left">
                              {subItem.title}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{subItem.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </Link>
                    </SidebarMenuSubButton>
                  )}
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={item.url} className="flex items-center">
          {item.icon && <item.icon className="mr-2 size-4" />}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate flex-1 text-left">{item.title}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function getSidebarRoutes() {
  function convertRoute(route: RouteNode): SidebarItemProps | null {
    if (!route.doesDisplayInSidebar) {
      return null;
    }

    const items: SidebarItemProps[] = [];

    if (route.children) {
      Object.values(route.children).forEach(child => {
        const converted = convertRoute(child);
        if (converted) {
          items.push(converted);
        }
      });
    }

    return {
      title: route.name || route.uri,
      url: route.uri,
      icon: route.icon,
      items: items,
    };
  }

  const navMain: SidebarItemProps[] = [];

  Object.values(routes).forEach(route => {
    const converted = convertRoute(route);
    if (converted) {
      navMain.push(converted);
    }
  });

  return {
    navMain,
  };
}

const data = getSidebarRoutes();

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar {...props}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map(item => (
                <SidebarItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
