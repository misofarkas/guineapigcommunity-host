import { $Enums } from '.prisma/client';

import tag_type = $Enums.tag_type;

export const toTagTypesPrisma = (tagTypes: string[]) =>
	tagTypes.map(tagType => toTagTypePrisma[tagType]);

export const toTagTypesZod = (tagTypes: tag_type[]) =>
	tagTypes.map(tagType => toTagTypeZod[tagType]);

const toTagTypePrisma: Record<string, tag_type> = {
	'Pigtures': tag_type.Pigtures,
	'New Pigs on the Block': tag_type.New_Pigs_on_the_Block,
	'Health & Diet': tag_type.Health___Diet,
	'Housing': tag_type.Housing
};

const toTagTypeZod: Record<tag_type, string> = {
	[tag_type.Pigtures]: 'Pigtures',
	[tag_type.New_Pigs_on_the_Block]: 'New Pigs on the Block',
	[tag_type.Health___Diet]: 'Health & Diet',
	[tag_type.Housing]: 'Housing'
};

export const getAllTagTypes = () => toTagTypesZod(Object.values(tag_type));
