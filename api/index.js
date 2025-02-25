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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostsService_1 = require("./src/posts/services/PostsService");
const AuthService_1 = require("./src/admin/services/AuthService");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(AuthService_1.authorize);
app.get('/api/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, PostsService_1.getPosts)());
}));
app.get('/api/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.json(yield (0, PostsService_1.getPostById)(id));
}));
app.delete('/api/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.json(yield (0, PostsService_1.deletePost)(id));
}));
app.put('/api/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, PostsService_1.updatePost)(yield req.body));
}));
app.post('/api/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, PostsService_1.createPost)(yield req.body));
}));
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = yield req.body;
    username != '' ? res.sendStatus(200) : res.sendStatus(401);
}));
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, AuthService_1.registerUser)(yield req.body));
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(401);
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map