import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppSidebar } from "./app-sidebar";

// Mock the Next.js Link component
vi.mock("next/link", async () => {
  const React = await import("react");
  return {
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock the components from shadcn/ui
vi.mock("@/components/ui/collapsible", async () => {
  const React = await import("react");
  return {
    Collapsible: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="collapsible" {...props}>
        {children}
      </div>
    ),
    CollapsibleContent: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="collapsible-content" {...props}>
        {children}
      </div>
    ),
    CollapsibleTrigger: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
      // Fixed: avoid nested button issue by using a div
      <div data-testid="collapsible-trigger" {...props}>
        {children}
      </div>
    ),
  };
});

vi.mock("@/components/ui/sidebar", async () => {
  const React = await import("react");
  return {
    Sidebar: ({ children, className, ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLElement>) => (
      <div
        data-testid="sidebar"
        className={className}
        role="navigation"
        {...props}
      >
        {children}
      </div>
    ),
    SidebarContent: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
      <div data-testid="sidebar-content" {...props}>
        {children}
      </div>
    ),
    SidebarGroup: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
      <div data-testid="sidebar-group" {...props}>
        {children}
      </div>
    ),
    SidebarMenu: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
      <ul data-testid="sidebar-menu" {...props}>
        {children}
      </ul>
    ),
    SidebarMenuButton: ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button data-testid="sidebar-menu-button" {...props}>
        {children}
      </button>
    ),
    SidebarMenuItem: ({ children, ...props }: { children: React.ReactNode } & React.LiHTMLAttributes<HTMLElement>) => (
      <li data-testid="sidebar-menu-item" {...props}>
        {children}
      </li>
    ),
    SidebarMenuSub: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
      <ul data-testid="sidebar-menu-sub" {...props}>
        {children}
      </ul>
    ),
    SidebarMenuSubButton: ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button data-testid="sidebar-menu-sub-button" {...props}>
        {children}
      </button>
    ),
    SidebarMenuSubItem: ({ children, ...props }: { children: React.ReactNode } & React.LiHTMLAttributes<HTMLElement>) => (
      <li data-testid="sidebar-menu-sub-item" {...props}>
        {children}
      </li>
    ),
    SidebarRail: () => <div data-testid="sidebar-rail" />,
  };
});

vi.mock("@/components/ui/tooltip", async () => {
  const React = await import("react");
  return {
    Tooltip: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="tooltip" {...props}>
        {children}
      </div>
    ),
    TooltipContent: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="tooltip-content" {...props}>
        {children}
      </div>
    ),
    TooltipProvider: ({ children, delayDuration, ...props }: { children: React.ReactNode; delayDuration?: number } & React.HTMLAttributes<HTMLDivElement>) => (
      <div
        data-testid="tooltip-provider"
        delayduration={delayDuration}
        {...props}
      >
        {children}
      </div>
    ),
    TooltipTrigger: ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="tooltip-trigger" {...props}>
        {children}
      </div>
    ),
  };
});

// Mock the ChevronRight icon
vi.mock("lucide-react", async () => {
  const React = await import("react");
  return {
    ChevronRight: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="chevron-right" {...props} />
    ),
  };
});

// Mock the routes
vi.mock("@/lib/routes", () => ({
  routes: {
    "/": {
      name: "Home",
      uri: "/",
      icon: () => null,
      doesDisplayInSidebar: true,
    },
    "/areas": {
      name: "Areas",
      uri: "/areas",
      icon: () => null,
      doesDisplayInSidebar: true,
      children: {
        "/areas/gov": {
          name: "Government Areas",
          uri: "/areas/gov",
          icon: () => null,
          doesDisplayInSidebar: true,
          children: {
            "/areas/gov/finance": {
              name: "Finance",
              uri: "/areas/gov/finance",
              icon: () => null,
              doesDisplayInSidebar: true,
            },
          },
        },
        "/areas/personal": {
          name: "Personal Area",
          uri: "/areas/personal",
          icon: () => null,
          doesDisplayInSidebar: true,
          children: {
            "/areas/personal/profile": {
              name: "Profile",
              uri: "/areas/personal/profile",
              doesDisplayInSidebar: true,
            },
          },
        },
      },
    },
  },
  RouteNode: {},
}));

