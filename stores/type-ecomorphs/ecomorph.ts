import type {TypeEcomorph, TypeEcomorphStore} from "~/stores/type-ecomorphs/types";
import {Identifier} from "~/stores/types";

export const useTypeEcomorph = defineStore('TypeEcomorph', {
        state: (): TypeEcomorphStore => ({
            typeEcomorphs: [],
            loading: false
        }),
        getters: {
            getTypeEcomorphs: (state) => state.typeEcomorphs,
            getIsLoading: (state) => state.loading,
        },
        actions: {
            async fetchEcomorhs() {
                const query = gql`
                  query getListEcomorphsEntity($data: EcomorphsEntityListRequest){
                      ecomorphsEntity{
                        getAllEcomorphEntity(pages:$data){
                          list{
                            id{
                              resourceId
                            }
                            title
                            description
                            displayTable
                            score
                            ecomorphs{
                              id{
                                resourceId
                              }
                              title
                            }
                          }
                        }
                      }
                    }
               `
                const variables = {
                    data: {}
                }

                try {
                    const {onResult} = useQuery(query, variables, {fetchPolicy: "network-only"});
                    // Проверяем, есть ли уже данные в результате запроса

                    onResult((param) => {
                        this.typeEcomorphs = param.data.ecomorphsEntity.getAllEcomorphEntity.list;
                        console.log('Данные успешно получены:', param.data.ecomorphsEntity.getAllEcomorphEntity.list)

                    })

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                }
            },

            async CrateEcomorhs(input: TypeEcomorph) {
                try {
                    const mutation = gql`
                     mutation insertecomorphsEntity($data: InputFormEcomorphsEntity){
                      ecomorphsEntity{
                        insertEcomorphEntity(input:$data){
                          id{
                            resourceId
                          }
                          title
                        }
                      }
                    }
                            `
                    debugger
                    const variables = {
                        data: {
                            title: input.title,
                            description: input.description,
                            displayTable: input.displayTable,
                            score: input.score,
                            ecomorphs: {id: input.ecomorphs.id }

                        }
                    }

                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        console.log('Успешное создание:', data.data)

                        this.fetchEcomorhs()
                    })

                    onError((error) => {
                        console.error('Ошибка создании:', error.message)
                    })

                    await mutate(variables)


                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error)
                }
            },

            async DeleteEcomorhs(input: Identifier) {
                try {
                    const mutation = gql`
                        mutation DeleteEcomorphsEntity($id: ID!){
                          ecomorphsEntity{
                            deleteEcomorphEntityByID(id:$id){
                              result
                            }
                          }
                        }
                            `
                    const variables = {
                        id: input.resourceId
                    }

                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        console.log('Успешное удаление:', data.data)
                        this.fetchEcomorhs()
                    })

                    onError((error) => {
                        console.error('Ошибка удаления:', error.message)
                    })

                    await mutate(variables)

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error)
                }
            }
        }
    }
)