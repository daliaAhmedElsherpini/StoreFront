"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("./../../models/product");
var responses_1 = require("../../handlers/responses");
var cart_1 = require("../../models/cart");
var cart_2 = require("../../handlers/cart");
var model = new cart_1.CartModel();
var productmodel = new product_1.productModel();
var handler = new cart_2.CartHandler();
// handler functions here
// show user cart
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handler.products(req.params.id)];
            case 1:
                cart = _a.sent();
                res.status(200).json((0, responses_1.sendResponse)(cart, 'get all products of your cart'));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_1)));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//add to cart
var addToCart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, productStock, data, record, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                return [4 /*yield*/, productmodel.find(req.body.product_id)];
            case 1:
                product = _a.sent();
                productStock = product.stock;
                data = {
                    product_id: req.body.product_id,
                    user_id: req.body.user_id,
                    quantity: req.body.quantity,
                    total: product.sale_price
                        ? req.body.quantity * product.sale_price
                        : req.body.quantity * product.price,
                };
                return [4 /*yield*/, model.where("user_id = ".concat(req.body.user_id, " AND product_id = ").concat(req.body.product_id))];
            case 2:
                record = _a.sent();
                if (!record.length) return [3 /*break*/, 6];
                data.quantity = req.body.quantity + record[0].quantity;
                data.id = record[0].id;
                data.total = product.sale_price
                    ? data.quantity * product.sale_price
                    : data.quantity * product.price;
                if (!(productStock > data.quantity)) return [3 /*break*/, 4];
                return [4 /*yield*/, model.update(data)];
            case 3:
                _a.sent();
                res
                    .status(200)
                    .json((0, responses_1.sendResponse)('', 'Success : the product has been added to the cart'));
                return [3 /*break*/, 5];
            case 4:
                res.status(200).json((0, responses_1.errorResponse)('the product is out of stock'));
                _a.label = 5;
            case 5: return [2 /*return*/];
            case 6:
                if (!(productStock > data.quantity)) return [3 /*break*/, 8];
                return [4 /*yield*/, model.store(data)];
            case 7:
                _a.sent();
                res
                    .status(200)
                    .json((0, responses_1.sendResponse)('', 'Success : the product has been added to the cart'));
                return [3 /*break*/, 9];
            case 8:
                res.status(200).json((0, responses_1.errorResponse)('the product is out of stock'));
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                err_2 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_2)));
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
// update user cart
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var record, product, productStock, total, data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, model.where("user_id = ".concat(req.body.user_id, " AND product_id = ").concat(req.body.product_id))];
            case 1:
                record = _a.sent();
                if (!record) return [3 /*break*/, 6];
                return [4 /*yield*/, productmodel.find(req.body.product_id)];
            case 2:
                product = _a.sent();
                productStock = product.stock;
                total = req.body.quantity * product.price;
                if (product.sale_price) {
                    total = req.body.quantity * product.sale_price;
                }
                data = {
                    id: record[0].id,
                    product_id: req.body.product_id,
                    user_id: req.body.user_id,
                    quantity: req.body.quantity,
                    total: total,
                };
                if (!(productStock > req.body.quantity)) return [3 /*break*/, 4];
                return [4 /*yield*/, model.update(data)];
            case 3:
                _a.sent();
                res
                    .status(200)
                    .json((0, responses_1.sendResponse)('', 'Success : the cart record has been updated'));
                return [3 /*break*/, 5];
            case 4:
                res.status(200).json((0, responses_1.errorResponse)('the product is out of stock'));
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(404).json((0, responses_1.errorResponse)('this record is not found'));
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_3 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_3)));
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
// update user cart
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var record, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, model.find(req.params.id)];
            case 1:
                record = _a.sent();
                if (!record) return [3 /*break*/, 3];
                return [4 /*yield*/, model.destroy(req.params.id)];
            case 2:
                _a.sent();
                res
                    .status(200)
                    .json((0, responses_1.sendResponse)('', 'The product has been removed successfully from your cart'));
                return [2 /*return*/];
            case 3:
                res.status(404).json((0, responses_1.errorResponse)('The Product Is Not Found'));
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_4)));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var cartRoutes = {
    index: index,
    addToCart: addToCart,
    destroy: destroy,
    update: update,
};
exports.default = cartRoutes;
