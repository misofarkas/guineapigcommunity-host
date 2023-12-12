import { type user } from '.prisma/client';
import { type z } from 'zod';

import { type userFormSchema } from '@/server/zod-schema';


export const toUserZod = (entity: user) => ({
	...entity
});

export const toUserPrisma = (user: z.infer<typeof userFormSchema>) => ({
	name: user.name,
	image: user.image
});
