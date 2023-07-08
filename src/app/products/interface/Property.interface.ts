interface Property {
    label: string;
    description: string;
}

export interface PropertyResponse { 
    property: Property[] | [];
}