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
