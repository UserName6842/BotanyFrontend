import type {Identifier} from "~/stores/types";
import type {TypePlant, TypePlantStore} from "~/stores/type-plant/types";

export const useTypePlant = defineStore('TypePlant', {
        state: (): TypePlantStore => ({
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
            getTypePlant: (state) => state.typePlant,
            getIsLoading: (state) => state.loading,
        },
        actions: {
            async fetchTypePlant() {
                const query = gql`
                query getTypePlant($data: TypePlantListRequest){
                  typePlant{
                    getAllTypePlant(pages:$data){
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
                    data: {}
                }

                try {
                    const {onResult} = useQuery(query, variables, {fetchPolicy: "network-only"});
                    // Проверяем, есть ли уже данные в результате запроса

                    onResult((param) => {
                        this.typePlants = param.data.typePlant.getAllTypePlant.list;
                        console.log('Данные об типах растения успешно получены:', param.data.typePlant.getAllTypePlant.list)

                    })

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                }
            },

            async fetchTypePlantById(id: string) {
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
                    const {onResult} = useQuery(query, variables, {fetchPolicy: "network-only"});
                    // Проверяем, есть ли уже данные в результате запроса

                    onResult((param) => {
                        this.typePlant = param.data.typePlant.getTypePlant;
                        console.log(`Данные об типе растения ${id} успешно получены:`, param.data.typePlant.getTypePlant)

                    })

                } catch (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                }
            },


            async CrateTypePlant(input: TypePlant) {
                try {
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
                }
            },

            async UpdateTypePlant(input: TypePlant) {
                try {
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
                }
            },

            async DeleteTypePlant(input: Identifier) {
                try {

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
                }
            }
        }
    }
)