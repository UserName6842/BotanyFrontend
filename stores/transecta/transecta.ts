import type { Identifier } from "~/stores/types";
import type { Analysis, Transecta, TransectaListRequest, TransectaStore } from "./types";
import type { TrialSite } from "~/stores/trial-site/types";

export const useTransecta = defineStore("Transecta", {
  state: (): TransectaStore => ({
    analysis: {},
    totalCount: 0,
    transects: [],
    transect: {
      id: {
        resourceId: "",
      },
      title: "",
      square: 0,
      squareTrialSite: 0,
      countTypes: 0,
      covered: 0,
      rating: 0,
    },
    loading: false,
  }),
  getters: {
    getTransects: (state) => state.transects,
    getTotalCountTransectas: (state) => state.totalCount,
    getTransect: (state): Transecta => state.transect,
    getIsLoading: (state) => state.loading,
  },
  actions: {
    async fetchTransecta(request?: TransectaListRequest) {
      this.loading = true;
      const query = gql`
        query getAllTrialSite($dataPages: TransectListRequest) {
          transect {
            getAllTransect(pages: $dataPages) {
              page {
                total
                page
              }
              list {
                id {
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
                subDominant {
                  id {
                    resourceId
                  }
                }
                dominant {
                  id {
                    resourceId
                  }
                }
              }
            }
          }
        }
      `;
      const variables = {
        data: {
          ...request,
        },
      };

      try {
        const { onResult } = useQuery(query, variables, { fetchPolicy: "network-only" });
        // Проверяем, есть ли уже данные в результате запроса

        onResult((param) => {
          this.transects = param.data.transect.getAllTransect.list;
          if (param.data.transect.getAllTransect.page && param.data.transect.getAllTransect.page.total) {
            this.totalCount = param.data.transect.getAllTransect.page.total;
          }
        });
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTransectaById(id: string) {
      this.loading = true;
      const query = gql`
        query getTrialSite($data: ID!) {
          transect {
            getTransect(id: $data) {
              id {
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
                subDominant {
                  id {
                    resourceId
                  }
                  title
                }
                dominant {
                  id {
                    resourceId
                  }
                  title
                }
              }
              subDominant {
                id {
                  resourceId
                }
                title
              }
              dominant {
                id {
                  resourceId
                }
                title
              }
            }
          }
        }
      `;
      const variables = {
        data: id,
      };

      try {
        const { data } = await useAsyncQuery(query, variables);
        this.transect = data.value.transect.getTransect;
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAsyncTransectaById(id: string) {
      this.loading = true;
      const query = gql`
        query getTrialSite($data: ID!) {
          transect {
            getTransect(id: $data) {
              id {
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
                subDominant {
                  id {
                    resourceId
                  }
                  title
                }
                dominant {
                  id {
                    resourceId
                  }
                  title
                }
              }
              subDominant {
                id {
                  resourceId
                }
                title
              }
              dominant {
                id {
                  resourceId
                }
                title
              }
            }
          }
        }
      `;
      const variables = {
        data: id,
      };

      try {
        const { onResult } = await useQuery(query, variables);
        onResult((param) => {
          this.transect = param.data.value.transect.getTransect;
        });
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },

    setTrialSite(input: TrialSite) {
      this.transect.trialSite.push(input);
    },

    async CrateAnalysis(input: Analysis) {
      try {
        const mutation = gql`
          mutation creatAnalysis($data: InputCreateAnalysis!) {
            analysis {
              creatAnalysis(input: $data) {
                title
                path
              }
            }
          }
        `;

        const variables = {
          data: {
            ...input,
          },
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          this.analysis = data.data.analysis.creatAnalysis;
        });

        onError((error) => {
          console.error("Ошибка создании:", error.message);
        });

        await mutate(variables);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    },

    async CrateTransecta(input: Transecta) {
      try {
        // Определяем GraphQL мутацию для создания нового объекта Transect
        const mutation = gql`
          mutation createTransect($data: InputFormTransectRequest) {
            transect {
              createTransect(input: $data) {
                id {
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
                subDominant {
                  id {
                    resourceId
                  }
                }
                dominant {
                  id {
                    resourceId
                  }
                }
              }
            }
          }
        `;

        // Деструктуризация входного объекта input для извлечения id и trialSite, оставшиеся свойства сохраняются в rest
        const { id, trialSite, ...rest } = input;

        // Определяем переменные для мутации
        const variables = {
          data: {
            ...rest,
          },
        };

        // Используем хуки useMutation для выполнения мутации
        const { mutate, onDone, onError } = useMutation(mutation);

        // Обработчик успешного выполнения мутации
        onDone((data) => {
          // Сохраняем результат мутации в this.transect
          this.transect = data.data.transect.createTransect;
        });

        // Обработчик ошибки выполнения мутации
        onError((error) => {
          console.error("Ошибка создании:", error.message);
        });

        // Выполняем мутацию с определенными переменными
        await mutate(variables);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    },

    async UpdateTransecta(input: Transecta) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation upTrialSite($data: InputTransectRequest) {
            transect {
              upTransect(input: $data) {
                id {
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
                }
                subDominant {
                  id {
                    resourceId
                  }
                  title
                }
                dominant {
                  id {
                    resourceId
                  }
                  title
                }
              }
            }
          }
        `;

        const { id, trialSite, countTypes, img, ...fiald } = input;
        let variables = {};
        if (trialSite) {
          variables = {
            data: {
              id: id,
              input: {
                trialSite,
                ...fiald,
              },
            },
          };
        } else {
          variables = {
            data: {
              id: id,
              input: {
                ...fiald,
              },
            },
          };
        }

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          this.transect = data.data.transect.upTransect;
        });

        onError((error) => {
          console.error("Ошибка обновление:", error.message);
        });

        await mutate(variables);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },

    async DeleteTransecta(input: Identifier) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation deleteTrialSite($id: ID!) {
            transect {
              deleteTransect(id: $id) {
                result
              }
            }
          }
        `;

        const variables = {
          id: input.resourceId,
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone(() => {
          this.fetchTransecta();
        });

        onError((error) => {
          console.error("Ошибка удаления:", error.message);
        });

        await mutate(variables);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
