/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { UsesStack } from "@/components/sections/uses-stack";
import { SKILLS } from "@/lib/resume-data";

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target: any, prop: string) =>
        ({ children, ...props }: any) => {
          const Tag = prop as any;
          return <Tag {...props}>{children}</Tag>;
        },
    },
  ),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("UsesStack", () => {
  it("renders section header with ~/uses", () => {
    render(<UsesStack />);
    expect(screen.getByText("~/uses")).toBeInTheDocument();
  });

  it("renders skill categories", () => {
    render(<UsesStack />);
    const categories = Object.keys(SKILLS);
    for (const category of categories) {
      // Categories are rendered wrapped in quotes as text
      expect(screen.getByText(`"${category}"`)).toBeInTheDocument();
    }
  });

  it("renders individual skill names", () => {
    render(<UsesStack />);
    const allSkills = Object.values(SKILLS).flat();
    for (const skill of allSkills) {
      // Skills rendered with quotes around them
      const elements = screen.getAllByText(`"${skill}"`);
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it("renders package.json filename", () => {
    render(<UsesStack />);
    expect(screen.getByText("package.json")).toBeInTheDocument();
  });
});
