import type {TypePlant} from "~/stores/type-plant/types";
import type {Img} from "~/stores/types";
import type {TrialSite} from "~/stores/trial-site/types";
import type {Ecomorph} from "~/stores/ecomorph/types";

export type TransectaStore = {
    transects: Transecta[]
    analysis: Analysis
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

export type Analysis = {
    title?: string
    transect?: Transecta
    typeAnalysis?: TypeAnalysis
    ecomorph?: Ecomorph[]
    path: string
}

export type TypeAnalysis = "TypeAnalysisPlant" | "TypeAnalysisTransect"