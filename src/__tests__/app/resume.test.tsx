import ResumePage, { metadata } from "@/app/resume/page";

describe("ResumePage", () => {
  it("exports metadata with title", () => {
    expect(metadata).toBeDefined();
    // Rendered as "Resume — Abdul-Muizz Anwar" via the root title template
    expect(metadata.title).toBe("Resume");
  });

  it("exports metadata with description", () => {
    expect(metadata.description).toBeDefined();
    expect(typeof metadata.description).toBe("string");
  });

  it("exports a default function", () => {
    expect(typeof ResumePage).toBe("function");
  });
});
