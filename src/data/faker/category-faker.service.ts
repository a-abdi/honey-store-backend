import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import 'dotenv/config';
import { fakerFA as faker } from '@faker-js/faker';
import { CategoriesService } from "src/app/categories/categories.service";
import { CreateCategoryDto } from "src/app/categories/dto/create-category.dto";

@Injectable()
export class CategoryFakerService implements OnApplicationBootstrap {
    constructor(private readonly categoryService: CategoriesService) {}
    private readonly logger = new Logger(CategoryFakerService.name);

    async onApplicationBootstrap(): Promise<any> {
        if (process.env.CREATE_FAKE_DATA === '1') {
            const category = await this.categoryService.findAll();
            if (category.length > 0) {
                this.logger.warn('con not create fake data for category because category data allready exist');
            } else {
                let categories: CreateCategoryDto[] = [];
                for (let index = 0; index < 20; index++) {
                    const category: CreateCategoryDto = {
                        name: faker.word.noun(),
                        description: faker.lorem.text()
                    }
                    if (!categories.some(el => el.name == category.name)) {
                        categories.push(category);
                    }
                }
                this.categoryService.insertMany(categories);
            }
        }
    }
}