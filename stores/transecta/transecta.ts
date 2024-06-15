import type {Identifier} from "~/stores/types";
import type {Analysis, Transecta, TransectaListRequest, TransectaStore} from "./types"
import type {TrialSite} from "~/stores/trial-site/types";

export const useTransecta = defineStore('Transecta', {
    state: (): TransectaStore => ({
      analysis: {},
      totalCount: 0,
      transects: [],
      transect: {
        id: {
          resourceId: ""
        },
        title: "",
        square: 0,
        squareTrialSite: 0,
        countTypes: 0,
        covered: 0,
        rating: 0,
        trialSite: [],
      },
      loading: false
    }),
    getters: {
      getTransects: (state) => state.transects,
      getTotalCountTransectas: (state) => state.totalCount,
      getTransect: (state): Transecta => state.transect,
      getIsLoading: (state) => state.loading,
    },
    actions: {

      pushTrialSite(input: TrialSite) {
        debugger
        if (!this.transect.trialSite) {
          this.transect.trialSite = [];
        }
        const newTrialSite = this.transect.trialSite
        newTrialSite.push(input)

        this.transect.trialSite = newTrialSite;
      },
      async fetchTransecta(request?: TransectaListRequest) {
        this.loading = true
        const query = gql`
                query getAllTrialSite($dataPages:TransectListRequest ){
                  transect{
                    getAllTransect(pages:$dataPages){
                    \tpage{
                        total
                        page
                      }
                      list{
                        id{
                          resourceId
                        }
                        title
                        square
                        covered
                        rating
                        countTypes
                        squareTrialSite
                        trialSite {
                        id {
                          resourceId
                        }
                          title

                      }
                        subDominant{
                           id{
                          resourceId
                        }
                        }
                        dominant{
                           id{
                          resourceId
                        }
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
            this.transects = param.data.transect.getAllTransect.list;
            this.totalCount = param.data.transect.getAllTransect.page.total;
            console.log('Данные об типах растения успешно получены:', param.data.typePlant.getAllTransecta.list)

          })

        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        } finally {
          this.loading = false
        }
      },

      async fetchTransectaById(id: string) {
        this.loading = true
        const query = gql`
                    query getTrialSite($data: ID!){
                      transect{
                        getTransect(id:$data){
                           id{
                              resourceId
                            }
                            title
                            square
                            rating
                            countTypes
                            covered
                            squareTrialSite
                            trialSite {
                            id {
                              resourceId
                            }
                              title
                              covered
                              countTypes
                              rating
                              subDominant{
                               id{
                              resourceId
                            }
                              title
                            }
                            dominant{
                               id{
                              resourceId
                            }
                              title
                            }
                          \t}
                            subDominant{
                               id{
                              resourceId
                            }
                              title
                            }
                            dominant{
                               id{
                              resourceId
                            }
                              title
                            }
                        }
                      }
                    }
               `
        const variables = {
          data: id
        }

        try {

          const {data} = await useAsyncQuery(query, variables)
          this.transect = data.value.transect.getTransect
          console.log(`Успешное получение ПП по id: ${id}`, data.value)
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        } finally {
          this.loading = false
        }
      },

      async fetchAsyncTransectaById(id: string) {
        this.loading = true
        const query = gql`
                    query getTrialSite($data: ID!){
                      transect{
                        getTransect(id:$data){
                           id{
                              resourceId
                            }
                            title
                            square
                            rating
                            countTypes
                            covered
                            squareTrialSite
                            trialSite {
                            id {
                              resourceId
                            }
                              title
                              covered
                              countTypes
                              rating
                              subDominant{
                               id{
                              resourceId
                            }
                              title
                            }
                            dominant{
                               id{
                              resourceId
                            }
                              title
                            }
                          \t}
                            subDominant{
                               id{
                              resourceId
                            }
                              title
                            }
                            dominant{
                               id{
                              resourceId
                            }
                              title
                            }
                        }
                      }
                    }
               `
        const variables = {
          data: id
        }

        try {

          const {onResult} = await useQuery(query, variables)
          onResult((param) => {
            this.transect = param.data.value.transect.getTransect
            console.log(`Успешное получение ПП по id: ${id}`, param.data.value)
          })

        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        } finally {
          this.loading = false
        }
      },

      setTrialSite(input: TrialSite) {
        this.transect.trialSite.push(input)
      },

      async CrateAnalysis(input: Analysis) {
        try {
          const mutation = gql`
                        mutation creatAnalysis($data:InputCreateAnalysis!) {
                          analysis{
                            creatAnalysis(input:$data){
                              title
                              path
                            }
                          }
                        }
                            `


          const variables = {
            data: {
              ...input
            }
          };


          const {mutate, onDone, onError} = useMutation(mutation)

          onDone((data) => {
            this.analysis = data.data.analysis.creatAnalysis
            console.log('Успешное создание:', data.data)
          })

          onError((error) => {
            console.error('Ошибка создании:', error.message)
          })

          await mutate(variables)


        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error)
        }
      },


      async CrateTransecta(input: Transecta) {
        try {
          const mutation = gql`
                        mutation createTransect($data:InputFormTransectRequest ){
                          transect{
                            createTransect(input:$data){
                              id{
                              resourceId
                            }
                            title
                            square
                            rating
                            countTypes
                            covered
                            squareTrialSite
                            trialSite {
                            id {
                              resourceId
                            }
                              title
                            }
                            subDominant{
                               id{
                              resourceId
                            }
                            }
                            dominant{
                               id{
                              resourceId
                            }
                            }
                            }
                          }
                        }
                            `

          const {id, trialSite, ...rest} = input;

          const variables = {
            data: {
              ...rest
            }
          };


          const {mutate, onDone, onError} = useMutation(mutation)

          onDone((data) => {
            this.transect = data.data.transect.createTransect
            console.log('Успешное создание:', data.data)
          })

          onError((error) => {
            console.error('Ошибка создании:', error.message)
          })

          await mutate(variables)


        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error)
        }
      },

      async UpdateTransecta(input: Transecta) {
        try {
          this.loading = true
          const mutation = gql`
                    mutation upTrialSite( $data: InputTransectRequest ){
                      transect{
                        upTransect(input:$data){
                        id{
                          resourceId
                        }
                        title
                        square
                        rating
                        countTypes
                        covered
                        squareTrialSite
                        trialSite {
                        id {
                          resourceId
                        }
                          title
                          covered
                          countTypes
                          rating
                      \t}
                        subDominant{
                           id{
                          resourceId
                        }
                          title
                        }
                        dominant{
                           id{
                          resourceId
                        }
                          title
                        }
                        }
                      }
                    }
                            `

          const {id, trialSite, img, ...fiald} = input
          let variables = {}
          debugger
          if (trialSite) {
            variables = {
              data: {
                id: id,
                input: {
                  trialSite,
                  ...fiald

                }
              }
            }
          } else {
            variables = {
              data: {
                id: id,
                input: {
                  ...fiald

                }
              }
            }
          }

          const {mutate, onDone, onError} = useMutation(mutation)

          onDone((data) => {
            debugger
            this.transect = data.data.transect.upTransect;
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

      async DeleteTransecta(input: Identifier) {
        try {
          this.loading = true
          const mutation = gql`
                     mutation deleteTrialSite($id: ID!){
                      transect{
                        deleteTransect(id:$id){
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
            this.fetchTransecta()
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
