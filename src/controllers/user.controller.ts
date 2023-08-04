import { Request, Response } from 'express';

import UserSchema from '../db/user/user.schema';
import { IUser } from '../db/user/user.types';

export const post = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const user = await UserSchema.create({ email }) as IUser;

		return res.status(201).json(user);
	} catch (e){
		return res.status(400).json(e);
	}
};

export const get = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await UserSchema.findById(id) as IUser;
		res.status(200).json(user);
	} catch (e) {
		res.status(404).json('Not found');
	}
};

export const put = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email } = req.body;

	try {
		const user = await UserSchema.findById(id) as IUser;
		if (!user) return res.status(404).json('Not found');

		await UserSchema.updateOne({ id }, { email });
		res.status(201).json('ok');
	} catch (e) {
		res.status(500).json('Something went wrong');
	}
};

export const deactivate = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await UserSchema.deleteOne({ id });

		res.status(204).json('ok');
	} catch (e) {
		res.status(500).json('Something went wrong');
	}
};
