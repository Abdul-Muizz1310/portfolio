"use server";

interface ContactFormState {
  success: boolean;
  message: string;
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Validate
  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // For now, just return success (Resend integration can be added later)
  // In production, this would use the Resend API
  try {
    // TODO: Integrate with Resend API
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });

    return {
      success: true,
      message: "Message sent successfully. Response time: ~24h",
    };
  } catch {
    return {
      success: false,
      message: "Failed to send. Try again or email directly.",
    };
  }
}
