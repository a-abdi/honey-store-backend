import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ImageHelper {
    injectAttachSrcToPropery(attachList: Express.Multer.File[], productDto: CreateProductDto | UpdateProductDto) {
        for (const attach of attachList) {
            const { size } = attach;
            for (let index = 0; index < productDto?.customProperty.length; index++) {
                productDto?.customProperty[index];
                if (productDto?.customProperty[index]?.value == size) {
                    productDto.customProperty[index].value = attach.path
                }
            }
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