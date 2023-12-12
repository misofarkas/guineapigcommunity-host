import { getAllTagTypes } from '@/server/mappers/tag-type-mapper';

export const GET = async () => Response.json(getAllTagTypes());
