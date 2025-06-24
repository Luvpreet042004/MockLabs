"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const router = (0, express_1.Router)();
// Create a new user
router.post('/login', userAuth_1.default, userController_1.loginUser);
router.delete('/delete', userAuth_1.default, userController_1.deleteUser);
router.get('/profile', userAuth_1.default, userController_1.getProfile);
router.get('/getAcc', userAuth_1.default, userController_1.getAverageAccuracy);
exports.default = router;
