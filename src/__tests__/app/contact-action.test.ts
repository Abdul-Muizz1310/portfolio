const mockSend = vi.fn().mockResolvedValue({});

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

describe("sendContactMessage", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.RESEND_API_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns error when name is missing", async () => {
    const fd = makeFormData({ ...validFields, name: "" });
    const result = await sendContactMessage(prevState, fd);
    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required.");
  });

  it("returns error when email is missing", async () => {
    const fd = makeFormData({ ...validFields, email: "" });
    const result = await sendContactMessage(prevState, fd);
    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required.");
  });

  it("returns error when email is invalid", async () => {
    const fd = makeFormData({ ...validFields, email: "not-an-email" });
    const result = await sendContactMessage(prevState, fd);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Please enter a valid email address.");
  });

  it("returns error when subject is missing", async () => {
    const fd = makeFormData({ ...validFields, subject: "" });
    const result = await sendContactMessage(prevState, fd);
    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required.");
  });

  it("returns error when message is missing", async () => {
    const fd = makeFormData({ ...validFields, message: "" });
    const result = await sendContactMessage(prevState, fd);
    expect(result.success).toBe(false);
    expect(result.message).toBe("All fields are required.");
  });

  it("sends email successfully when RESEND_API_KEY is set", async () => {
    process.env.RESEND_API_KEY = "re_test_123";
    const fd = makeFormData(validFields);
    const result = await sendContactMessage(prevState, fd);
    expect(result.success).toBe(true);
    expect(result.message).toContain("Message sent successfully");
  });

  it("returns fallback success when RESEND_API_KEY is not set", async () => {
    const fd = makeFormData(validFields);
    const result = await sendContactMessage(prevState, fd);
    expect(result.success).toBe(true);
    expect(result.message).toContain(
      "email delivery not yet configured",
    );
  });
});
