"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var faqs_1 = __importDefault(require("./api/faqs"));
var contact_1 = __importDefault(require("./api/contact"));
var products_1 = __importDefault(require("./api/products"));
var auth_1 = __importDefault(require("./api/auth"));
var reviews_1 = __importDefault(require("./api/reviews"));
var categories_1 = __importDefault(require("./api/categories"));
var countries_1 = __importDefault(require("./api/countries"));
var wishlist_1 = __importDefault(require("./api/wishlist"));
var app_info_1 = __importDefault(require("./api/app_info"));
var cart_1 = __importDefault(require("./api/cart"));
var userAddress_1 = __importDefault(require("./api/userAddress"));
var orders_1 = __importDefault(require("./api/orders"));
var users_1 = __importDefault(require("./api/users"));
var apiRoutes = express_1.default.Router();
apiRoutes.get('/', function (_req, res) {
    res.json('Welcome TTo Our Store');
});
//api routes
apiRoutes.use('/faqs', faqs_1.default);
apiRoutes.use('/products', products_1.default);
apiRoutes.use('/contact', contact_1.default);
apiRoutes.use('/reviews', reviews_1.default);
apiRoutes.use('/auth', auth_1.default);
apiRoutes.use('/categories', categories_1.default);
apiRoutes.use('/countries', countries_1.default);
apiRoutes.use('/wishlist', wishlist_1.default);
apiRoutes.use('/appinfo', app_info_1.default);
apiRoutes.use('/cart', cart_1.default);
apiRoutes.use('/user-addresses', userAddress_1.default);
apiRoutes.use('/orders', orders_1.default);
apiRoutes.use('/user', users_1.default);
exports.default = apiRoutes;
