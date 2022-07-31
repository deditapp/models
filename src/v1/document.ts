import { DeepPartial } from "../util";
import { RootBlock } from "./block";

/**
 * The root meta-document, with its sub-revisions.
 */
export type Document = {
	id: string;
	title: string;
	tags: string[];
	/**
	 * ISO 8601 date string.
	 */
	createdAt: string;
	/**
	 * ISO 8601 date string.
	 */
	updatedAt: string;
	/**
	 * The ID of the document owner.
	 */
	ownerId: string;
};

/**
 * A document as sent over the wire. This is used for updates.
 */
export type PartialDocument = Partial<Omit<Document, "createdAt" | "id" | "updatedAt" | "ownerId">>;

/**
 * A document update payload.
 */
export type DocumentUpdatePayload = PartialDocument & { root?: DeepPartial<RootBlock> };
