import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/header";

// Mock the useSidebar hook
const mockToggleSidebar = vi.fn();
vi.mock("@/components/ui/sidebar", () => ({
  useSidebar: () => ({
    toggleSidebar: mockToggleSidebar,
  }),
}));

// Mock Clerk components
vi.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-out">{children}</div>
  ),
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-in-button">{children}</div>
  ),
  SignUpButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-up-button">{children}</div>
  ),
  UserButton: () => <div data-testid="user-button">User Menu</div>,
}));

// Mock ModeToggle component
vi.mock("@/components/theme/mode-toggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Theme Toggle</div>,
}));

// Mock UI Button component
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    variant,
    size,
    className,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
    size?: string;
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
      data-testid="ui-button"
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock Next.js Link
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

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  Building: ({
    className,
  }: { className?: string } & React.SVGProps<SVGSVGElement>) => (
    <svg className={className} data-testid="building-icon">
      <title>Building</title>
    </svg>
  ),
  PanelLeft: ({
    className,
  }: { className?: string } & React.SVGProps<SVGSVGElement>) => (
    <svg className={className} data-testid="panel-left-icon">
      <title>Panel Left</title>
    </svg>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render header with correct structure", () => {
    render(<Header />);

    // Check header element
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute(
      "class",
      "flex items-center justify-between p-4 gap-4 h-16"
    );
  });

  it("should render sidebar toggle button", () => {
    render(<Header />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("data-variant", "ghost");
    expect(toggleButton).toHaveAttribute("data-size", "icon");

    // Check for icon
    expect(screen.getByTestId("panel-left-icon")).toBeInTheDocument();

    // Check for screen reader text
    expect(screen.getByText("Toggle Sidebar")).toBeInTheDocument();
  });

  it("should call toggleSidebar when toggle button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    await user.click(toggleButton);

    expect(mockToggleSidebar).toHaveBeenCalledOnce();
  });

  it("should render brand logo and link", () => {
    render(<Header />);

    // Check link to home
    const homeLink = screen.getByTestId("next-link");
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveAttribute(
      "class",
      "flex items-center gap-2 rounded-md p-2 hover:bg-accent transition-colors duration-200"
    );

    // Check building icon
    expect(screen.getByTestId("building-icon")).toBeInTheDocument();

    // Check brand text
    expect(screen.getByText("Municipal Services")).toBeInTheDocument();
  });

  it("should render authentication components for signed out users", () => {
    render(<Header />);

    // Check SignedOut wrapper
    expect(screen.getByTestId("signed-out")).toBeInTheDocument();

    // Check SignIn and SignUp buttons
    expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
    expect(screen.getByTestId("sign-up-button")).toBeInTheDocument();

    // Check button variants
    const buttons = screen.getAllByTestId("ui-button");
    const signInButton = buttons.find(btn => btn.textContent === "Sign In");
    const signUpButton = buttons.find(btn => btn.textContent === "Sign Up");

    expect(signInButton).toHaveAttribute("data-variant", "default");
    expect(signUpButton).toHaveAttribute("data-variant", "outline");
  });

  it("should render user button for signed in users", () => {
    render(<Header />);

    // Check SignedIn wrapper
    expect(screen.getByTestId("signed-in")).toBeInTheDocument();

    // Check UserButton
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
    expect(screen.getByText("User Menu")).toBeInTheDocument();
  });

  it("should render mode toggle", () => {
    render(<Header />);

    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
    expect(screen.getByText("Theme Toggle")).toBeInTheDocument();
  });

  it("should have correct layout structure", () => {
    render(<Header />);

    const header = screen.getByRole("banner");

    // Get direct children of header (should be exactly 2 divs)
    const directChildren = Array.from(header.children).filter(
      child => child.tagName === "DIV"
    );
    expect(directChildren).toHaveLength(2);

    // Test the left section (first direct child)
    const leftSection = directChildren[0];
    expect(leftSection).toHaveAttribute("class", "flex items-center gap-2");

    // Test the right section (second direct child)
    const rightSection = directChildren[1];
    expect(rightSection).toHaveAttribute("class", "flex items-center gap-4");
  });

  it("should render brand logo with correct styling", () => {
    render(<Header />);

    // Find the logo container
    const logoContainer = screen.getByTestId("building-icon").closest("div");
    expect(logoContainer).toHaveAttribute(
      "class",
      "bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
    );

    // Check building icon has correct size
    const buildingIcon = screen.getByTestId("building-icon");
    expect(buildingIcon).toHaveAttribute("class", "size-4");
  });

  it("should render brand text with correct styling", () => {
    render(<Header />);

    const brandText = screen.getByText("Municipal Services");
    const textContainer = brandText.closest("div");

    expect(textContainer).toHaveAttribute(
      "class",
      "flex flex-col gap-0.5 leading-none"
    );

    expect(brandText).toHaveAttribute("class", "font-bold text-lg");
  });

  it("should render sidebar toggle with correct styling", () => {
    render(<Header />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    expect(toggleButton).toHaveAttribute(
      "class",
      expect.stringContaining("size-7")
    );

    const panelIcon = screen.getByTestId("panel-left-icon");
    expect(panelIcon).toHaveAttribute("class", "size-4");
  });

  it("should handle multiple button clicks", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });

    await user.click(toggleButton);
    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(3);
  });

  it("should render all components in correct order", () => {
    const { container } = render(<Header />);

    const header = container.querySelector("header");
    const directChildren = Array.from(header?.children || []).filter(
      child => child.tagName === "DIV"
    );

    // Should have exactly 2 main divs
    expect(directChildren).toHaveLength(2);

    // First div should contain sidebar toggle and brand
    const leftSection = directChildren[0];
    expect(leftSection.querySelector("button")).toBeInTheDocument(); // Toggle button
    expect(leftSection.querySelector("a")).toBeInTheDocument(); // Brand link

    // Second div should contain auth and theme toggle
    const rightSection = directChildren[1];
    expect(
      rightSection.querySelector('[data-testid="signed-out"]')
    ).toBeInTheDocument();
    expect(
      rightSection.querySelector('[data-testid="signed-in"]')
    ).toBeInTheDocument();
    expect(
      rightSection.querySelector('[data-testid="mode-toggle"]')
    ).toBeInTheDocument();
  });

  it("should contain sidebar toggle and brand in left section", () => {
    render(<Header />);

    // Find elements and check they are in the same parent container
    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    const brandLink = screen.getByTestId("next-link");

    // Both should be in the same parent div
    expect(toggleButton.parentElement).toBe(brandLink.parentElement);

    // That parent should have the left section classes
    expect(toggleButton.parentElement).toHaveAttribute(
      "class",
      "flex items-center gap-2"
    );
  });

  it("should contain auth components and theme toggle in right section", () => {
    render(<Header />);

    // Find elements
    const signedOut = screen.getByTestId("signed-out");
    const signedIn = screen.getByTestId("signed-in");
    const modeToggle = screen.getByTestId("mode-toggle");

    // All should be in the same parent div
    const rightSection = signedOut.parentElement;
    expect(signedIn.parentElement).toBe(rightSection);
    expect(modeToggle.parentElement).toBe(rightSection);

    // That parent should have the right section classes
    expect(rightSection).toHaveAttribute("class", "flex items-center gap-4");
  });
});

// Integration-style tests
describe("Header Integration", () => {
  it("should work correctly when user interacts with sidebar toggle multiple times", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });

    // Test rapid clicking
    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
    expect(screen.getByText("Municipal Services")).toBeInTheDocument();
  });

  it("should maintain all functionality with different authentication states", () => {
    render(<Header />);

    // Both authentication states should be present
    expect(screen.getByTestId("signed-in")).toBeInTheDocument();
    expect(screen.getByTestId("signed-out")).toBeInTheDocument();

    // Core functionality should remain
    expect(
      screen.getByRole("button", { name: /toggle sidebar/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("next-link")).toHaveAttribute("href", "/");
  });
});
