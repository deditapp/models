/**
 * The root document revision, containing the root blocks.
 */
export interface DocumentRevision {
	documentId: string;
	/**
	 * ISO 8601 date string.
	 */
	createdAt: string;
	/**
	 * ID of the root block.
	 */
	blockId: string;
}
