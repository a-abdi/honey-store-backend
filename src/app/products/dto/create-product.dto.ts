
export class CreateProductDto {
    name: string;
    price: number;
    quantity: number;
    description?: string;
    code: string;
    discount?: number;
}
