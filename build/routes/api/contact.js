"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contactController_1 = __importDefault(require("../../controllers/api/contactController"));
var store_1 = __importDefault(require("../../middlewares/validation/api/contactMessages/store"));
var contact = express_1.default.Router();
contact.post('/', store_1.default, contactController_1.default.store);
exports.default = contact;
