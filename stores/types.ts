export type AuthStore = {
  userName: string;
  isLogin: boolean;
  user?: User;
};

export type RoleType = "NormalUser" | "SuperUser";

export type User = {
  name: string;
  role: RoleType;
};

export type Identifier = {
  resourceId: string;
};

export type Img = {
  id?: Identifier;
  name: string;
  path: string;
};

export type TypeForm = "create" | "update";

export type PagesRequest = {
  page: number;
  limit: number;
};
