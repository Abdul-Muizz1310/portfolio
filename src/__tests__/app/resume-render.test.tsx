import { render, screen } from "@testing-library/react";

import ResumePage, { metadata } from "@/app/resume/page";

describe("Resume page", () => {
  it("has metadata with title containing Resume", () => {
    expect(metadata.title).toContain("Resume");
  });

  it("has metadata with description", () => {
    expect(metadata.description).toBeTruthy();
  });

  it("renders the download resume link", () => {
    render(<ResumePage />);
    const links = screen.getAllByText("$ download resume.pdf");
    expect(links.length).toBeGreaterThan(0);
    const anchor = links[0].closest("a");
    expect(anchor).toHaveAttribute("href", "/resume.pdf");
    expect(anchor).toHaveAttribute("download");
  });

  it("renders the open in new tab link", () => {
    render(<ResumePage />);
    const link = screen.getByText("$ open --new-tab");
    expect(link.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the embedded PDF viewer", () => {
    render(<ResumePage />);
    expect(
      screen.getByLabelText(/resume pdf/i),
    ).toBeInTheDocument();
  });

  it("renders the window chrome filename", () => {
    render(<ResumePage />);
    expect(screen.getByText(/resume\.pdf — Abdul-Muizz/)).toBeInTheDocument();
  });
});
