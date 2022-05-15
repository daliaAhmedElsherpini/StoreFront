"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../../controllers/api/userController"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var update_1 = __importDefault(require("../../middlewares/validation/api/user/update"));
var users = express_1.default.Router();
users.get('/:id', [auth_1.default], userController_1.default.profile);
users.put('/:id', [auth_1.default], update_1.default, userController_1.default.update);
exports.default = users;
