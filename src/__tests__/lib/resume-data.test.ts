import {
  PERSONAL_INFO,
  EXPERIENCE,
  EDUCATION,
  EXTRACURRICULARS,
  SKILLS,
  VALUES,
} from "@/lib/resume-data";

describe("PERSONAL_INFO", () => {
  it("has all required fields", () => {
    expect(PERSONAL_INFO).toHaveProperty("name");
    expect(PERSONAL_INFO).toHaveProperty("title");
    expect(PERSONAL_INFO).toHaveProperty("location");
    expect(PERSONAL_INFO).toHaveProperty("email");
    expect(PERSONAL_INFO).toHaveProperty("summary");
  });

  it("has non-empty string values", () => {
    expect(PERSONAL_INFO.name.length).toBeGreaterThan(0);
    expect(PERSONAL_INFO.title.length).toBeGreaterThan(0);
    expect(PERSONAL_INFO.location.length).toBeGreaterThan(0);
    expect(PERSONAL_INFO.email.length).toBeGreaterThan(0);
    expect(PERSONAL_INFO.summary.length).toBeGreaterThan(0);
  });
});

describe("EXPERIENCE", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(EXPERIENCE)).toBe(true);
    expect(EXPERIENCE.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    EXPERIENCE.forEach((entry) => {
      expect(entry).toHaveProperty("hash");
      expect(entry).toHaveProperty("role");
      expect(entry).toHaveProperty("company");
      expect(entry).toHaveProperty("location");
      expect(entry).toHaveProperty("startDate");
      expect(entry).toHaveProperty("endDate");
      expect(entry).toHaveProperty("description");
      expect(Array.isArray(entry.description)).toBe(true);
      expect(entry.description.length).toBeGreaterThan(0);
    });
  });
});

describe("EDUCATION", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(EDUCATION)).toBe(true);
    expect(EDUCATION.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    EDUCATION.forEach((entry) => {
      expect(entry).toHaveProperty("hash");
      expect(entry).toHaveProperty("degree");
      expect(entry).toHaveProperty("institution");
      expect(entry).toHaveProperty("location");
      expect(entry).toHaveProperty("startDate");
      expect(entry).toHaveProperty("endDate");
      expect(entry).toHaveProperty("highlights");
      expect(Array.isArray(entry.highlights)).toBe(true);
    });
  });
});

describe("EXTRACURRICULARS", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(EXTRACURRICULARS)).toBe(true);
    expect(EXTRACURRICULARS.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    EXTRACURRICULARS.forEach((entry) => {
      expect(entry).toHaveProperty("hash");
      expect(entry).toHaveProperty("role");
      expect(entry).toHaveProperty("organization");
      expect(entry).toHaveProperty("location");
      expect(entry).toHaveProperty("startDate");
      expect(entry).toHaveProperty("endDate");
      expect(entry).toHaveProperty("description");
      expect(Array.isArray(entry.description)).toBe(true);
    });
  });
});

describe("SKILLS", () => {
  it("has all category keys", () => {
    expect(SKILLS).toHaveProperty("languages");
    expect(SKILLS).toHaveProperty("ai_ml");
    expect(SKILLS).toHaveProperty("frontend");
    expect(SKILLS).toHaveProperty("backend");
    expect(SKILLS).toHaveProperty("databases");
    expect(SKILLS).toHaveProperty("tools");
  });

  it("each category is a non-empty array", () => {
    const categories = ["languages", "ai_ml", "frontend", "backend", "databases", "tools"] as const;
    categories.forEach((cat) => {
      expect(Array.isArray(SKILLS[cat])).toBe(true);
      expect(SKILLS[cat].length).toBeGreaterThan(0);
    });
  });
});

describe("VALUES", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(VALUES)).toBe(true);
    expect(VALUES.length).toBeGreaterThan(0);
  });

  it("each entry has key and value", () => {
    VALUES.forEach((entry) => {
      expect(entry).toHaveProperty("key");
      expect(entry).toHaveProperty("value");
      expect(typeof entry.key).toBe("string");
      expect(typeof entry.value).toBe("string");
    });
  });
});

