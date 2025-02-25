import { PrismaClient } from '@prisma/client';
import { User } from '../models/UserModel';
const prisma = new PrismaClient();
export async function authenticate(user: User) {
	console.log(user);
	return user ? (await getUserByUsername(user)).id : { status: 401 };
}
export async function authorize(req, res, next) {
	let token;
	try {
		token = await req.headers['authorization'];
	} catch (e) {
		console.log(e);
	}

	if (
		(await req.originalUrl) == '/api/login' ||
		(await req.originalUrl) == '/api/register'
	) {
		return next();
	}
	if (!token) return res.sendStatus(401);
	if (!(await getUserById(token))) return res.sendStatus(401);

	return next();
}
async function getUserById(id: string) {
	try {
		return await prisma.users.findUnique({
			where: { id: parseInt(id) },
		});
	} catch (e) {
		return undefined;
	}
}
async function getUserByUsername(user: User) {
	try {
		return await prisma.users.findUnique({
			where: { username: user.username },
		});
	} catch (e) {
		return undefined;
	}
}
export async function registerUser(user: User) {
	try {
		return await prisma.users.create({
			data: {
				password: user.password,
				username: user.username,
			},
		});
	} catch (e) {
		return { status: 500 };
	}
}
