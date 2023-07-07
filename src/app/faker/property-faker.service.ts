import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { PropertyService } from "src/app/property/property.service";
import 'dotenv/config';
import { fakerFA as faker } from '@faker-js/faker';
import { CreatePropertyDto } from "src/app/property/dto/create-property.dto";
import { ProperyType } from "src/common/declare/enum";

@Injectable()
export class PropertyFakerService implements OnApplicationBootstrap {
    constructor(private readonly propertyService: PropertyService) {}
    private readonly logger = new Logger(PropertyFakerService.name);

    async onApplicationBootstrap(): Promise<any> {
        if (process.env.CREATE_FAKE_DATA === '1') {
            const property = await this.propertyService.findAll();
            if (property.length > 0) {
                this.logger.warn('con not create fake data for propery because property data allready exist');
            } else {
                let properies: CreatePropertyDto[] = [];
                for (let index = 0; index < 100; index++) {
                    const property: CreatePropertyDto = {
                        label: faker.word.adjective(),
                        type: faker.helpers.enumValue(ProperyType),
                    }
                    if (!properies.some(el => el.label == property.label)) {
                        properies.push(property);
                    }
                }
                this.propertyService.insertMany(properies);
            }
        }
    }
}