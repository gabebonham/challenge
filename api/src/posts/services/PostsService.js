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
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.posts.findMany();
    });
}
function getPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.posts.findUnique({ where: { id: parseInt(id) } });
    });
}
function createPost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.posts.create({
            data: { title: post.title, content: post.content },
        });
    });
}
function updatePost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.posts.update({
            where: { id: post.id },
            data: { content: post.content, title: post.title },
        });
    });
}
function deletePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.posts.delete({ where: { id: parseInt(id) } });
    });
}
//# sourceMappingURL=PostsService.js.map