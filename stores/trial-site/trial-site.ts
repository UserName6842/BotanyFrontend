import type { Identifier } from "~/stores/types";
import type { Plant, TrialSite, TrialSiteStore } from "./types";

export const useTrialSite = defineStore("TrialSite", {
  state: (): TrialSiteStore => ({
    totalCount: 0,
    trialSites: [],
    plants: [],
    plant: {
      id: {
        resourceId: "",
      },
      typePlant: {
        id: {
          resourceId: "",
        },
        title: "",
        subtitle: "",
        ecomorphsEntity: [],
        img: {
          id: {
            resourceId: "",
          },
          path: "",
          name: "",
        },
      },
      count: 0,
      coverage: 0,
    },
    trialSite: {
      id: {
        resourceId: "",
      },
      title: "",
      covered: 0,
      rating: 0,
      plant: [],
      img: {
        id: {
          resourceId: "",
        },
        path: "",
        name: "",
      },
    },
    loading: false,
  }),
  getters: {
    getTrialSites: (state) => state.trialSites,
    getPlant: (state) => state.plant,
    getTotalCountTrialSites: (state) => state.totalCount,
    getTrialSite: (state) => state.trialSite,
    getIsLoading: (state) => state.loading,
  },
  actions: {
    async fetchTrialSiteById(id: string) {
      this.loading = true;
      const query = gql`
        query getTrialSite($data: ID!) {
          trialSite {
            getTrialSite(id: $data) {
              id {
                resourceId
              }
              title
              covered
              rating
              countTypes
              dominant {
                id {
                  resourceId
                }
                title
              }
              subDominant {
                id {
                  resourceId
                }
                title
              }
              img {
                id {
                  resourceId
                }
              }
              plant {
                id {
                  resourceId
                }
                count
                coverage
                typePlant {
                  id {
                    resourceId
                  }
                  title
                }
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

        this.trialSite = data.value?.trialSite.getTrialSite;
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },

    async CrateTrialSite(input: TrialSite) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation createTrialSite($data: InputFormTrialSiteRequest) {
            trialSite {
              createTrialSite(input: $data) {
                id {
                  resourceId
                }
                title
                covered
                rating
                countTypes
              }
            }
          }
        `;
        const { id, plant, ...rew } = input;
        const variables = {
          data: {
            ...rew,
          },
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          this.trialSite = data.data.trialSite.createTrialSite;
        });

        onError((error) => {
          console.error("Ошибка создании:", error.message);
        });

        await mutate(variables);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },

    async UpdateTrialSite(input: TrialSite) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation upTrialSite($data: InputTrialSiteRequest) {
            trialSite {
              upTrialSite(input: $data) {
                id {
                  resourceId
                }
                title
                covered
                rating
                countTypes
                dominant {
                  id {
                    resourceId
                  }
                }
                subDominant {
                  id {
                    resourceId
                  }
                }
                img {
                  id {
                    resourceId
                  }
                }
                plant {
                  id {
                    resourceId
                  }
                  count
                  coverage
                  typePlant {
                    id {
                      resourceId
                    }
                    title
                  }
                }
              }
            }
          }
        `;
        const { id, ...rest } = input;
        const variables = {
          data: {
            id: id,
            input: {
              ...rest,
            },
          },
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          this.trialSite = data.data.trialSite.upTrialSite;
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

    async DeleteTrialSite(input: Identifier) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation deleteTrialSite($data: ID!) {
            trialSite {
              deleteTrialSite(id: $data) {
                result
              }
            }
          }
        `;
        const variables = {
          data: input.resourceId,
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          console.log("Успешное удаление:", data.data);
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

    async CratePlant(input: Plant) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation insertPlant($data: InputFormPlant) {
            trialSite {
              createPlant(input: $data) {
                id {
                  resourceId
                }
                count
                coverage
                typePlant {
                  id {
                    resourceId
                  }
                  title
                }
              }
            }
          }
        `;

        const { id, ...rew } = input;
        const variables = {
          data: {
            ...rew,
          },
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          this.plant = data.data.trialSite.createPlant;
        });

        onError((error) => {
          console.error("Ошибка создании:", error.message);
        });

        await mutate(variables);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } finally {
        this.loading = false;
      }
    },

    async UpdatePlant(input: Plant) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation updatePlant($data: InputPlantRequest) {
            trialSite {
              updatePlant(input: $data) {
                id {
                  resourceId
                }
                count
              }
            }
          }
        `;
        const { id, ...rest } = input;
        const variables = {
          data: {
            id: id,
            input: {
              ...rest,
            },
          },
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          console.log("Успешное обновление:", data.data);
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

    async DeletePlant(input: Identifier) {
      try {
        this.loading = true;
        const mutation = gql`
          mutation deletePlant($id: ID!) {
            trialSite {
              deletePlant(id: $id) {
                result
              }
            }
          }
        `;

        const variables = {
          id: input.resourceId,
        };

        const { mutate, onDone, onError } = useMutation(mutation);

        onDone((data) => {
          console.log("Успешное удаление:", data.data);
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
