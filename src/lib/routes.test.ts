import {
  Bell,
  Building,
  Bus,
  FileText,
  Gavel,
  Home,
  Landmark,
  LogIn,
  Scale,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { describe, expect, it } from "vitest";

import {
  findRouteByUri,
  getChildRoutes,
  routes,
  type RouteNode,
} from "@/lib/routes";

describe("routes configuration", () => {
  it("should have the correct structure for root route", () => {
    expect(routes["/"]).toBeDefined();
    expect(routes["/"]).toEqual({
      name: "Home",
      uri: "/",
      icon: Home,
      doesDisplayInSidebar: true,
    });
  });

  it("should have areas route with correct structure", () => {
    const areasRoute = routes["/areas"];
    expect(areasRoute).toBeDefined();
    expect(areasRoute.name).toBe("Areas");
    expect(areasRoute.uri).toBe("/areas");
    expect(areasRoute.icon).toBe(Building);
    expect(areasRoute.doesDisplayInSidebar).toBe(true);
    expect(areasRoute.children).toBeDefined();
  });

  it("should have authentication routes", () => {
    expect(routes["/sign-in"]).toEqual({
      name: "Welcome Back",
      description: "Sign in to your account to continue",
      icon: LogIn,
      uri: "/sign-in",
    });

    expect(routes["/sign-up"]).toEqual({
      name: "Get Started",
      description: "Create an account to continue",
      icon: UserPlus,
      uri: "/sign-up",
    });
  });

  it("should have all government area children", () => {
    const govRoute = routes["/areas"].children?.["/areas/gov"];
    expect(govRoute).toBeDefined();
    expect(govRoute?.children).toBeDefined();

    const govChildren = govRoute?.children;
    expect(govChildren).toHaveProperty("/areas/gov/finance");
    expect(govChildren).toHaveProperty("/areas/gov/public-services");
    expect(govChildren).toHaveProperty("/areas/gov/community");
    expect(govChildren).toHaveProperty("/areas/gov/general");
    expect(govChildren).toHaveProperty("/areas/gov/legal");
    expect(govChildren).toHaveProperty("/areas/gov/council");
    expect(govChildren).toHaveProperty("/areas/gov/accounts");
    expect(govChildren).toHaveProperty("/areas/gov/justice");
  });

  it("should have personal area with profile and notifications", () => {
    const personalRoute = routes["/areas"].children?.["/areas/personal"];
    expect(personalRoute).toBeDefined();
    expect(personalRoute?.children).toHaveProperty("/areas/personal/profile");
    expect(personalRoute?.children).toHaveProperty(
      "/areas/personal/notifications"
    );
  });
});

describe("findRouteByUri", () => {
  it("should find root route", () => {
    const route = findRouteByUri("/");
    expect(route).toBeDefined();
    expect(route?.name).toBe("Home");
    expect(route?.uri).toBe("/");
  });

  it("should find top-level routes", () => {
    const areasRoute = findRouteByUri("/areas");
    expect(areasRoute).toBeDefined();
    expect(areasRoute?.name).toBe("Areas");
    expect(areasRoute?.uri).toBe("/areas");
  });

  it("should find nested routes", () => {
    const govRoute = findRouteByUri("/areas/gov");
    expect(govRoute).toBeDefined();
    expect(govRoute?.name).toBe("Government Areas");
    expect(govRoute?.uri).toBe("/areas/gov");
  });

  it("should find deep nested routes", () => {
    const financeRoute = findRouteByUri("/areas/gov/finance");
    expect(financeRoute).toBeDefined();
    expect(financeRoute?.name).toBe("Finance, Infrastructure & Planning");
    expect(financeRoute?.uri).toBe("/areas/gov/finance");
    expect(financeRoute?.icon).toBe(Building);
  });

  it("should find all government area routes", () => {
    const testCases = [
      {
        uri: "/areas/gov/finance",
        name: "Finance, Infrastructure & Planning",
        icon: Building,
      },
      {
        uri: "/areas/gov/public-services",
        name: "Public Services & Urban Mobility",
        icon: Bus,
      },
      {
        uri: "/areas/gov/community",
        name: "Community Engagement",
        icon: Users,
      },
      {
        uri: "/areas/gov/general",
        name: "General Secretariat",
        icon: FileText,
      },
      {
        uri: "/areas/gov/legal",
        name: "Legal & Institutional Affairs",
        icon: Scale,
      },
      {
        uri: "/areas/gov/council",
        name: "Deliberative Council",
        icon: Landmark,
      },
      { uri: "/areas/gov/accounts", name: "Court of Accounts", icon: FileText },
      { uri: "/areas/gov/justice", name: "Misdemeanor Court", icon: Gavel },
    ];

    testCases.forEach(({ uri, name, icon }) => {
      const route = findRouteByUri(uri);
      expect(route).toBeDefined();
      expect(route?.name).toBe(name);
      expect(route?.uri).toBe(uri);
      expect(route?.icon).toBe(icon);
    });
  });

  it("should find personal area routes", () => {
    const personalRoute = findRouteByUri("/areas/personal");
    expect(personalRoute).toBeDefined();
    expect(personalRoute?.name).toBe("Personal Area");

    const profileRoute = findRouteByUri("/areas/personal/profile");
    expect(profileRoute).toBeDefined();
    expect(profileRoute?.name).toBe("Profile");
    expect(profileRoute?.icon).toBe(User);

    const notificationsRoute = findRouteByUri("/areas/personal/notifications");
    expect(notificationsRoute).toBeDefined();
    expect(notificationsRoute?.name).toBe("Notifications");
    expect(notificationsRoute?.icon).toBe(Bell);
  });

  it("should find authentication routes", () => {
    const signInRoute = findRouteByUri("/sign-in");
    expect(signInRoute).toBeDefined();
    expect(signInRoute?.name).toBe("Welcome Back");
    expect(signInRoute?.icon).toBe(LogIn);

    const signUpRoute = findRouteByUri("/sign-up");
    expect(signUpRoute).toBeDefined();
    expect(signUpRoute?.name).toBe("Get Started");
    expect(signUpRoute?.icon).toBe(UserPlus);
  });

  it("should return undefined for non-existent routes", () => {
    expect(findRouteByUri("/non-existent")).toBeUndefined();
    expect(findRouteByUri("/areas/non-existent")).toBeUndefined();
    expect(findRouteByUri("/areas/gov/non-existent")).toBeUndefined();
    expect(findRouteByUri("/areas/personal/non-existent")).toBeUndefined();
  });

  it("should handle edge cases", () => {
    expect(findRouteByUri("")).toBeUndefined();
    expect(findRouteByUri("//")).toBeUndefined();
    expect(findRouteByUri("///")).toBeUndefined();
  });

  it("should handle URIs without leading slash", () => {
    const areasRoute = findRouteByUri("areas");
    expect(areasRoute).toBeDefined();
    expect(areasRoute?.uri).toBe("/areas");
  });

  it("should handle trailing slashes correctly", () => {
    const route = findRouteByUri("/areas/");
    expect(route).toBeDefined();
    expect(route?.uri).toBe("/areas");
  });
});

describe("getChildRoutes", () => {
  it("should return children for routes that have them", () => {
    const areasRoute = findRouteByUri("/areas");
    const children = getChildRoutes(areasRoute!);

    expect(children).toBeDefined();
    expect(Array.isArray(children)).toBe(true);
    expect(children).toHaveLength(2);

    const childUris = children!.map(child => child.uri);
    expect(childUris).toContain("/areas/gov");
    expect(childUris).toContain("/areas/personal");
  });

  it("should return government area children", () => {
    const govRoute = findRouteByUri("/areas/gov");
    const children = getChildRoutes(govRoute!);

    expect(children).toBeDefined();
    expect(Array.isArray(children)).toBe(true);
    expect(children).toHaveLength(8);

    const childUris = children!.map(child => child.uri);
    expect(childUris).toContain("/areas/gov/finance");
    expect(childUris).toContain("/areas/gov/public-services");
    expect(childUris).toContain("/areas/gov/community");
    expect(childUris).toContain("/areas/gov/general");
    expect(childUris).toContain("/areas/gov/legal");
    expect(childUris).toContain("/areas/gov/council");
    expect(childUris).toContain("/areas/gov/accounts");
    expect(childUris).toContain("/areas/gov/justice");
  });

  it("should return personal area children", () => {
    const personalRoute = findRouteByUri("/areas/personal");
    const children = getChildRoutes(personalRoute!);

    expect(children).toBeDefined();
    expect(Array.isArray(children)).toBe(true);
    expect(children).toHaveLength(2);

    const childUris = children!.map(child => child.uri);
    expect(childUris).toContain("/areas/personal/profile");
    expect(childUris).toContain("/areas/personal/notifications");
  });

  it("should return undefined for routes without children", () => {
    const homeRoute = findRouteByUri("/");
    expect(getChildRoutes(homeRoute!)).toBeUndefined();

    const financeRoute = findRouteByUri("/areas/gov/finance");
    expect(getChildRoutes(financeRoute!)).toBeUndefined();

    const profileRoute = findRouteByUri("/areas/personal/profile");
    expect(getChildRoutes(profileRoute!)).toBeUndefined();

    const signInRoute = findRouteByUri("/sign-in");
    expect(getChildRoutes(signInRoute!)).toBeUndefined();
  });

  it("should handle RouteNode with empty children object", () => {
    const mockRoute: RouteNode = {
      name: "Test",
      uri: "/test",
      children: {},
    };

    const children = getChildRoutes(mockRoute);
    expect(children).toBeDefined();
    expect(Array.isArray(children)).toBe(true);
    expect(children).toHaveLength(0);
  });
});

describe("route properties validation", () => {
  const getAllRoutes = (routeMap: Record<string, RouteNode>): RouteNode[] => {
    const routes: RouteNode[] = [];

    const traverse = (routeMap: Record<string, RouteNode>) => {
      Object.values(routeMap).forEach(route => {
        routes.push(route);
        if (route.children) {
          traverse(route.children);
        }
      });
    };

    traverse(routeMap);
    return routes;
  };

  it("should have valid URI format for all routes", () => {
    const allRoutes = getAllRoutes(routes);

    allRoutes.forEach(route => {
      expect(route.uri).toBeDefined();
      expect(typeof route.uri).toBe("string");
      expect(route.uri.startsWith("/")).toBe(true);
    });
  });

  it("should have consistent sidebar display properties", () => {
    const allRoutes = getAllRoutes(routes);

    allRoutes.forEach(route => {
      if (route.doesDisplayInSidebar !== undefined) {
        expect(typeof route.doesDisplayInSidebar).toBe("boolean");
      }
    });
  });

  it("should have names for routes that display in sidebar", () => {
    const allRoutes = getAllRoutes(routes);

    allRoutes.forEach(route => {
      if (route.doesDisplayInSidebar === true) {
        expect(route.name).toBeDefined();
        expect(typeof route.name).toBe("string");
        expect(route.name!.length).toBeGreaterThan(0);
      }
    });
  });

  it("should have icons for routes that display in sidebar", () => {
    const allRoutes = getAllRoutes(routes);

    allRoutes.forEach(route => {
      if (route.doesDisplayInSidebar === true) {
        expect(route.icon).toBeDefined();
        // Lucide icons are objects in test environment, not functions
        expect(["function", "object"].includes(typeof route.icon)).toBe(true);
        // Additional check to ensure it's not null
        expect(route.icon).not.toBeNull();
      }
    });
  });
});
