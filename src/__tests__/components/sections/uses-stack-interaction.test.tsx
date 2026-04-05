import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsesStack } from "@/components/sections/uses-stack";
import { SKILLS } from "@/lib/resume-data";

vi.mock("framer-motion", async () => import("@/__tests__/mocks/framer-motion"));

describe("UsesStack — SkillBadge hover interaction", () => {
  it("adds highlight class on hover and removes on unhover", async () => {
    const user = userEvent.setup();
    render(<UsesStack />);

    // Pick the first skill from the first category
    const firstCategory = Object.keys(SKILLS)[0] as keyof typeof SKILLS;
    const firstSkill = SKILLS[firstCategory][0];

    // The skill is rendered as `"skillName"` inside a <span>
    const skillElement = screen.getAllByText(`"${firstSkill}"`)[0];

    // Before hover — should not have the highlight class
    expect(skillElement.className).not.toContain("bg-accent-cyan-soft");

    // Hover
    await user.hover(skillElement);
    expect(skillElement.className).toContain("bg-accent-cyan-soft");

    // Unhover
    await user.unhover(skillElement);
    expect(skillElement.className).not.toContain("bg-accent-cyan-soft");
  });
});
