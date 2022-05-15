"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
var loginValidation = [
    check('email').not().isEmpty().withMessage('Email Address Is Required'),
    check('password').not().isEmpty().withMessage('Password Is Required'),
    function (req, res, next) {
        var errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
exports.default = loginValidation;
