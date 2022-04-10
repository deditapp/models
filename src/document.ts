import Joi from "joi";

/**
 * The enum of all possible block types.
 */
export enum BlockType {
	Document,
	Text,
	Link,
	Heading,
	Paragraph,
	Quote,
	List,
	Table,
	Image,
	Alert,
}

/**
 * The generic block type.
 */
export interface Block {
	id: string;
	type: BlockType;
}

/**
 * A utility data type that represents a block with a specific type.
 */
export interface DataBlock<Type extends BlockType, Data> extends Block {
	type: Type;
	data: Data;
}

/**
 * Utility type for providing children typings to a block type.
 */
export type WithChildren<B extends Block> = B & { children: AnyBlock[] };

/**
 * Utility type for providing children typings to a block type.
 */
export type WithInlineChildren<B extends Block> = B & { children: InlineBlock[] };

/**
 * Generic formatting options.
 */
export interface Format {
	bold: boolean;
	italic: boolean;
	underline: boolean;
	strikethrough: boolean;
}

/**
 * A text block that has formatting, but cannot have children.
 */
export type TextBlock = DataBlock<BlockType.Text, Format & { content: string }>;

/**
 * A link block that has formatting and navigates to another document.
 */
export type LinkBlock = DataBlock<BlockType.Link, Format & { content: string; href: string }>;

/**
 * A heading block that can have no children.
 */
export type HeadingBlock = DataBlock<BlockType.Heading, { content: string; size: number }>;

/**
 * A paragraph block. This block has no data, but can have children.
 */
export interface ParagraphBlock extends Block {
	type: BlockType.Paragraph;
	children: InlineBlock[];
}

/**
 * A quote block. This block has no data, but can have children.
 */
export interface QuoteBlock extends Block {
	type: BlockType.Paragraph;
	children: InlineBlock[];
}

/**
 * A list block. This block has no data, but can have children. These children must be inlineable.
 */
export type ListBlock = WithInlineChildren<DataBlock<BlockType.List, { ordered: boolean }>>;

/**
 * A table block. Contains
 */
export type TableBlock = DataBlock<
	BlockType.Table,
	{
		columns: InlineBlock[];
		rows: InlineBlock[][];
	}
>;

/**
 * An image block with dimensions and source.
 */
export type ImageBlock = DataBlock<BlockType.Image, { src: string; width: number; height: number }>;

/**
 * A union of block types that can be inlined.
 */
export type InlineBlock = TextBlock;

/**
 * A union of block types that can be in a document.
 */
export type AnyBlock =
	| TextBlock
	| HeadingBlock
	| ParagraphBlock
	| QuoteBlock
	| ListBlock
	| TableBlock
	| ImageBlock;

/**
 * The root meta-document, with its sub-revisions.
 */
export type Document = {
	id: string;
	title: string;
	revisions: DocumentRevision[];
};

/**
 * The root document revision, containing the root blocks.
 */
export type DocumentRevision = WithChildren<
	DataBlock<
		BlockType.Document,
		{
			subtitle: string;
			createdAt: number;
		}
	>
>;

// #region Joi validation

export const BlockSchema = Joi.object({
	id: Joi.string().required(),
	type: Joi.number().required(),
});

export const FormatSchema = Joi.object({
	bold: Joi.boolean().required(),
	italic: Joi.boolean().required(),
	underline: Joi.boolean().required(),
	strikethrough: Joi.boolean().required(),
});

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

export const InlineBlockSchema = Joi.allow(Joi.link("#text"), Joi.link("#link")).id("inline");

export const AnyBlockSchema = Joi.allow(
	Joi.link("#text"),
	Joi.link("#link"),
	Joi.link("#heading"),
	Joi.link("#paragraph"),
	Joi.link("#quote"),
	Joi.link("#list"),
	Joi.link("#table"),
	Joi.link("#image")
).id("any");

// #endregion
