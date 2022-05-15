"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
var messageValidation = [
    check('name').not().isEmpty().withMessage('name Is Required'),
    check('email')
        .isEmail()
        .withMessage('Enter Valid Email Address')
        .not()
        .isEmpty()
        .withMessage('email Is Required'),
    check('subject').not().isEmpty().withMessage('subject Is Required'),
    check('message')
        .not()
        .isEmpty()
        .withMessage('message Is Required')
        .isLength({ min: 15 })
        .withMessage('Minimum 15 characters required for review!'),
    function (req, res, next) {
        var errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
exports.default = messageValidation;
