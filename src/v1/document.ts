import { DocumentRevision } from "./revision";

/**
 * The root meta-document, with its sub-revisions.
 */
export type Document = {
	id: string;
	title: string;
	revisions: DocumentRevision[];
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
