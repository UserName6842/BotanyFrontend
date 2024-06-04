import type {Identifier} from "~/stores/types";
import type {TypePlant, TypePlantListRequest, TypePlantStore} from "~/stores/type-plant/types";

export const useTypePlant = defineStore('TypePlant', {
        state: (): TypePlantStore => ({
            totalCount: 0,
            typePlants: [],
            typePlant: {
                id: {
                    resourceId: ""
                },
                title: "",
                subtitle: "",
                ecomorphsEntity: [],
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
            getTypePlants: (state) => state.typePlants,
            getTotalCountTypePlants: (state) => state.totalCount,
            getTypePlant: (state) => state.typePlant,
            getIsLoading: (state) => state.loading,
        },
        actions: {
            async fetchTypePlant(request?: TypePlantListRequest) {
                this.loading = true
                const query = gql`
                query getTypePlant($data: TypePlantListRequest){
                  typePlant{
                    getAllTypePlant(pages:$data){
                      page{
                        total
                        page
                      }
                      list{
                        id{
                          resourceId
                        }
                        title
                        subtitle
                        ecomorphsEntity{
                          id{
                            resourceId
                          }
                          title
                        }
                        img{
                          id{
                            resourceId
                          }
                          path
                          name
                        }
                      }
                    }
                  }
                }
               `
                const variables = {
                    data: {
                        ...request
                    }
                }

                try {
                    const {onResult} = useQuery(query, variables, {fetchPolicy: "network-only"});
                    // Проверяем, есть ли уже данные в результате запроса

                    onResult((param) => {
                        this.typePlants = param.data.typePlant.getAllTypePlant.list;
                        if(param.data.typePlant.getAllTypePlant.page && param.data.typePlant.getAllTypePlant.page.total){
                          this.totalCount = param.data.typePlant.getAllTypePlant.page.total;
                        }
                        console.log('Данные об типах растения успешно получены:', param.data.typePlant.getAllTypePlant.list)

                    })

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                } finally {
                    this.loading = false
                }
            },

            async fetchTypePlantById(id: string) {
                this.loading = true
                const query = gql`
           query getByIdTypePlant($data: ID!){
              typePlant{
                getTypePlant(id:$data){
                    id{
                      resourceId
                    }
                    title
                    subtitle
                    ecomorphsEntity{
                      id{
                        resourceId
                      }
                      title
                      ecomorphs{
                        id{
                          resourceId
                        }
                      }
                    }
                    img{
                      id{
                        resourceId
                      }
                      path
                      name
                    }
                }
              }
            }
               `
                const variables = {
                    data: id
                }
                try {
                    const {data} = await useAsyncQuery(query, variables);
                    this.typePlant = data.value?.typePlant.getTypePlant;
                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                } finally {
                    this.loading = false
                }
            },


            async CrateTypePlant(input: TypePlant) {
                try {
                    this.loading = true
                    const mutation = gql`
                   mutation createTypePlant($data: InputFormTypePlantRequest){
                     typePlant{
                        createTypePlant(input:$data){
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
                            subtitle: input.subtitle,
                            ecomorphsEntity: input.ecomorphsEntity,
                            img: input.img,
                        }
                    }

                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        console.log('Успешное создание:', data.data)

                        this.fetchTypePlant()
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

            async UpdateTypePlant(input: TypePlant) {
                try {
                    this.loading = true
                    const mutation = gql`
                    mutation updateTypePlant($data: InputTypePlantRequest){
                      typePlant{
                        updateTypePlant(input:$data){
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
                                subtitle: input.subtitle,
                                ecomorphsEntity: input.ecomorphsEntity,
                                img: input.img,
                            }
                        }
                    }

                    const {mutate, onDone, onError} = useMutation(mutation)

                    onDone((data) => {
                        console.log('Успешное обновление:', data.data)

                        this.fetchTypePlant()
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

            async DeleteTypePlant(input: Identifier) {
                try {
                    this.loading = true
                    const mutation = gql`
                      mutation deleteTypePlant($id: ID!){
                          typePlant{
                            deleteTypePlant(id:$id){
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
                        this.fetchTypePlant()
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
