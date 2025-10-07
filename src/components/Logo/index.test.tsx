import { render, screen } from "@testing-library/react";
import Logo from "./index";

describe("Logo", () => {
  it("renders logo component", () => {
    render(<Logo />);

    const logoElement = screen.getByRole("img", { hidden: true });
    expect(logoElement).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<Logo className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders with default className when no className provided", () => {
    const { container } = render(<Logo />);

    expect(container.firstChild).toHaveClass(
      "bg-gradient-h1",
      "rounded",
      "flex",
      "items-center",
      "justify-center"
    );
  });
});
