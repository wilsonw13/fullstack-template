// Input Validation for 'POST /users' endpoint
export const CreateUserSchema = z.object({
	body: z.object({
		name: z.string(),
		email: z.string().email(),
		age: z.number(),
	}),
});

// Input Validation for 'DELETE /users/:id' endpoint
export const DeleteUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
	age: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});