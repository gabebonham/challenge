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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
exports.registerUser = registerUser;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function authenticate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        return user ? (yield getUserByUsername(user)).id : { status: 401 };
    });
}
function authorize(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        try {
            token = yield req.headers.authorization;
        }
        catch (e) {
            console.log(e);
        }
        if ((yield req.originalUrl) == '/api/login' ||
            (yield req.originalUrl) == '/api/register') {
            return next();
        }
        if (!token)
            return res.sendStatus(401);
        if (!(yield getUserById(token)))
            return res.sendStatus(401);
        return next();
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.users.findUnique({
                where: { id: parseInt(id) },
            });
        }
        catch (e) {
            return undefined;
        }
    });
}
function getUserByUsername(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.users.findUnique({
                where: { username: user.username },
            });
        }
        catch (e) {
            return undefined;
        }
    });
}
function registerUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.users.create({
                data: {
                    password: user.password,
                    username: user.username,
                },
            });
        }
        catch (e) {
            return { status: 500 };
        }
    });
}
//# sourceMappingURL=AuthService.js.map