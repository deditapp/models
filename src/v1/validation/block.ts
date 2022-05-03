import Joi from "joi";

import { BlockType } from "../block";

const BlockSchema = {
	type: Joi.number().required(),
};

export const RootBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Root).required(),
	id: Joi.string().required(),
	children: Joi.array().items(Joi.link("#any")).required(),
}).id("root");

export const RefBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Ref).required(),
	data: Joi.object({
		id: Joi.string().required(),
	}).required(),
}).id("ref");

export const FormatSchema = {
	bold: Joi.boolean().required(),
	italic: Joi.boolean().required(),
	underline: Joi.boolean().required(),
	strikethrough: Joi.boolean().required(),
};

export const TextBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Text).required(),
	data: Joi.object({
		...FormatSchema,
		content: Joi.string().required(),
	}),
}).id("text");

export const LinkBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Link),
	data: Joi.object({
		...FormatSchema,
		content: Joi.string().required(),
		href: Joi.string().required(),
	}),
}).id("link");

export const HeadingBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Heading).required(),
	data: Joi.object({
		content: Joi.string().required(),
		size: Joi.number().required(),
	}),
}).id("heading");

export const ParagraphBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Paragraph).required(),
	children: Joi.array().items(Joi.link("#inline")).required(),
}).id("paragraph");

export const QuoteBlockSchema = Joi.object({
	type: Joi.number().valid(BlockType.Quote).required(),
	children: Joi.array().items(Joi.link("#inline")).required(),
}).id("quote");

export const ListBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.List).required(),
	data: Joi.object({
		ordered: Joi.boolean().required(),
	}),
	children: Joi.array().items(Joi.link("#inline")).required(),
}).id("list");

export const TableBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Table).required(),
	data: Joi.object({
		columns: Joi.array().items(Joi.link("#inline")).required(),
		rows: Joi.array()
			.items(Joi.array().items(Joi.link("#inline")))
			.required(),
	}),
}).id("table");

export const ImageBlockSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Image).required(),
	data: Joi.object({
		src: Joi.string().required(),
		width: Joi.number().required(),
		height: Joi.number().required(),
	}),
}).id("image");

export const ContainerSchema = Joi.object({
	...BlockSchema,
	type: Joi.number().valid(BlockType.Group).required(),
	children: Joi.array().items(Joi.link("#any")).required(),
}).id("container");

export const InlineBlockSchema = Joi.allow(Joi.link("#text"), Joi.link("#link")).id("inline");

export const AnyBlockSchema = Joi.allow(
	Joi.link("#root"),
	Joi.link("#ref"),
	Joi.link("#text"),
	Joi.link("#link"),
	Joi.link("#heading"),
	Joi.link("#paragraph"),
	Joi.link("#quote"),
	Joi.link("#list"),
	Joi.link("#table"),
	Joi.link("#image")
).id("any");
