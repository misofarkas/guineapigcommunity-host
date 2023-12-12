import type z from 'zod';

import {
	type postFormSchema,
	type commentSchemaWithParentCommentId,
	type commentSchemaWithoutParents,
	type postDetailSchema,
	type postSchema,
	type postMasterSchema,
	type userSchema,
	type commentFormSchema,
	type commentSchema
} from '@/server/zod-schema';

export type User = z.infer<typeof userSchema>;

// Tag
export type TagType =
	| 'Pigtures'
	| 'New Pigs on the Block'
	| 'Health & Diet'
	| 'Housing';

// Post
export type Post = z.infer<typeof postSchema>;
export type PostFormSchema = z.infer<typeof postFormSchema>;
export type DetailedPost = z.infer<typeof postDetailSchema>;
export type MasterPost = z.infer<typeof postMasterSchema>;

// Comments
export type Comment = z.infer<typeof commentSchema>;
export type CommentFormSchema = z.infer<typeof commentFormSchema>;
export type CommentWithParentCommentId = z.infer<
	typeof commentSchemaWithParentCommentId
>;
export type CommentsWithoutParents = z.infer<
	typeof commentSchemaWithoutParents
>;
export type CommentWithReplies = CommentWithParentCommentId & {
	replies?: CommentWithReplies[];
};
