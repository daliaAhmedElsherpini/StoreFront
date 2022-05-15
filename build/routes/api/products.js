"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productController_1 = __importDefault(require("../../controllers/api/productController"));
var products = express_1.default.Router();
products.get('/', productController_1.default.index);
products.get('/:id', productController_1.default.show);
exports.default = products;
