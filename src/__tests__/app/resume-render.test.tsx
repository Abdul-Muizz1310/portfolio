/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";

vi.mock("@/components/code-block", () => ({
  CodeBlock: ({ filename, children }: any) => (
    <div data-testid="code-block" data-filename={filename}>
      {children}
    </div>
  ),
}));

import ResumePage, { metadata } from "@/app/resume/page";

describe("Resume page", () => {
  it("has metadata with title containing Resume", () => {
    expect(metadata.title).toContain("Resume");
  });

  it("has metadata with description", () => {
    expect(metadata.description).toBeTruthy();
  });

  it("renders the export resume.pdf link", () => {
    render(<ResumePage />);
    expect(screen.getByText("$ export resume.pdf")).toBeInTheDocument();
  });

  it("renders with filename resume.tsx", () => {
    render(<ResumePage />);
    const codeBlock = screen.getByTestId("code-block");
    expect(codeBlock).toHaveAttribute("data-filename", "resume.tsx");
  });

  it("renders experience data", () => {
    render(<ResumePage />);
    // Check for a role that should exist in resume-data
    expect(screen.getByTestId("code-block").textContent).toMatch(
      /position:/,
    );
  });

  it("renders education data", () => {
    render(<ResumePage />);
    expect(screen.getByTestId("code-block").textContent).toMatch(/degree:/);
  });

  it("renders skills section", () => {
    render(<ResumePage />);
    expect(screen.getByTestId("code-block").textContent).toMatch(/skills/);
  });
});
