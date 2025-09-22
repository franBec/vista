import {
  Building,
  Bus,
  Users,
  Scale,
  Landmark,
  Gavel,
  FileText,
  User,
  Bell,
} from "lucide-react";

export interface RouteNode {
  name?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  uri: string;
  children?: Record<string, RouteNode>;
}

export const routes: Record<string, RouteNode> = {
  "/": {
    name: "Home",
    uri: "/",
  },
  "/areas": {
    name: "Areas",
    uri: "/areas",
    children: {
      "/areas/gov": {
        name: "Government Areas",
        description:
          "View and manage government-related areas and their information.",
        icon: Building,
        uri: "/areas/gov",
        children: {
          "/areas/gov/finance": {
            name: "Finance, Infrastructure & Planning",
            description:
              "Managing municipal finances, infrastructure development, and urban planning initiatives.",
            icon: Building,
            uri: "/areas/gov/finance",
          },
          "/areas/gov/public-services": {
            name: "Public Services & Urban Mobility",
            description:
              "Overseeing public utilities, maintenance services, and urban transportation systems.",
            icon: Bus,
            uri: "/areas/gov/public-services",
          },
          "/areas/gov/community": {
            name: "Community Engagement",
            description:
              "Fostering connections with residents and promoting neighborhood participation.",
            icon: Users,
            uri: "/areas/gov/community",
          },
          "/areas/gov/general": {
            name: "General Secretariat",
            description:
              "Coordinating administrative functions and supporting overall municipal operations.",
            icon: FileText,
            uri: "/areas/gov/general",
          },
          "/areas/gov/legal": {
            name: "Legal & Institutional Affairs",
            description:
              "Providing legal counsel and managing institutional relationships.",
            icon: Scale,
            uri: "/areas/gov/legal",
          },
          "/areas/gov/council": {
            name: "Deliberative Council",
            description:
              "Legislative body responsible for policy-making and municipal governance.",
            icon: Landmark,
            uri: "/areas/gov/council",
          },
          "/areas/gov/accounts": {
            name: "Court of Accounts",
            description:
              "Overseeing municipal finances and ensuring proper use of public funds.",
            icon: FileText,
            uri: "/areas/gov/accounts",
          },
          "/areas/gov/justice": {
            name: "Misdemeanor Court",
            description:
              "Handling minor legal infractions and maintaining local order.",
            icon: Gavel,
            uri: "/areas/gov/justice",
          },
        },
      },
      "/areas/personal": {
        name: "Personal Area",
        description: "Manage your personal information and private data",
        icon: User,
        uri: "/areas/personal",
        children: {
          "/areas/personal/profile": {
            name: "Profile",
            icon: User,
            uri: "/areas/personal/profile",
          },
          "/areas/personal/notifications": {
            name: "Notifications",
            icon: Bell,
            uri: "/areas/personal/notifications",
          },
        },
      },
    },
  },
  "/sign-in": {
    name: "Sign In",
    uri: "/sign-in",
  },
  "/sign-up": {
    name: "Sign Up",
    uri: "/sign-up",
  },
};

/**
 * Helper function to find a route by its URI
 * Optimized for O(1) lookup in the tree structure
 * @param uri The URI of the route to find
 * @returns The RouteNode object if found, undefined otherwise
 */
export function findRouteByUri(uri: string) {
  const parts = uri.split("/").filter(part => part !== "");
  let currentNode: Record<string, RouteNode> | undefined = routes;
  let currentUri = "";

  if (uri === "/") {
    return routes["/"];
  }

  for (let i = 0; i < parts.length; i++) {
    currentUri += "/" + parts[i];
    if (!currentNode || !currentNode[currentUri]) {
      return undefined;
    }

    if (i === parts.length - 1) {
      return currentNode[currentUri];
    }
    currentNode = currentNode[currentUri].children;
  }

  return undefined;
}

/**
 * Helper function to get children of a given RouteNode
 * @param route The parent RouteNode
 * @returns Array of child RouteNode objects, or undefined if none exist
 */
export function getChildRoutes(route: RouteNode) {
  if (!route.children) {
    return undefined;
  }

  return Object.values(route.children);
}
