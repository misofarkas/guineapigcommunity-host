import {getAllTagTypes} from "@/server/mappers/tag-type-mapper";

export const GET = async () => {
    return Response.json(getAllTagTypes());
};
