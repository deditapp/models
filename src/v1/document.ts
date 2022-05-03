import { Version } from "../version";
import { DocumentRevision } from "./revision";

/**
 * The root meta-document, with its sub-revisions.
 */
export type Document = {
	id: string;
	title: string;
	revisions: DocumentRevision[];
	schemaVersion: Version;
	tags: string[];
};
