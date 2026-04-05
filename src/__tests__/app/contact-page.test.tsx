import { render, screen } from "@testing-library/react";

vi.mock("@/app/contact/contact-client", () => ({
  ContactClient: () => <div data-testid="contact-client" />,
}));

import ContactPage, { metadata } from "@/app/contact/page";

describe("Contact page", () => {
  it("has metadata with title and description", () => {
    expect(metadata.title).toContain("Contact");
    expect(metadata.description).toBeTruthy();
  });

  it("renders the ContactClient component", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("contact-client")).toBeInTheDocument();
  });
});
