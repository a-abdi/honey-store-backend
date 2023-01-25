import { IsMongoId } from 'class-validator';

export class mongoIdParams {
    @IsMongoId({message: 'شناسه به درستی وارد نشده است'})
    _id: string;
}
