"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const Soution_1 = __importDefault(require("./Soution"));
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const testRoutes_1 = __importDefault(require("./testRoutes"));
const router = (0, express_1.Router)();
router.use('/user', userRoutes_1.default);
router.use('/solution', userAuth_1.default, Soution_1.default);
router.use('/test', userAuth_1.default, testRoutes_1.default);
exports.default = router;
