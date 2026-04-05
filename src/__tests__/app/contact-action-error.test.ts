const mockSend = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

import { sendContactMessage } from "@/app/contact/action";

const prevState = { success: false, message: "" };

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.set(key, value);
  }
  return fd;
}

const validFields = {
  name: "John Doe",
  email: "john@example.com",
  subject: "Hello",
  message: "Test message",
};

describe("sendContactMessage — Resend error branch", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.RESEND_API_KEY = "test-key";
    mockSend.mockReset();
    mockSend.mockRejectedValue(new Error("Resend API failure"));
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns failure with fallback email when Resend throws", async () => {
    const fd = makeFormData(validFields);
    const result = await sendContactMessage(prevState, fd);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Failed to send");
    expect(result.message).toContain("abdulmuizz1310@outlook.com");
  });
});