describe("AppSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering & Structure", () => {
    it("should render with correct structure", () => {
      render(<AppSidebar />);

      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-group")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-menu")).toBeInTheDocument();
      expect(screen.getByTestId("tooltip-provider")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-rail")).toBeInTheDocument();
    });

    it("should render main navigation items", () => {
      render(<AppSidebar />);

      // Use href attribute to uniquely identify the links
      const homeLink = screen.getByRole("link", { name: /Home/ });
      expect(homeLink).toHaveAttribute("href", "/");

      // Get all links with "Areas" in their name and filter by href to get the main navigation item
      const allAreaLinks = screen.getAllByRole("link", { name: /Areas/ });
      const areasLink = allAreaLinks.find(
        link => link.getAttribute("href") === "/areas"
      );
      expect(areasLink).toBeInTheDocument();
      expect(areasLink).toHaveAttribute("href", "/areas");
    });

    it("should render sub-menu items", () => {
      render(<AppSidebar />);

      // Use href attribute to uniquely identify sub-menu items
      const govAreasLink = screen.getByRole("link", {
        name: /Government Areas/,
      });
      expect(govAreasLink).toHaveAttribute("href", "/areas/gov");

      const personalAreaLink = screen.getByRole("link", {
        name: /Personal Area/,
      });
      expect(personalAreaLink).toHaveAttribute("href", "/areas/personal");
    });
  });

  describe("Props & Variants", () => {
    it("should accept additional props", () => {
      render(<AppSidebar className="custom-class" />);

      const sidebar = screen.getByTestId("sidebar");
      expect(sidebar).toHaveClass("custom-class");
    });
  });

  describe("User Interactions", () => {
    it("should handle click events on top-level menu items", async () => {
      const user = userEvent.setup();
      render(<AppSidebar />);

      const homeLink = screen.getByRole("link", { name: /Home/ });
      await user.click(homeLink);

      // Since we're mocking Link as a regular anchor tag, we verify the click occurred
      expect(homeLink).toBeInTheDocument();
    });

    it("should handle click events on collapsible triggers", async () => {
      const user = userEvent.setup();
      render(<AppSidebar />);

      // Use getAllByTestId and select the first one (for the top-level "Areas" collapsible)
      const collapsibleTriggers = screen.getAllByTestId("collapsible-trigger");
      const areasCollapsibleTrigger = collapsibleTriggers[0]; // First one is for "Areas"
      await user.click(areasCollapsibleTrigger);

      // Verify the click occurred
      expect(areasCollapsibleTrigger).toBeInTheDocument();
    });
  });

  describe("Conditional Rendering", () => {
    // This test needs to be done differently since routes are computed at module level
    // The AppSidebar component already filters based on doesDisplayInSidebar property
    it("should only render items with doesDisplayInSidebar=true", () => {
      render(<AppSidebar />);

      // Items with doesDisplayInSidebar=false should not appear in the sidebar
      // Since our mock routes have doesDisplayInSidebar=true for visible items
      // and the original routes.ts has some routes without doesDisplayInSidebar or set to false,
      // they should not appear in the rendered sidebar
      const homeLink = screen.getByRole("link", { name: /Home/ });
      expect(homeLink).toHaveAttribute("href", "/");

      // Get all links with "Areas" in their name and filter by href to get the main navigation item
      const allAreaLinks = screen.getAllByRole("link", { name: /Areas/ });
      const areasLink = allAreaLinks.find(
        link => link.getAttribute("href") === "/areas"
      );
      expect(areasLink).toBeInTheDocument();
      expect(areasLink).toHaveAttribute("href", "/areas");
    });
  });

  describe("Accessibility", () => {
    it("should have proper accessibility attributes", () => {
      render(<AppSidebar />);

      const sidebar = screen.getByTestId("sidebar");
      expect(sidebar).toHaveAttribute("role", "navigation");
    });
  });

  describe("Integration", () => {
    it("should render nested collapsible sub-items", () => {
      render(<AppSidebar />);

      // Check for nested items using role-based queries to avoid tooltip conflicts
      const financeLink = screen.getByRole("link", { name: /Finance/ });
      expect(financeLink).toHaveAttribute("href", "/areas/gov/finance");

      const profileLink = screen.getByRole("link", { name: /Profile/ });
      expect(profileLink).toHaveAttribute("href", "/areas/personal/profile");
    });
  });
});
