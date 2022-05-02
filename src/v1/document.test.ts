import Joi, { ValidationResult } from "joi";

import {
	BlockType, Format, HeadingBlock, HeadingBlockSchema, LinkBlock,
	LinkBlockSchema, ParagraphBlock, ParagraphBlockSchema, TextBlock,
	TextBlockSchema
} from "./document";

const DEFAULT_FORMATTING: Format = {
	bold: false,
	italic: false,
	strikethrough: false,
	underline: false,
};

describe("document validation", () => {
	it("can validate a text block", async () => {
		const block: TextBlock = {
			data: { content: "Hello, world!", ...DEFAULT_FORMATTING },
			type: BlockType.Text,
		};
		const result = (await TextBlockSchema.validateAsync(block)) as ValidationResult;
		if (result.error) {
			throw result.error;
		}
	});
	it("can validate a link block", async () => {
		const block: LinkBlock = {
			data: { content: "Hello, world!", href: "http://example.com", ...DEFAULT_FORMATTING },
			type: BlockType.Link,
		};
		const result = (await LinkBlockSchema.validateAsync(block)) as ValidationResult;
		if (result.error) {
			throw result.error;
		}
	});
	it("can validate a heading block", async () => {
		const block: HeadingBlock = {
			data: { content: "Hello, world!", size: 1 },
			type: BlockType.Heading,
		};
		const result = (await HeadingBlockSchema.validateAsync(block)) as ValidationResult;
		if (result.error) {
			throw result.error;
		}
	});
	it("can validate a paragraph block", async () => {
		const block: ParagraphBlock = {
			type: BlockType.Paragraph,
			children: [],
		};
		const result = (await ParagraphBlockSchema.validateAsync(block)) as ValidationResult;
		if (result.error) {
			throw result.error;
		}
	});
});
