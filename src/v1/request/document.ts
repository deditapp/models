import { DeepPartial } from "../../util";
import { RootBlock } from "../block";
import { DocumentRevision } from "../revision";

/**
 * A document update payload. The ID of the document is required as a request parameter
 */
export type DocumentUpdatePayload = DeepPartial<RootBlock>;

/**
 * The response to a document update request.
 */
export type DocumentUpdateResponse = { success: true; revision: DocumentRevision } & {
	success: false;
	error: string;
};
