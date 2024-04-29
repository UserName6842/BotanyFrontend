import type {Ecomorph} from "~/stores/ecomorph/types";


export function ecomorphsToTable(ecomorphs: Ecomorph[]) {
    const ecomorphsTable: EcomorphTable[] = []

    for (const item of ecomorphs) {
        ecomorphsTable.push({id: item.id!.resourceId, title: item.title, description: item.description})
    }

    return ecomorphsTable
}