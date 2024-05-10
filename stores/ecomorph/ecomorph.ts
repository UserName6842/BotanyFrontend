
import {useAsyncData} from "#app";
import type {Ecomorph, EcomorphStore} from "~/stores/ecomorph/types";
import {TypeEcomorph} from "~/stores/type-ecomorphs/types";
import type {Identifier} from "~/stores/types";

export const useEcomorph = defineStore('Ecomorph', {
        state: (): EcomorphStore => ({
            ecomorhs: [],
            loading: false
        }),
        getters: {
            getEcomorphs: (state):Ecomorph[] => state.ecomorhs,
            getIsLoading: (state) => state.loading,
        },
        actions: {
            async fetchEcomorhs() {
                const query = gql`
                    query getListEcomorph($dataPage: EcomorphListRequest){
                      ecomorph{
                        getListEcomorph(pages:$dataPage){
                        page{
                            total
                            page
                          }
                          list{
                            id{
                              resourceId
                            }
                            title
                            description
                          }
                        }
                      }
                    }
               `

                const variables = {
                    dataPage: {

                    }
                }

                try {
                    this.loading = true
                    const {  data} = await useAsyncQuery(query,  variables);
                    // Проверяем, есть ли уже данные в результате запроса

                    this.ecomorhs = data.value.ecomorph.getListEcomorph.list;
                    console.log('Данные успешно получены:', data.value.ecomorph.getListEcomorph.list)

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                } finally {
                    this.loading = false
                }
            },

            async CrateEcomorhs(input: Ecomorph) {
                try {
                    const mutation = gql`
                         mutation insertEcomorph($data: InputFormEcomorph){
                          ecomorph{
                            insertEcomorph(input:$data){
                              id{
                                resourceId
                              }
                              title
                            }
                          }
                        }
                            `

                    const variables = {
                        data:{
                            title: input.title,
                            description: input.description
                        }
                    }
                    this.loading = true
                    const { mutate, onDone, onError } = useMutation(mutation)

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
                }   finally {
                    this.loading = false
                }
            },

            async UpdateEcomorhs(input: Ecomorph) {
                try {
                    const mutation = gql`
                      mutation uddateEcomorphs($data: InputEcomorph){
                          ecomorph{
                            updateEcomorph(input:$data){
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
                            payload:{
                                title: input.title,
                                description: input.description,
                            }
                        }
                    }
                    this.loading = true
                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        console.log('Успешное обновление:', data.data)

                        this.fetchEcomorhs()
                    })

                    onError((error) => {
                        console.error('Ошибка обновление:', error.message)
                    })

                    await mutate(variables)


                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error)
                }finally {
                    this.loading = false
                }
            },


            async DeleteEcomorhs(input: Identifier) {
                try {
                    const mutation = gql`
                        mutation DeleteEcomorph($id: ID!){
                          ecomorph{
                            deleteEcomorphById(id:$id){
                              result
                            }
                          }
                        }
                            `
                    const variables = {
                        id: input.resourceId
                    }
                    this.loading = true
                    const { mutate, onDone, onError } = useMutation(mutation)

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
                } finally {
                    this.loading = false
                }
            }
        }
    }
)