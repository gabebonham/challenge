import { PrismaClient } from '../../../prisma/generated/client';
import { Post } from '../models/PostModel';
const prisma = new PrismaClient();
export async function getPosts() {
	return await prisma.posts.findMany();
}

export async function getPostById(id: string) {
	return await prisma.posts.findUnique({ where: { id: parseInt(id) } });
}

export async function createPost(post: Post) {
	await prisma.posts.create({
		data: { title: post.title, content: post.content },
	});
	return;
}
export async function updatePost(post: Post) {
	await prisma.posts.update({
		where: { id: post.id },
		data: { content: post.content, title: post.title },
	});
	return { status: 200 };
}
export async function deletePost(id: string) {
	await prisma.posts.delete({ where: { id: parseInt(id) } });
	return { status: 200 };
}
