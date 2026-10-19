import { render } from "@testing-library/react";
import { JsonLd } from "@/components/json-ld";

describe("JsonLd", () => {
  it("renders an application/ld+json script with the serialized data", () => {
    const { container } = render(
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: "Test" }} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    expect(JSON.parse(script?.innerHTML ?? "")).toEqual({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Test",
    });
  });

  it("escapes < so injected markup can't close the script tag", () => {
    const { container } = render(
      <JsonLd data={{ "@context": "https://schema.org", name: "</script><b>x</b>" }} />,
    );
    const script = container.querySelector("script");

    expect(script?.innerHTML).not.toContain("</script>");
    expect(script?.innerHTML).toContain("\\u003c/script>");
    expect(JSON.parse(script?.innerHTML ?? "").name).toBe("</script><b>x</b>");
  });
});
