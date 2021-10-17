export interface JWTPayload {
    userId: string,
    userMail: string,
    userName: string,
    menu?: any[],
    type_user: string
}