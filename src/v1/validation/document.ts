import Joi from "joi";

export const DocumentSchema = Joi.object({
	id: Joi.string().required(),
	title: Joi.string().required(),
	tags: Joi.array().items(Joi.string()).required(),
	createdAt: Joi.string().required(),
	updatedAt: Joi.string().required(),
	ownerId: Joi.string().required(),
});
