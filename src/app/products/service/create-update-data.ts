import { AuthUserInfo } from "src/interface/auth-user-info";
import { UpdateProductDto } from "../dto/update-product.dto";

export const createUpdateData = (file: Express.Multer.File, user: AuthUserInfo, updateProductDto: UpdateProductDto) => {
    if(file) {
        return { ...updateProductDto, admin: user.userId, imageSrc: file.path };
    } else {
        return  { ...updateProductDto, admin: user.userId };
    }
}