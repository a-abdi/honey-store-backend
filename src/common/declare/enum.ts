export enum Role {
    User = 'user',
    Admin = 'admin',
}

export enum OrderStatus {
    WatingPay,
    Payment,
    Cancel,
    Send,
    Return,
    Delivered,
}

export enum Sort {
    Des = -1,
    Asc = 1,
}