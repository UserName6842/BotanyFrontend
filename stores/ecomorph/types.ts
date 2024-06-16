import type { Identifier } from "~/stores/types";

export type EcomorphStore = {
  ecomorhs: Ecomorph[];
  loading: boolean;
};

export type Ecomorph = {
  id?: Identifier;
  title: string;
  description: string;
};
