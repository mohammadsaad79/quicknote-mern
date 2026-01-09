const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
    try {
        const {name, email, subject, message} = req.body;
        if(!name || !email || !subject || !message) {
            return res.status(400).json({message: "All fields are required"})
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        await transporter.sendMail({
            from: email,
            to: "saad0786mohd@gmail.com",
            subject: `New query from ${name}`,
            html: `
                <h3><strong>Subject:</strong> ${subject}<h3/>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        })
        res.status(200).json({ message: "Message sent successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send message" })
    }
}