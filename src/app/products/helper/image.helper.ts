import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ImageHelper {
    injectAttachSrcToPropery(attachList: Express.Multer.File[], productDto: CreateProductDto | UpdateProductDto) {
        for (const attach of attachList) {
            const { originalname } = attach;
            const property = productDto?.customProperty.find(property => property.code == originalname)
            property && ( property.value = attach.path);
        }
    }

    injectFileSrc(files: Express.Multer.File[]) {
        const filesImageSrc: string[] = [];
        for (const file of files) {
            filesImageSrc.push(file.path);
        }
        return filesImageSrc;
    }
}