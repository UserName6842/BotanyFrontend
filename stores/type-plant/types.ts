import type {Identifier, Img} from "~/stores/types";
import type {Ecomorph} from "~/stores/ecomorph/types";
import type {TypeEcomorph} from "~/stores/type-ecomorphs/types";

export type TypePlantStore = {
    typePlants: TypePlant[]
    typePlant: TypePlant
    loading : boolean
}

export type TypePlant = {
    id?: Identifier
    title : string
    subtitle: string
    ecomorphsEntity: TypeEcomorph[]
    img: Img
}