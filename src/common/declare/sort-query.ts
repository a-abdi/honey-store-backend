import { Sort } from "./enum";

export const SORT_QUERY = [
    { 
        key: '_id',
        type: Sort.Des,
        value: { _id: Sort.Des } 
    },
    { 
        key: '_id',
        type: Sort.Asc,
        value: { _id: Sort.Asc } 
    },
    { 
        key: 'price',
        type: Sort.Asc,
        value: { price: Sort.Asc, _id: Sort.Asc } 
    },
    { 
        key: 'price',
        type: Sort.Des,
        value: { price: Sort.Des, _id: Sort.Des } 
    },
    { 
        key: 'discount',
        type: Sort.Des,
        value: { discount: Sort.Des, _id: Sort.Des } 
    },
    { 
        key: 'mostPurchased',
        type: Sort.Des,
        value: { mostPurchased: Sort.Des, _id: Sort.Des } 
    },
];

export type SortQuery = typeof SORT_QUERY;