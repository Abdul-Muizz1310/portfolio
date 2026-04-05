/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { ContactClient } from "@/app/contact/contact-client";

vi.mock("@/app/contact/action", () => ({
  sendContactMessage: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("ContactClient", () => {
  it("renders the name field", () => {
    render(<ContactClient />);
    expect(screen.getByLabelText("name:")).toBeInTheDocument();
  });

  it("renders the email field", () => {
    render(<ContactClient />);
    expect(screen.getByLabelText("email:")).toBeInTheDocument();
  });

  it("renders the subject field", () => {
    render(<ContactClient />);
    expect(screen.getByLabelText("subject:")).toBeInTheDocument();
  });

  it("renders the message field", () => {
    render(<ContactClient />);
    expect(screen.getByLabelText("message:")).toBeInTheDocument();
  });

  it("renders submit button with correct text", () => {
    render(<ContactClient />);
    expect(screen.getByRole("button", { name: /send --message/ })).toBeInTheDocument();
  });

  it("renders GitHub social link", () => {
    render(<ContactClient />);
    expect(screen.getByText("github.com/Abdul-Muizz1310")).toBeInTheDocument();
  });

  it("renders LinkedIn social link", () => {
    render(<ContactClient />);
    expect(screen.getByText("linkedin.com/in/abdulmuizz1310")).toBeInTheDocument();
  });

  it("renders Email social link", () => {
    render(<ContactClient />);
    expect(screen.getByText("abdulmuizz1310@outlook.com")).toBeInTheDocument();
  });

  it("renders section header", () => {
    render(<ContactClient />);
    expect(screen.getByText(/ping abdul-muizz/)).toBeInTheDocument();
  });
});
