import { z } from 'zod';

export const userFormSchema = z.object({
	name: z.string(),
	image: z.string().nullable()
});

export const userSchema = userFormSchema.extend({
	id: z.number(),
	email: z.string()
});

export const tagTypeSchema = z.enum([
	'Pigtures',
	'New Pigs on the Block',
	'Health & Diet',
	'Housing'
]);

export const postFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Give me a title' })
		.max(50, { message: 'Too long title' }),
	text: z.string().min(1, { message: 'What is this post about?' }),
	tags: z.array(tagTypeSchema).optional(),
	image: z.string().nullable().optional()
});

export const postSchema = postFormSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	createdBy: userSchema
});

export const postMasterSchema = postSchema.extend({
	isBookmarked: z.boolean(),
	isUpvoted: z.boolean(),
	isDownvoted: z.boolean(),
	commentsCount: z.number(),
	voteCount: z.number()
});

export const postSchemaWithoutUser = postSchema.omit({
	createdBy: true
});

export const commentSchemaWithoutParents = z.object({
	text: z.string(),

	id: z.number(),
	createdAt: z.string(),
	createdBy: userSchema
});

export const commentSchema = commentSchemaWithoutParents.extend({
	parentPost: postSchemaWithoutUser,
	parentComment: commentSchemaWithoutParents.nullable()
});

export const commentFormSchema = z.object({
	text: z.string().min(1, { message: 'Please share something...' }),
	parentPostId: z.number(),
	parentCommentId: z.number().nullable()
});

export const commentSchemaWithParentCommentId =
	commentSchemaWithoutParents.extend({
		parentCommentId: z.number().nullable(),
		voteCount: z.number()
	});

export const postDetailSchema = postSchema.extend({
	comments: z.array(commentSchemaWithParentCommentId),
	upvoters: userSchema.array(),
	downvoters: userSchema.array(),
	isUpvoted: z.boolean(),
	isDownvoted: z.boolean()
});

export const bookmarkSchema = z.object({
	createdBy: userSchema,
	post: postSchema,
	createdAt: z.string()
});

export const voteTypeSchema = z.enum(['upvote', 'downvote']);

export const votePostSchema = z.object({
	createdBy: userSchema,
	post: postSchema,
	createdAt: z.string(),
	type: voteTypeSchema
});

export const voteCommentSchema = z.object({
	createdBy: userSchema,
	comment: commentSchemaWithoutParents,
	createdAt: z.string(),
	type: voteTypeSchema
});
