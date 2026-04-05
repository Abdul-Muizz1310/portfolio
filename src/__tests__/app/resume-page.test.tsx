import ResumePage, { metadata } from "@/app/resume/page";
import {
  PERSONAL_INFO,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
} from "@/lib/resume-data";

describe("ResumePage — extended", () => {
  it("exports metadata with correct title", () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Resume — Abdul-Muizz");
  });

  it("exports metadata description containing personal info", () => {
    expect(metadata.description).toContain(PERSONAL_INFO.name);
    expect(metadata.description).toContain(PERSONAL_INFO.title);
  });

  it("exports a default function", () => {
    expect(typeof ResumePage).toBe("function");
  });

  it("PERSONAL_INFO has required fields", () => {
    expect(PERSONAL_INFO.name).toBeDefined();
    expect(PERSONAL_INFO.title).toBeDefined();
    expect(PERSONAL_INFO.location).toBeDefined();
    expect(PERSONAL_INFO.email).toBeDefined();
    expect(PERSONAL_INFO.summary).toBeDefined();
  });

  it("EXPERIENCE is a non-empty array with expected shape", () => {
    expect(Array.isArray(EXPERIENCE)).toBe(true);
    expect(EXPERIENCE.length).toBeGreaterThan(0);
    const first = EXPERIENCE[0];
    expect(first).toHaveProperty("role");
    expect(first).toHaveProperty("company");
    expect(first).toHaveProperty("description");
  });

  it("EDUCATION is a non-empty array with expected shape", () => {
    expect(Array.isArray(EDUCATION)).toBe(true);
    expect(EDUCATION.length).toBeGreaterThan(0);
    const first = EDUCATION[0];
    expect(first).toHaveProperty("degree");
    expect(first).toHaveProperty("institution");
    expect(first).toHaveProperty("highlights");
  });

  it("SKILLS is an object with at least one category", () => {
    expect(typeof SKILLS).toBe("object");
    const keys = Object.keys(SKILLS);
    expect(keys.length).toBeGreaterThan(0);
    keys.forEach((key) => {
      expect(Array.isArray(SKILLS[key as keyof typeof SKILLS])).toBe(true);
    });
  });
});
