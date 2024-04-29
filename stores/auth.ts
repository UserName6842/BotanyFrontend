import type {AuthStore} from "~/stores/types";

export const useAuth = defineStore('Auth', {
    state: (): AuthStore => ({
        isLogin: false,
        userName: ""
    }),
    getters: {
        getIsLogin: (state) => state.isLogin,
    },
    actions: {
        setIsLogin(input: boolean){
            this.isLogin = input
        },

        async checkLogin() {
            const {getToken} = useApollo()
            const token = await getToken()
            this.isLogin = !!token
        }
    }
    }
)