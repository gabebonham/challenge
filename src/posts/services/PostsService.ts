import { PrismaClient } from '@prisma/client';
import { Post } from '../models/PostModel';
const prisma = new PrismaClient();
export async function getPosts() {
	return await prisma.posts.findMany();
}

export async function getPostById(id: string) {
	try {
		return await prisma.posts.findUnique({
			where: { id: parseInt(id) },
		});
	} catch (e) {
		return { status: 500 };
	}
}

export async function createPost(post: Post) {
	try {
		return await prisma.posts.create({
			data: { title: post.title, content: post.content },
		});
	} catch (e) {
		return { status: 500 };
	}
}
export async function updatePost(post: Post) {
	try {
		return await prisma.posts.update({
			where: { id: post.id },
			data: { content: post.content, title: post.title },
		});
	} catch (e) {
		return { status: 500 };
	}
}
export async function deletePost(id: string) {
	try {
		return await prisma.posts.delete({
			where: { id: parseInt(id) },
		});
	} catch (e) {
		return { status: 500 };
	}
}
