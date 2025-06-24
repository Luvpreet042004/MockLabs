"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ekilirelay_1 = __importDefault(require("ekilirelay"));
const router = (0, express_1.Router)();
const API_KEY = process.env.API_KEY || "";
const mailer = new ekilirelay_1.default(API_KEY);
router.post("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        console.log(API_KEY);
        if (!name || !email || !message) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const sub = `Got Your Message! I'll Be in Touch Soon`;
        const msg = `Hi ${name},\nThank you for getting in touch! I’ve received your message and will get back to you as soon as possible.\nBest,\nLuvpreet Singh\n+91 7657937890`;
        yield mailer.sendEmail(email, sub, msg);
        const ourMsg = `Client Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        yield mailer.sendEmail("luvpreetsingh8566@gmail.com", "New Client", ourMsg);
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error });
    }
}));
router.get("/test", (req, res) => {
    res.send("Test route is working!");
});
exports.default = router;
