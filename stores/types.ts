
export type AuthStore = {
    userName: string
    isLogin: boolean
}

export type Identifier = {
    resourceId: string
}

export type Img = {
    id?: Identifier
    name:string
    path:string
}