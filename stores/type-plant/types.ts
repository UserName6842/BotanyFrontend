import type { Identifier, Img, PagesRequest } from "~/stores/types";
import type { TypeEcomorph } from "~/stores/type-ecomorphs/types";

export type TypePlantStore = {
  typePlants: TypePlant[];
  totalCount: number;
  typePlant: TypePlant;
  loading: boolean;
};

export type TypePlant = {
  id?: Identifier;
  title?: string;
  subtitle?: string;
  ecomorphsEntity?: TypeEcomorph[];
  img?: Img;
};

export type TypePlantListRequest = {
  page?: PagesRequest;
  filter?: FilterTypePlant;
};

export type FilterTypePlant = {
  searchTitle: string;
};
