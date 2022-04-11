import Joi, { ValidationResult } from "joi";
import { v4 as uuid } from "uuid";

import { BlockType, Format, TextBlock, TextBlockSchema } from "./document";

const DEFAULT_FORMATTING: Format = {
	bold: false,
	italic: false,
	strikethrough: false,
	underline: false,
};

describe("document validation", () => {
	it("can validate a text block", async () => {
		const block: TextBlock = {
			id: uuid(),
			data: { content: "Hello, world!", ...DEFAULT_FORMATTING },
			type: BlockType.Text,
		};
		const result = (await TextBlockSchema.validateAsync(block)) as ValidationResult;
		if (result.error) {
			throw result.error;
		}
	});
});
