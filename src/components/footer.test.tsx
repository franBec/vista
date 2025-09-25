import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/footer";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ href, children, className, target, rel }: any) => (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      data-testid="next-link"
    >
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  it("should render footer with correct structure", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("class", "border-t border-border py-12");
  });

  it("should render container with correct classes", () => {
    render(<Footer />);

    const container = document.querySelector(
      ".container.mx-auto.px-4.max-w-6xl"
    );
    expect(container).toBeInTheDocument();
  });

  it("should render main title and description", () => {
    render(<Footer />);

    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Municipal Services");
    expect(title).toHaveAttribute("class", "text-2xl font-bold");

    const description = screen.getByText(
      "VISTA - Virtual Integrated System for Town Administration"
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute("class", "text-muted-foreground");
  });

  it("should render main flex layout", () => {
    render(<Footer />);

    const mainLayout = document.querySelector(
      ".flex.flex-col.md\\:flex-row.justify-between.items-center"
    );
    expect(mainLayout).toBeInTheDocument();
  });

  it("should render brand section with correct styling", () => {
    render(<Footer />);

    const brandSection = screen
      .getByRole("heading", { level: 3 })
      .closest("div");
    expect(brandSection).toHaveAttribute("class", "mb-6 md:mb-0");
  });

  it("should render attribution text with external link", () => {
    render(<Footer />);

    // Use getByText with partial match for mixed content
    expect(screen.getByText(/Made by/)).toBeInTheDocument();
    expect(screen.getByText(/with Next\.js and ❤/)).toBeInTheDocument();

    const pollitoLink = screen.getByRole("link", { name: "Pollito" });
    expect(pollitoLink).toBeInTheDocument();
    expect(pollitoLink).toHaveAttribute("href", "https://pollito.dev/");
    expect(pollitoLink).toHaveAttribute("target", "_blank");
    expect(pollitoLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(pollitoLink).toHaveAttribute(
      "class",
      "text-primary hover:underline"
    );
  });

  it("should render right section with correct alignment", () => {
    render(<Footer />);

    const rightSection = screen.getByText(/Made by/).closest("div");
    expect(rightSection).toHaveAttribute(
      "class",
      "flex flex-col items-center md:items-end"
    );
  });

  it("should render contact creator email link", () => {
    render(<Footer />);

    const contactLink = screen.getByRole("link", { name: "Contact Creator" });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "mailto:franbecvort@gmail.com");
    expect(contactLink).toHaveAttribute(
      "class",
      "text-muted-foreground hover:text-foreground transition-colors"
    );
  });

  it("should render privacy policy link", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
    expect(privacyLink).toHaveAttribute(
      "class",
      "text-muted-foreground hover:text-foreground transition-colors"
    );
  });

  it("should render terms of service link", () => {
    render(<Footer />);

    const termsLink = screen.getByRole("link", { name: "Terms of Service" });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");
    expect(termsLink).toHaveAttribute(
      "class",
      "text-muted-foreground hover:text-foreground transition-colors"
    );
  });

  it("should render links section with correct layout", () => {
    render(<Footer />);

    // Find the container with the links
    const linksContainer = screen
      .getByRole("link", { name: "Contact Creator" })
      .closest("div");
    expect(linksContainer).toHaveAttribute("class", "flex gap-4 mt-2");
  });

  it("should render copyright section", () => {
    render(<Footer />);

    const copyrightText = screen.getByText("COPYRIGHT LOLOLOL");
    expect(copyrightText).toBeInTheDocument();

    const copyrightContainer = copyrightText.closest("div");
    expect(copyrightContainer).toHaveAttribute(
      "class",
      "mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground"
    );
  });

  it("should have correct number of links", () => {
    render(<Footer />);

    // Should have: Pollito link + Contact + Privacy + Terms = 4 total links
    const allLinks = screen.getAllByRole("link");
    expect(allLinks).toHaveLength(4);
  });

  it("should have external link with proper security attributes", () => {
    render(<Footer />);

    const externalLink = screen.getByRole("link", { name: "Pollito" });
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should have email link with mailto protocol", () => {
    render(<Footer />);

    const emailLink = screen.getByRole("link", { name: "Contact Creator" });
    expect(emailLink.getAttribute("href")).toMatch(/^mailto:/);
    expect(emailLink).toHaveAttribute("href", "mailto:franbecvort@gmail.com");
  });

  it("should render all text content correctly", () => {
    render(<Footer />);

    // Check all expected text content is present
    expect(screen.getByText("Municipal Services")).toBeInTheDocument();
    expect(
      screen.getByText(
        "VISTA - Virtual Integrated System for Town Administration"
      )
    ).toBeInTheDocument();

    // Use partial text matching for mixed content
    expect(screen.getByText(/Made by/)).toBeInTheDocument();
    expect(screen.getByText("Pollito")).toBeInTheDocument();
    expect(screen.getByText(/with Next\.js and ❤/)).toBeInTheDocument();

    expect(screen.getByText("Contact Creator")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("COPYRIGHT LOLOLOL")).toBeInTheDocument();
  });

  it("should have proper semantic structure", () => {
    render(<Footer />);

    // Check footer is a proper contentinfo landmark
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    // Check there's exactly one h3 heading
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(1);
  });

  it("should render internal navigation links correctly", () => {
    render(<Footer />);

    const nextLinks = screen.getAllByTestId("next-link");

    // Should have Next.js Links for privacy and terms (Pollito link is also a Next.js Link)
    expect(nextLinks).toHaveLength(3); // Pollito, Privacy, Terms

    // Check specific Next.js links
    const privacyLink = nextLinks.find(
      link => link.getAttribute("href") === "/privacy"
    );
    const termsLink = nextLinks.find(
      link => link.getAttribute("href") === "/terms"
    );
    const pollitoLink = nextLinks.find(
      link => link.getAttribute("href") === "https://pollito.dev/"
    );

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(pollitoLink).toBeInTheDocument();
  });

  it("should not have any broken or empty links", () => {
    render(<Footer />);

    const allLinks = screen.getAllByRole("link");

    allLinks.forEach(link => {
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toBe("");
      expect(href).not.toBe("#");
    });
  });

  it("should have consistent styling classes", () => {
    render(<Footer />);

    // Test that muted-foreground class is used consistently
    const mutedElements = document.querySelectorAll(".text-muted-foreground");
    expect(mutedElements.length).toBeGreaterThanOrEqual(4); // Description, attribution text, links, copyright

    // Test hover classes are present on interactive elements
    const hoverElements = document.querySelectorAll(
      ".hover\\:underline, .hover\\:text-foreground"
    );
    expect(hoverElements.length).toBeGreaterThanOrEqual(1);
  });

  it("should maintain responsive design classes", () => {
    render(<Footer />);

    // Check responsive classes exist
    expect(
      document.querySelector(".flex-col.md\\:flex-row")
    ).toBeInTheDocument();
    expect(document.querySelector(".mb-6.md\\:mb-0")).toBeInTheDocument();
    expect(
      document.querySelector(".items-center.md\\:items-end")
    ).toBeInTheDocument();
  });

  it("should render complete attribution paragraph", () => {
    render(<Footer />);

    // Find the paragraph containing the attribution
    const attributionParagraph = screen.getByText(/Made by/).closest("p");
    expect(attributionParagraph).toBeInTheDocument();
    expect(attributionParagraph).toHaveAttribute(
      "class",
      "text-muted-foreground"
    );

    // Check it contains all expected parts
    expect(attributionParagraph).toHaveTextContent(/Made by/);
    expect(attributionParagraph).toHaveTextContent(/Pollito/);
    expect(attributionParagraph).toHaveTextContent(/with Next\.js and ❤/);
  });
});

// Integration tests
describe("Footer Integration", () => {
  it("should render complete footer layout without errors", () => {
    const { container } = render(<Footer />);

    // Should not have any console errors and render complete structure
    expect(container.querySelector("footer")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("should have logical content flow", () => {
    render(<Footer />);

    // Content should appear in logical order
    const footer = screen.getByRole("contentinfo");
    const textContent = footer.textContent || "";

    // Brand should come before attribution
    expect(textContent.indexOf("Municipal Services")).toBeLessThan(
      textContent.indexOf("Made by")
    );

    // Attribution should come before links
    expect(textContent.indexOf("Made by")).toBeLessThan(
      textContent.indexOf("Contact Creator")
    );

    // Links should come before copyright
    expect(textContent.indexOf("Contact Creator")).toBeLessThan(
      textContent.indexOf("COPYRIGHT LOLOLOL")
    );
  });
});
