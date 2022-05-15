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
var userAddress_1 = require("../../models/userAddress");
var country_1 = require("../../models/country");
var city_1 = require("../../models/city");
var responses_1 = require("../../handlers/responses");
var model = new userAddress_1.userAddressModel();
var countryModel = new country_1.CountryModel();
var cityModel = new city_1.CityModel();
// handler functions here
//get all user addresses
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var faqs, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, model.where("user_id = ".concat(req.params.id))];
            case 1:
                faqs = _a.sent();
                res.status(200).json((0, responses_1.sendResponse)(faqs, 'get all addresses'));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_1)));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// address details
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var faq, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, model.find(req.params.id)];
            case 1:
                faq = _a.sent();
                if (faq) {
                    res.status(200).json((0, responses_1.sendResponse)(faq, 'Address details'));
                    return [2 /*return*/];
                }
                res.status(404).json((0, responses_1.errorResponse)('Not Found'));
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_2)));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// store
var store = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var city, country, data, address, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cityModel.find(req.body.city_id)];
            case 1:
                city = _a.sent();
                return [4 /*yield*/, countryModel.find(req.body.country_id)];
            case 2:
                country = _a.sent();
                data = {
                    user_id: req.body.user_id,
                    city: city.name,
                    country: country.name,
                    street: req.body.street,
                    flat_number: req.body.flat_number,
                    address: req.body.address,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                };
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, model.store(data)];
            case 4:
                address = _a.sent();
                res.json((0, responses_1.sendResponse)(address, 'Your Address Has Been Added Successfully'));
                return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(400).json(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// update user address
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var record, city, country, data, address, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, model.find(req.params.id)];
            case 1:
                record = _a.sent();
                if (!record) return [3 /*break*/, 5];
                return [4 /*yield*/, cityModel.find(req.body.city_id)];
            case 2:
                city = _a.sent();
                return [4 /*yield*/, countryModel.find(req.body.country_id)];
            case 3:
                country = _a.sent();
                data = {
                    id: Number(req.params.id),
                    user_id: req.body.user_id,
                    city: city.name,
                    country: country.name,
                    street: req.body.street,
                    flat_number: req.body.flat_number,
                    address: req.body.address,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                };
                return [4 /*yield*/, model.update(data)];
            case 4:
                address = _a.sent();
                res.json((0, responses_1.sendResponse)(address, 'Your Address Has Been Updated Successfully'));
                return [3 /*break*/, 6];
            case 5:
                res.status(404).json((0, responses_1.errorResponse)('this record is not found'));
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_4 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_4)));
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
// delete an address
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var record, err_5;
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
                    .json((0, responses_1.sendResponse)('', 'The Address has been removed successfully'));
                return [2 /*return*/];
            case 3:
                res.status(404).json((0, responses_1.errorResponse)('The Address Is Not Found'));
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                res.status(500).json((0, responses_1.errorResponse)("Something Went Wrong : ".concat(err_5)));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var addressRoutes = {
    index: index,
    show: show,
    store: store,
    update: update,
    destroy: destroy,
};
exports.default = addressRoutes;
