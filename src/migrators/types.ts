/**
 * The generic migrator type.
 */
export type Migrator = <Old, New>(old: Old) => Promise<New> | New;
