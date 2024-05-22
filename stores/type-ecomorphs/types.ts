import type {Identifier, PagesRequest} from "~/stores/types";
import type {Ecomorph} from "~/stores/ecomorph/types";

export type TypeEcomorphStore = {
    typeEcomorphs: TypeEcomorph[]
    loading : boolean
}

export type TypeEcomorph = {
    id?: Identifier
    title : string
    description: string
    displayTable: string
    score: number
    ecomorphs?: Ecomorph
}

export type EcomorphListRequest = {
  filter?: FilterEcomorph
}

export type FilterEcomorph = {
  searchTitle: string
}
