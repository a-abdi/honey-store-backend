import { Sort } from "./enum";

export const SORT_QUERY = [
    { 
        key: '_id',
        type: Sort.Des,
        value: { _id: Sort.Des },
        reverse: { _id: Sort.Asc }
    },
    { 
        key: '_id',
        type: Sort.Asc,
        value: { _id: Sort.Asc },
        reverse: { _id: Sort.Des },
        keyType: 'number'
    },
    { 
        key: 'totalPrice',
        type: Sort.Asc,
        value: { totalPrice: Sort.Asc, _id: Sort.Asc },
        reverse: { totalPrice: Sort.Des, _id: Sort.Des },
        keyType: 'number'
    },
    { 
        key: 'totalPrice',
        type: Sort.Des,
        value: { totalPrice: Sort.Des, _id: Sort.Des },
        reverse: { totalPrice: Sort.Asc, _id: Sort.Asc },
    },
    { 
        key: 'discount',
        type: Sort.Des,
        value: { discount: Sort.Des, _id: Sort.Des },
        reverse: { discount: Sort.Asc, _id: Sort.Asc },
    },
    { 
        key: 'mostPurchased',
        type: Sort.Des,
        value: { mostPurchased: Sort.Des, _id: Sort.Des },
        reverse: { mostPurchased: Sort.Asc, _id: Sort.Asc },
    },
];

export type SortQuery = typeof SORT_QUERY;