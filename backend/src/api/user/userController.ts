import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";

class UserController {
	public getUsers: RequestHandler = async (_req: Request, res: Response) => {
		const serviceResponse = await userService.findAll();
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public getUser: RequestHandler = async (req: Request, res: Response) => {
		const id = Number.parseInt(req.params.id as string, 10);
		const serviceResponse = await userService.findById(id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public addUser: RequestHandler = async (req: Request, res: Response) => {
		const result = await userService.addUser(req.body);
		res.status(result.statusCode).json(result);
	};

	public deleteUser: RequestHandler = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const result = await userService.deleteUser(id);
		res.status(result.statusCode).json(result);
	};
}

export const userController = new UserController();
