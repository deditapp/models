/**
 * The enum of all possible block types.
 */
export enum BlockType {
	Text,
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
	data: any;
}

/**
 * A type that can be resolved to a block. This is either a block, a string, or an array of strings.
 */
export type BlockResolvable = Block | string | string[];

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
export type WithChildren<B extends Block, C = BlockResolvable> = B & { children: C[] };

/**
 * A text block that has formatting, but cannot have children.
 */
export type TextBlock = DataBlock<
	BlockType.Text,
	{ content: string; bold: boolean; italic: boolean; underline: boolean; strikethrough: boolean }
>;

/**
 * A heading block that can have no children.
 */
export type HeadingBlock = DataBlock<BlockType.Heading, { content: string; size: number }>;

/**
 * A paragraph block. This block has no data, but can have children.
 */
export type ParagraphBlock = WithChildren<DataBlock<BlockType.Paragraph, never>>;

/**
 * A quote block. This block has no data, but can have children.
 */
export type QuoteBlock = WithChildren<DataBlock<BlockType.Quote, never>>;

/**
 * A list block. This block has no data, but can have children. These children must be inlineable.
 */
export type ListBlock = WithChildren<DataBlock<BlockType.List, { ordered: boolean }>, InlineBlock>;

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
