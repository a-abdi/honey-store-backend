export const Message = {
    INVALID_MONGO_ID: (name : string = ''): string => `شناسه ${name} به درستی وارد نشده است`,
    INVALID_IP_V4: (): string => `اشتباه است ip فرمت`,
    IS_STRING: (name: string): string => `${name} باید به صورت حروف وارد شود`,
}