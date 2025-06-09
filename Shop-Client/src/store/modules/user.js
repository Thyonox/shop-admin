import {defineStore} from "pinia";
import {computed, reactive} from "vue";

const useUserStore = defineStore('user', () => {
    // 后端返回的用户信息
    const user = reactive({});

    // 用户信息中的菜单数组（Pinia先初始化，不能使用computed）
    const menus = reactive([]);

    return {
        user,
        menus
    }
})

export default useUserStore;