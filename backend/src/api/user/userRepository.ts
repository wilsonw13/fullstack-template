import type { User } from "@/api/user/userModel";

export const users: User[] = [
	{
		id: 1,
		name: "Alice",
		email: "alice@example.com",
		age: 42,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
	{
		id: 2,
		name: "Robert",
		email: "Robert@example.com",
		age: 21,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
];

export class UserRepository {
	async findAllAsync(): Promise<User[]> {
		return users;
	}

	async findByIdAsync(id: number): Promise<User | null> {
		return users.find((user) => user.id === id) || null;
	}

	async addUserAsync(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
		const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
		const now = new Date();
		const newUser: User = {
			id: newId,
			createdAt: now,
			updatedAt: now,
			...user,
		};
		users.push(newUser);
		return newUser;
	}

	async deleteUserAsync(id: number): Promise<boolean> {
		const idx = users.findIndex(u => u.id === id);
		if (idx === -1) return false;
		users.splice(idx, 1);
		return true;
	}
}
