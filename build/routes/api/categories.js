"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var categoryController_1 = __importDefault(require("../../controllers/api/categoryController"));
var categories = express_1.default.Router();
categories.get('/', categoryController_1.default.index);
categories.get('/:id', categoryController_1.default.show);
exports.default = categories;
