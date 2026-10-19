/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";

// Capture what would be handed to Satori instead of rasterizing it
vi.mock("next/og", () => ({
  ImageResponse: vi.fn(function (this: any, element: ReactElement, options: unknown) {
    this.element = element;
    this.options = options;
  }),
}));

import Image, { alt, contentType, size } from "@/app/opengraph-image";
import { PERSONAL_INFO } from "@/lib/resume-data";
import { SITE_HOST } from "@/lib/og-image";

describe("root opengraph-image", () => {
  it("exports 1200x630 PNG metadata", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt).toBe(`${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`);
  });

  it("renders the name, title, avatar and host with the bundled fonts", async () => {
    const response = (await Image()) as any;

    expect(response.options).toMatchObject({ width: 1200, height: 630 });
    expect(response.options.fonts).toHaveLength(3);

    render(response.element);
    expect(screen.getByText(PERSONAL_INFO.name)).toBeInTheDocument();
    expect(screen.getByText(PERSONAL_INFO.title)).toBeInTheDocument();
    expect(screen.getByText(PERSONAL_INFO.location)).toBeInTheDocument();
    expect(screen.getByText(SITE_HOST)).toBeInTheDocument();
    expect(screen.getByAltText(PERSONAL_INFO.name).getAttribute("src")).toMatch(
      /^data:image\/jpeg;base64,/,
    );
  });
});
