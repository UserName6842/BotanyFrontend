import type {Identifier} from "~/stores/types";
import type {TrialSite, TrialSiteListRequest, TrialSiteStore} from "./types"

export const useTrialSite = defineStore('TrialSite', {
        state: (): TrialSiteStore => ({
            totalCount: 0,
            trialSites: [],
            plants:[],
            plant: {
                id: {
                    resourceId: ""
                },
                typePlant: {
                    id: {
                        resourceId: ""
                    },
                    title: '',
                    subtitle: "",
                    ecomorphsEntity:[],
                    img: {
                        id: {
                            resourceId: ""
                        },
                        path: "",
                        name: ""
                    }
                },
                count: 0,
                coverage: 0
            },
            trialSite: {
                id: {
                    resourceId: ""
                },
                title: "",
                covered: 0,
                rating: 0,
                plant: [],
                img: {
                    id: {
                        resourceId: ""
                    },
                    path: "",
                    name: ""
                }
            },
            loading: false
        }),
        getters: {
            getTrialSites: (state) => state.trialSites,
            getTotalCountTrialSites: (state) => state.totalCount,
            getTrialSite: (state) => state.trialSite,
            getIsLoading: (state) => state.loading,
        },
        actions: {
            async fetchTrialSiteById(id: string) {
                this.loading = true
                const query = gql`
                  query getTrialSite($data: ID!){
                      trialSite{
                        getTrialSite(id:$data){
                          id{
                            resourceId
                          }
                          title
                          covered
                          rating
                          countTypes
                          dominant{
                          \tid\t{
                            \tresourceId
                          \t}
                        \t}
                          subDominant{
                          \tid\t{
                            \tresourceId
                          \t}
                          }
                          img{
                            \tid {
                              \tresourceId
                          \t}
                          }
                          plant{
                          count
                          coverage
                          typePlant{
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
                    data: id
                }

                try {

                    const {onResult} = useQuery(query, variables, {fetchPolicy: "network-only"});
                    // Проверяем, есть ли уже данные в результате запроса

                    onResult((param) => {
                        this.trialSites = param.data.typePlant.getTrialSite;
                        console.log(`Данные об типе растения ${id} успешно получены:`, param.data.typePlant.getTrialSite)

                    })

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                } finally {
                    this.loading = false
                }
            },


            async CrateTrialSite(input: TrialSite) {
                try {
                    this.loading = true
                    const mutation = gql`
                        mutation createTrialSite($data: InputFormTrialSiteRequest){
                          trialSite{
                            createTrialSite(input:$data){
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
                            ...input
                        }
                    }

                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        console.log('Успешное создание:', data.data)

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

            async UpdateTrialSite(input: TrialSite) {
                try {
                    this.loading = true
                    const mutation = gql`
                   mutation upTrialSite( $data: InputTrialSiteRequest ){
                      trialSite{
                        upTrialSite(input:$data){
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
                                ...input
                            }
                        }
                    }

                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        console.log('Успешное обновление:', data.data)

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

            async DeleteTrialSite(input: Identifier) {
                try {
                    this.loading = true
                    const mutation = gql`
                     mutation deleteTrialSite($data: ID!){
                      transect{
                        deleteTransect(id:$data){
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