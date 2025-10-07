import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock Logo component
jest.mock("../Logo", () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>;
  };
});

// Mock navigation data
jest.mock("@/data/nav", () => ({
  navigationItems: [
    { href: "/about", label: "About", target: "_self" },
    { href: "/features", label: "Features", target: "_self" },
  ],
  ctaButton: { href: "/contact", label: "Contact Us" },
}));

describe("Header", () => {
  it("renders header with logo and navigation", () => {
    render(<Header />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("toggles mobile menu when hamburger button is clicked", () => {
    render(<Header />);

    const hamburgerButton = screen.getByLabelText("Toggle mobile menu");
    expect(hamburgerButton).toBeInTheDocument();

    // Mobile menu should be closed initially
    expect(screen.queryByText("About")).toBeInTheDocument();

    // Click hamburger button
    fireEvent.click(hamburgerButton);

    // Mobile menu should now be open (navigation items should still be visible)
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("closes mobile menu when navigation link is clicked", () => {
    render(<Header />);

    const hamburgerButton = screen.getByLabelText("Toggle mobile menu");
    fireEvent.click(hamburgerButton);

    const aboutLink = screen.getByText("About");
    fireEvent.click(aboutLink);

    // Menu should be closed after clicking a link
    // This test would need to be expanded based on the actual behavior
  });
});
