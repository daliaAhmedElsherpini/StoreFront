"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cartController_1 = __importDefault(require("../../controllers/api/cartController"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var storeOrUpdate_1 = __importDefault(require("../../middlewares/validation/api/cart/storeOrUpdate"));
var cart = express_1.default.Router();
cart.post('/', [auth_1.default], storeOrUpdate_1.default, cartController_1.default.addToCart);
cart.put('/', [auth_1.default], storeOrUpdate_1.default, cartController_1.default.update);
cart.delete('/:id', [auth_1.default], cartController_1.default.destroy);
cart.get('/:id', [auth_1.default], cartController_1.default.index);
exports.default = cart;
