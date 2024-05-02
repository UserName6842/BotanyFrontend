import type {TypePlant} from "~/stores/type-plant/types";
import type {Img} from "~/stores/types";
import type {TrialSite} from "~/stores/trial-site/types";

export type TransectaStore = {
    transects: Transecta[]
    totalCount: number
    transect: Transecta
    loading : boolean
}

export type Transecta = {
    id?: Identifier
    title : string
    covered?:number
    rating?: number
    square?: number
    squareTrialSite?: number
    countTypes?: number
    dominant?: TypePlant
    subDominant?: TypePlant
    trialSite: TrialSite[]
    img?: Img
}

export type TransectaListRequest = {
    page: PagesRequest
}