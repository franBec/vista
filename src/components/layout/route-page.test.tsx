import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RoutePage } from "@/components/route-page";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  } & React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div
      data-src={src}
      data-alt={alt}
      data-width={width}
      data-height={height}
      data-testid="next-image"
      className={className}
    />
  ),
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock the UI Card components
vi.mock("@/components/ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div className={className} data-testid="card-header">
      {children}
    </div>
  ),
  CardTitle: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={className} data-testid="card-title">
      {children}
    </h3>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div className={className} data-testid="card-content">
      {children}
    </div>
  ),
  CardDescription: ({
    children,
  }: {
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLParagraphElement>) => (
    <p data-testid="card-description">{children}</p>
  ),
}));

// Mock the routes module
vi.mock("@/lib/routes", () => {
  const mockIcon = ({ className }: { className?: string }) => (
    <svg className={className} data-testid="mock-icon">
      <title>Mock Icon</title>
    </svg>
  );

  return {
    findRouteByUri: vi.fn((uri: string) => {
      const routes: Record<
        string,
        {
          name?: string;
          uri: string;
          icon?: React.ComponentType<{ className?: string }>;
          description?: string;
        }
      > = {
        "/": {
          name: "Home",
          uri: "/",
          icon: mockIcon,
          description: "Home page description",
        },
        "/areas": {
          name: "Areas",
          uri: "/areas",
          icon: mockIcon,
          description: "Areas page description",
        },
        "/no-description": {
          name: "No Description",
          uri: "/no-description",
          icon: mockIcon,
        },
        "/no-icon": {
          name: "No Icon",
          uri: "/no-icon",
          description: "Page without icon",
        },
        "/minimal": {
          uri: "/minimal",
        },
      };
      return routes[uri] || null;
    }),
    getChildRoutes: vi.fn((route: { uri?: string }) => {
      if (route?.uri === "/areas") {
        return [
          {
            name: "Government Areas",
            uri: "/areas/gov",
            description: "Government related areas",
            icon: ({
              className,
            }: { className?: string } & React.SVGProps<SVGSVGElement>) => (
              <svg className={className} data-testid="gov-icon">
                <title>Gov Icon</title>
              </svg>
            ),
          },
          {
            name: "Personal Area",
            uri: "/areas/personal",
            description: "Personal information and settings",
            icon: ({
              className,
            }: { className?: string } & React.SVGProps<SVGSVGElement>) => (
              <svg className={className} data-testid="personal-icon">
                <title>Personal Icon</title>
              </svg>
            ),
          },
        ];
      }
      if (route?.uri === "/") {
        return [];
      }
      return undefined;
    }),
  };
});

