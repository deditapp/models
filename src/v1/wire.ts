import { DeepPartial } from "../util";
import { RootBlock } from "./block";

/**
 * A document update payload. The ID of the document is required as a request parameter
 */
export type DocumentUpdatePayload = DeepPartial<RootBlock>;
