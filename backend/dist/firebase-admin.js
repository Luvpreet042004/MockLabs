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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Load environment variables
require("dotenv").config();
// Initialize Firebase Admin SDK using environment variables
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: (_a = process.env.FIREBASE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(token);
        return decodedToken;
    }
    catch (error) {
        console.error("Token verification failed:", error);
        throw error;
    }
});
exports.verifyToken = verifyToken;
exports.default = firebase_admin_1.default;
