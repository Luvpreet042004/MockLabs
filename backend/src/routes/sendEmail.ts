import {Request,Response} from 'express';
import { Router } from 'express';
import EkiliMailer from "ekilirelay";


const router = Router(); 
const API_KEY = process.env.API_KEY || "";


const mailer = new EkiliMailer(API_KEY);


router.post("/send-email", async (req: Request, res: Response) => {
    try {
        const { name, email, message } = req.body;
        console.log(API_KEY);
        
        if (!name || !email || !message) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const sub = `Got Your Message! I'll Be in Touch Soon`;
        const msg = `Hi ${name},\nThank you for getting in touch! I’ve received your message and will get back to you as soon as possible.\nBest,\nLuvpreet Singh\n+91 7657937890`;

        await mailer.sendEmail(email, sub, msg);

        const ourMsg = `Client Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        await mailer.sendEmail("luvpreetsingh8566@gmail.com", "New Client", ourMsg);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error });
    }
});

router.get("/test", (req : Request,res :Response) => {
    res.send("Test route is working!");
})

export default router;