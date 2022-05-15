"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var faqController_1 = __importDefault(require("../../controllers/api/faqController"));
var faqs = express_1.default.Router();
faqs.get('/', faqController_1.default.index);
faqs.get('/:id', faqController_1.default.show);
exports.default = faqs;
