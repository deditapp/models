import { BlockType, DataBlock, WithChildren } from "./block";

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
