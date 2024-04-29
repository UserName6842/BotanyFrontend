
import {useAsyncData} from "#app";
import type {EcomorphStore} from "~/stores/ecomorph/types";

export const useEcomorph = defineStore('Ecomorph', {
        state: (): EcomorphStore => ({
            ecomorhs: [],
            loading: false
        }),
        getters: {
            getEcomorphs: (state) => state.ecomorhs,
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
                    const {  onResult} = useQuery(query,  variables , {fetchPolicy: "network-only"});
                    // Проверяем, есть ли уже данные в результате запроса

                    onResult((param) => {
                        this.ecomorhs = param.data.ecomorph.getListEcomorph.list;
                        console.log('Данные успешно получены:', param.data.ecomorph.getListEcomorph.list)

                    })

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
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
                }
            },

            async DeleteEcomorhs(input: Ecomorph) {
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
                        id: input
                    }

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
                }
            }
        }
    }
)