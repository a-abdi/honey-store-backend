import { UrlHelper } from "src/common/helper/url.helper";
import { Category } from "../entities/category.entity";
import { Request } from "express";

export class HostAddress extends UrlHelper{
    bindToOne(request: Request, category: Category) {
        const hostAddress = this.getHostAddress(request);
        category.imageSrc = `${hostAddress}/${category.imageSrc}`;
    }

    bindToMany(request: Request, categories: Category[]) {
        const hostAddress = this.getHostAddress(request);
        categories.map(
            category => category.imageSrc = `${hostAddress}/${category.imageSrc}`
        );
    }
}