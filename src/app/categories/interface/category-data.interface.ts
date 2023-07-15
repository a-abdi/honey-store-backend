import { CreateCategoryDto } from "../dto/create-category.dto";

export interface CreateCategoryData extends CreateCategoryDto {
    imageSrc: string;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}
