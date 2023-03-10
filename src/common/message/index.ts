export const Message = {
    INVALID_MONGO_ID: (name : string = ''): string => `شناسه ${name} به درستی وارد نشده است`,
    INVALID_IP_V4: (): string => `اشتباه است ip فرمت`,
    IS_STRING: (name: string): string => `${name} باید به صورت حروف وارد شود`,
    MUST_BE_OBJECT: (name: string): string => `${name} به درستی وارد نشده است`,
    NOT_BE_EMPTY: (name: string): string => `${name} نمی تواند خالی باشد`,
    SHOULD_BE_DEFINED: (name: string): string => `${name} باید تعریف شود`,
    MUST_BE_NUMBER: (name: string): string => `${name} باید به صورت عدد وارد شود`,
    SUCCESS: (): string => `درخواست انجام شد`,
}