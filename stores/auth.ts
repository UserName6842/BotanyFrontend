import type {AuthStore} from "~/stores/types";

export const useAuth = defineStore('Auth', {
    state: (): AuthStore => ({
        isLogin: false,
        userName: ""
    }),
    getters: {
        getIsLogin: (state) => state.isLogin,
        getUser: (state) => state.user,
    },
    actions: {
        setIsLogin(input: boolean){
            this.isLogin = input
        },

        async checkLogin() {
            const {getToken} = useApollo()
            const token = await getToken()
            this.isLogin = !!token
        },

        async getMe() {
            const query = gql`
                query getMe{
                   userQuery{
                    getMe{
                      name
                      role
                    }
                  }
                }
               `
            try {
                const {onResult} = useQuery(query, {}, {fetchPolicy: "network-only"});
                // Проверяем, есть ли уже данные в результате запроса

                onResult((param) => {
                    this.user = param.data.userQuery.getMe;

                })

            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }
    }
    }
)