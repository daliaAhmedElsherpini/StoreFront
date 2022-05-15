"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../../controllers/api/authController"));
var register_1 = __importDefault(require("../../middlewares/validation/api/auth/register"));
var login_1 = __importDefault(require("../../middlewares/validation/api/auth/login"));
var auth = express_1.default.Router();
auth.post('/register', register_1.default, authController_1.default.register);
auth.post('/login', login_1.default, authController_1.default.login);
exports.default = auth;
