import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"SpendWise" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

export { sendEmail };
