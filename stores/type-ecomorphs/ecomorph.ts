import type {
  EcomorphListRequest,
  EcomorphsEntityListRequest,
  TypeEcomorph,
  TypeEcomorphStore
} from "~/stores/type-ecomorphs/types";
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
            async fetchEcomorhs(input?: EcomorphListRequest) {
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
                    data: {
                      ...input
                    }
                }

                try {
                    this.loading = true
                    const {onResult} = useQuery(query, variables, {fetchPolicy: "network-only"});
                    // Проверяем, есть ли уже данные в результате запроса

                    onResult((param) => {
                        this.typeEcomorphs = param.data.ecomorphsEntity.getAllEcomorphEntity.list;
                    })

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                } finally {
                    this.loading = false
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

                    const variables = {
                        data: {
                            title: input.title,
                            description: input.description,
                            displayTable: input.displayTable,
                            score: input.score,
                            ecomorphs: {id: input.ecomorphs.id}

                        }
                    }
                    this.loading = true
                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        this.fetchEcomorhs()
                    })

                    onError((error) => {
                        console.error('Ошибка создании:', error.message)
                    })

                    await mutate(variables)


                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error)
                } finally {
                    this.loading = false
                }
            },

            async UpdateEcomorhs(input: TypeEcomorph) {
                try {
                    const mutation = gql`
                    mutation uddateEcomorphsEntity($data: InputEcomorphsEntity){
                      ecomorphsEntity{
                        updateEcomorphEntity(input:$data){
                          id{
                            resourceId
                          }
                          title
                        }
                      }
                    }
                            `

                    const variables = {
                        data: {
                            id: input.id,
                            input: {
                                title: input.title,
                                description: input.description,
                                displayTable: input.displayTable,
                                score: input.score,
                                ecomorphs: {id: input.ecomorphs.id}
                            }
                        }
                    }
                    this.loading = true
                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        this.fetchEcomorhs()
                    })

                    onError((error) => {
                        console.error('Ошибка обновление:', error.message)
                    })

                    await mutate(variables)


                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error)
                } finally {
                    this.loading = false
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
                    this.loading = true
                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        this.fetchEcomorhs()
                    })

                    onError((error) => {
                        console.error('Ошибка удаления:', error.message)
                    })

                    await mutate(variables)

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error)
                } finally {
                    this.loading = false
                }
            }
        }
    }
)
