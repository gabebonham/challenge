import { PrismaClient } from '@prisma/client';
import { User } from '../models/UserModel';
const prisma = new PrismaClient();
export async function authenticate(user) {
	console.log(user);
	return user ? user : null;
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
	if (!getUser(token)) return res.sendStatus(401);

	return next();
}
async function getUser(id: string) {
	try {
		return prisma.users.findUnique({ where: { id: parseInt(id) } });
	} catch {
		return undefined;
	}
}
export async function registerUser(user: User) {
	return await prisma.users.create({
		data: { password: user.password, username: user.username },
	});
}
