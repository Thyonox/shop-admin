import {defineStore} from "pinia";
import {reactive} from "vue";

const useUserStore = defineStore('user', () => {
    const user = reactive({});

    return {
        user,
    }
})

export default useUserStore;