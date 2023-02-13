import { IsMongoId } from 'class-validator';

export class MongoIdParams {
    @IsMongoId({message: 'شناسه به درستی وارد نشده است'})
    _id: string;
}