describe("RoutePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Main RoutePage component", () => {
    it("should render container when route exists", () => {
      render(
        <RoutePage uri="/">
          <div data-testid="child-content">Test content</div>
        </RoutePage>
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();

      const container = screen.getByText("Test content").parentElement;
      expect(container).toHaveAttribute("class", "container mx-auto py-8");
    });

    it("should throw error when route does not exist", () => {
      expect(() => {
        render(<RoutePage uri="/non-existent" />);
      }).toThrow("No route found with URI: /non-existent");
    });

    it("should render without children", () => {
      render(<RoutePage uri="/" />);

      const container = document.querySelector(".container");
      expect(container).toBeInTheDocument();
    });
  });

  describe("RoutePage.Header", () => {
    it("should render route name and description with icon", () => {
      const mockRoute = {
        name: "Test Route",
        description: "Test description",
        uri: "/test",
        icon: ({ className }: { className?: string }) => (
          <svg className={className} data-testid="test-icon">
            <title>Test Icon</title>
          </svg>
        ),
      };

      render(<RoutePage.Header route={mockRoute} />);

      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByText("Test Route")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();

      const icon = screen.getByTestId("test-icon");
      expect(icon).toHaveAttribute("class", "h-8 w-8");
    });

    it("should render without icon", () => {
      const mockRoute = {
        name: "Test Route",
        description: "Test description",
        uri: "/test",
      };

      render(<RoutePage.Header route={mockRoute} />);

      expect(screen.getByText("Test Route")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });

    it("should show fallback text for missing name", () => {
      const mockRoute = {
        description: "Test description",
        uri: "/test",
      };

      render(<RoutePage.Header route={mockRoute} />);

      expect(screen.getByText("Untitled")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("should show fallback text for missing description", () => {
      const mockRoute = {
        name: "Test Route",
        uri: "/test",
      };

      render(<RoutePage.Header route={mockRoute} />);

      expect(screen.getByText("Test Route")).toBeInTheDocument();
      expect(screen.getByText("No description available")).toBeInTheDocument();
    });
  });

  describe("RoutePage.Content", () => {
    it("should render children", () => {
      render(
        <RoutePage.Content>
          <div data-testid="content-child">Content here</div>
        </RoutePage.Content>
      );

      expect(screen.getByTestId("content-child")).toBeInTheDocument();
      expect(screen.getByText("Content here")).toBeInTheDocument();
    });

    it("should render without children", () => {
      render(<RoutePage.Content />);

      const contentDiv = document.querySelector("div");
      expect(contentDiv).toBeInTheDocument();
    });
  });

  describe("RoutePage.Grid", () => {
    it("should render grid of route cards", () => {
      const mockRoutes = [
        {
          name: "Route 1",
          uri: "/route1",
          description: "First route description",
          icon: ({
            className,
          }: { className?: string } & React.SVGProps<SVGSVGElement>) => (
            <svg className={className} data-testid="route1-icon">
              <title>Route 1 Icon</title>
            </svg>
          ),
        },
        {
          name: "Route 2",
          uri: "/route2",
          description: "Second route description",
          icon: ({
            className,
          }: { className?: string } & React.SVGProps<SVGSVGElement>) => (
            <svg className={className} data-testid="route2-icon">
              <title>Route 2 Icon</title>
            </svg>
          ),
        },
      ];

      render(<RoutePage.Grid routes={mockRoutes} />);

      // Check grid container
      const grid = document.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveAttribute(
        "class",
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      );

      // Check that both route cards are rendered
      expect(screen.getAllByTestId("card")).toHaveLength(2);
      expect(screen.getAllByTestId("next-link")).toHaveLength(2);

      // Check first route
      expect(screen.getByText("Route 1")).toBeInTheDocument();
      expect(screen.getByText("First route description")).toBeInTheDocument();
      expect(screen.getByTestId("route1-icon")).toBeInTheDocument();

      // Check second route
      expect(screen.getByText("Route 2")).toBeInTheDocument();
      expect(screen.getByText("Second route description")).toBeInTheDocument();
      expect(screen.getByTestId("route2-icon")).toBeInTheDocument();

      // Check links have correct hrefs
      const links = screen.getAllByTestId("next-link");
      expect(links[0]).toHaveAttribute("href", "/route1");
      expect(links[1]).toHaveAttribute("href", "/route2");
    });

    it("should render route card without icon", () => {
      const mockRoutes = [
        {
          name: "No Icon Route",
          uri: "/no-icon",
          description: "Route without icon",
        },
      ];

      render(<RoutePage.Grid routes={mockRoutes} />);

      expect(screen.getByText("No Icon Route")).toBeInTheDocument();
      expect(screen.getByText("Route without icon")).toBeInTheDocument();
      expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    });

    it("should render empty grid when no routes provided", () => {
      render(<RoutePage.Grid routes={[]} />);

      const grid = document.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(screen.queryAllByTestId("card")).toHaveLength(0);
    });
  });

  describe("RoutePage.WithChildRoutes", () => {
    it("should render Grid when routes exist", () => {
      const mockRoutes = [
        { name: "Route 1", uri: "/route1", description: "Test route 1" },
        { name: "Route 2", uri: "/route2", description: "Test route 2" },
      ];

      render(<RoutePage.WithChildRoutes routes={mockRoutes} />);

      // Should render the grid
      const grid = document.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(screen.getAllByTestId("card")).toHaveLength(2);
    });

    it("should return null when routes is undefined", () => {
      const { container } = render(
        <RoutePage.WithChildRoutes routes={undefined} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("should return null when routes is empty array", () => {
      const { container } = render(<RoutePage.WithChildRoutes routes={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("RoutePage.Auto", () => {
    it("should render default layout when no children function provided", () => {
      render(<RoutePage.Auto uri="/areas" />);

      // Should render header
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByText("Areas")).toBeInTheDocument();
      expect(screen.getByText("Areas page description")).toBeInTheDocument();

      // Should render child routes grid with actual cards
      const grid = document.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(screen.getAllByTestId("card")).toHaveLength(2);
      expect(screen.getByText("Government Areas")).toBeInTheDocument();
      expect(screen.getByText("Personal Area")).toBeInTheDocument();
    });

    it("should use custom children function when provided", () => {
      const customChildren = (route: { name: string }) => (
        <div data-testid="custom-content">Custom content for {route.name}</div>
      );

      render(<RoutePage.Auto uri="/areas">{customChildren}</RoutePage.Auto>);

      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
      expect(screen.getByText("Custom content for Areas")).toBeInTheDocument();

      // Should not render default header
      expect(
        screen.queryByRole("heading", { level: 1 })
      ).not.toBeInTheDocument();
    });

    it("should throw error when route does not exist", () => {
      expect(() => {
        render(<RoutePage.Auto uri="/non-existent" />);
      }).toThrow("No route found with URI: /non-existent");
    });
  });

  describe("RoutePage.AuthFormWithImage", () => {
    it("should render children in flex layout", () => {
      render(
        <RoutePage.AuthFormWithImage>
          <div data-testid="auth-child">Auth content</div>
        </RoutePage.AuthFormWithImage>
      );

      expect(screen.getByTestId("auth-child")).toBeInTheDocument();

      const flexContainer = screen.getByTestId("auth-child").parentElement;
      expect(flexContainer).toHaveAttribute(
        "class",
        "flex flex-col md:flex-row gap-8 items-center"
      );
    });
  });

  describe("RoutePage.AuthForm", () => {
    it("should render children in constrained width container", () => {
      render(
        <RoutePage.AuthForm>
          <div data-testid="form-content">Form here</div>
        </RoutePage.AuthForm>
      );

      expect(screen.getByTestId("form-content")).toBeInTheDocument();

      const formContent = screen.getByTestId("form-content");
      const wrapper = formContent.parentElement;
      expect(wrapper).toHaveAttribute("class", "max-w-md mx-auto");

      const outerWrapper = wrapper?.parentElement;
      expect(outerWrapper).toHaveAttribute("class", "w-full md:w-1/2");
    });
  });

  describe("RoutePage.AuthImage", () => {
    it("should render Next.js Image with correct props", () => {
      render(<RoutePage.AuthImage src="/test-image.jpg" alt="Test image" />);

      const image = screen.getByTestId("next-image");
      expect(image).toHaveAttribute("data-src", "/test-image.jpg");
      expect(image).toHaveAttribute("data-alt", "Test image");
      expect(image).toHaveAttribute("data-width", "400");
      expect(image).toHaveAttribute("data-height", "400");
      expect(image).toHaveAttribute("class", "w-full h-auto");
    });

    it("should render in correct wrapper structure", () => {
      render(<RoutePage.AuthImage src="/test.jpg" alt="Test" />);

      const image = screen.getByTestId("next-image");
      const imageWrapper = image.parentElement;
      expect(imageWrapper).toHaveAttribute("class", "max-w-md");

      const outerWrapper = imageWrapper?.parentElement;
      expect(outerWrapper).toHaveAttribute(
        "class",
        "w-full md:w-1/2 flex justify-center"
      );
    });
  });
});

// Integration tests
describe("RoutePage Integration", () => {
  it("should work together with all sub-components", () => {
    render(
      <RoutePage uri="/areas">
        <RoutePage.Header
          route={{
            name: "Areas",
            uri: "/areas",
            description: "All areas",
            icon: ({
              className,
            }: { className?: string } & React.SVGProps<SVGSVGElement>) => (
              <svg className={className} data-testid="areas-icon">
                <title>Areas Icon</title>
              </svg>
            ),
          }}
        />
        <RoutePage.Content>
          <div data-testid="integrated-content">Integrated content</div>
        </RoutePage.Content>
      </RoutePage>
    );

    // Check all parts are rendered
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Areas")).toBeInTheDocument();
    expect(screen.getByText("All areas")).toBeInTheDocument();
    expect(screen.getByTestId("areas-icon")).toBeInTheDocument();
    expect(screen.getByTestId("integrated-content")).toBeInTheDocument();
  });

  it("should render full auto layout with actual grid", () => {
    render(<RoutePage.Auto uri="/areas" />);

    // Should have header, content, and grid
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Areas")).toBeInTheDocument();

    // Should render actual route cards, not mocked grid
    const grid = document.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(screen.getByText("Government Areas")).toBeInTheDocument();
    expect(screen.getByText("Personal Area")).toBeInTheDocument();
    expect(screen.getAllByTestId("card")).toHaveLength(2);
  });
});
