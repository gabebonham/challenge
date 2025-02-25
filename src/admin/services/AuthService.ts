import { User } from '../models/UserModel';

export function authenticate(user: User) {
	return user;
}
export function authorize(user: User) {
	return true;
}
export function getUser() {
	return;
}
export function registerUser(user: User) {
	return;
}
