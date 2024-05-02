
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

export type TypeForm = "create" | "update"

export type PagesRequest = {
    page: number
    limit: number
}