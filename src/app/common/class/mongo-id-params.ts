import { IsMongoId } from 'class-validator';

export class NongoIdParams {
    @IsMongoId({message: 'شناسه به درستی وارد نشده است'})
    _id: string;
}
