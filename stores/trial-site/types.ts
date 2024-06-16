import type { TypePlant } from "~/stores/type-plant/types";

export type TrialSiteStore = {
  trialSites: TrialSite[];
  plants: Plant[];
  plant: Plant;
  totalCount: number;
  trialSite: TrialSite;
  loading: boolean;
};

export type TrialSite = {
  id?: Identifier;
  title: string;
  covered?: number;
  rating?: number;
  dominant?: TypePlant;
  subDominant?: TypePlant;
  plant?: Plant[];
  img?: Img;
};

export type TrialSiteListRequest = {
  page: PagesRequest;
};

export type Plant = {
  id: Identifier;
  coverage: number;
  count: number;
  typePlant?: TypePlant;
};
