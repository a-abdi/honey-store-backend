import { Injectable } from "@nestjs/common";

@Injectable()
export class SortHelper {
    private readonly sortValue = [
        { createdAt: 1 },
        { createdAt: -1 },
        { price: 1 },
        { price: -1 },
        { score: -1 },
        { discount: -1 }
    ];

    getValue(sortIndex: number) {
        if (this.sortValue[sortIndex]) {
            return { sort: this.sortValue[sortIndex] }
        }
        return {};
    };

    sortCount() {
        return this.sortValue.length;
    }
}