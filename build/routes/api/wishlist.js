"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var wishlistController_1 = __importDefault(require("../../controllers/api/wishlistController"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var store_1 = __importDefault(require("../../middlewares/validation/api/wishlist/store"));
var wishlist = express_1.default.Router();
wishlist.get('/:id', [auth_1.default], wishlistController_1.default.show);
wishlist.post('/', [auth_1.default], store_1.default, wishlistController_1.default.wishlist);
exports.default = wishlist;
