"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orderController_1 = __importDefault(require("../../controllers/api/orderController"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var store_1 = __importDefault(require("../../middlewares/validation/api/orders/store"));
var orders = express_1.default.Router();
orders.get('/show/:id', [auth_1.default], orderController_1.default.show);
orders.get('/:id', [auth_1.default], orderController_1.default.index);
orders.post('/', [auth_1.default], store_1.default, orderController_1.default.create);
orders.put('/:id', [auth_1.default], orderController_1.default.cancel);
exports.default = orders;
