import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import 'dotenv/config';
import { fakerFA as faker } from '@faker-js/faker';
import { CategoriesService } from "src/app/categories/categories.service";
import { PropertyService } from "src/app/property/property.service";
import { ProductsService } from "src/app/products/products.service";
import { Product } from "src/app/products/entities/product.entity";
import { AdminsService } from "src/app/admins/admins.service";

@Injectable()
export class ProductFakerService implements OnApplicationBootstrap {
    constructor(
        private readonly categoryService: CategoriesService,
        private readonly propertyService: PropertyService,
        private readonly productservice: ProductsService,
        private readonly adminService: AdminsService,
    ) {}
    private readonly logger = new Logger(ProductFakerService.name);

    async onApplicationBootstrap(): Promise<any> {
        if (process.env.CREATE_FAKE_DATA === '1') {
            const products = await this.productservice.findAll({});
            if (products.length > 0) {
                this.logger.warn('con not create fake data for products because products data allready exist');
            } else {
                let products:  Omit<Product, '_id'>[] = [];
                const categories = (await this.categoryService.findAll()).map(category => category.id);
                const admins = (await this.adminService.findAll()).map(category => category.id);
                for (let index = 0; index < 500; index++) {
                    const product: Omit<Product, '_id'> = {
                        name: faker.word.noun(),
                        description: faker.lorem.paragraph(),
                        price: Number(faker.commerce.price({min: 200000, max: 3000000, dec: 0})),
                        discount: Number(faker.commerce.price({min: 0, max: 190000, dec: 0})),
                        quantity: Number(faker.commerce.price({min: 2, max: 5000, dec: 0})),
                        category: faker.helpers.arrayElement(categories),
                        productImagesSrc: [faker.image.url({width: 600, height:640})],
                        additionalsImageSrc: [
                            faker.image.url({width: 600, height:640}),
                            faker.image.url({width: 600, height:640}),
                            faker.image.url({width: 600, height:640}),
                            faker.image.url({width: 600, height:640}),
                        ],
                        deletedAt: faker.helpers.arrayElement(
                            [
                                false,
                                true,
                                false,
                                false,
                                false,
                            ]
                        ), 
                        admin: faker.helpers.arrayElement(admins),
                        customProperty: [
                            await this.getCustomProperty(),
                            await this.getCustomProperty(),
                            await this.getCustomProperty(),
                            await this.getCustomProperty(),
                        ],
                        code: faker.database.mongodbObjectId()
                    }
                    if (!products.some(el => el.code == product.code)) {
                        products.push(product);
                    }
                }
                this.productservice.insertMany(products);
            }
        }
    }

    async getCustomProperty() {
        const properies = await this.propertyService.findAll();
        const property = faker.helpers.arrayElement(properies);
        if (property.type == 'file') {
            return {
                value: faker.image.url(),
                label: property.label,
                type: property.type,
                unit: ''
            }
        } 
        if (property.type == 'text') {
            return {
                value: faker.word.noun(),
                label: property.label,
                type: property.type,
                unit: ''
            }
        }
        if (property.type == 'number') {
            return {
                value: faker.number.int({min: 2, max: 400}).toString(),
                label: property.label,
                type: property.type,
                unit: ''
            }
        }
    }
}