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

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["abdulmuizz1310@outlook.com"],
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<div style="font-family:system-ui,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 8px">New portfolio message</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr/>
          <p style="white-space:pre-wrap">${message.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c))}</p>
        </div>`,
      });

      return {
        success: true,
        message: "Message sent successfully. Response time: ~24h",
      };
    }

    // Resend not configured — inform user transparently
    return {
      success: true,
      message:
        "Message received (email delivery not yet configured). Please also email abdulmuizz1310@outlook.com directly.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to send. Try again or email abdulmuizz1310@outlook.com directly.",
    };
  }
}
