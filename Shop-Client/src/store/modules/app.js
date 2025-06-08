import {defineStore} from "pinia";
import {reactive, ref} from "vue";

const useAppStore = defineStore('app', () => {
    const asideWidth = ref('250px');

    return {
        asideWidth,
    }
})

export default useAppStore;