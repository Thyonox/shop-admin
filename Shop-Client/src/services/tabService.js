import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { ref } from "vue";

export function useTabList() {
    const router = useRouter();
    const route = useRoute();
    const cookies = useCookies();
    const activeTab = ref(route.path);
    const tabList = ref([
        {
            title: '主控台',
            path: '/',
        }
    ]);

    // 添加Tab
    function addTab(tab) {
        // 判断是否为新Tab
        const hasNewTab = tabList.value.findIndex(item => item.path === tab.path) === -1;
        // 如果为新Tab，添加进tabList
        if (hasNewTab) {
            tabList.value.push(tab);
        }
        // 存入更新cookie，保证tabList的持久化
        cookies.set('tabList', tabList.value);
    }

    // 初始化tabList，
    function initTabList() {
        // 从cookie中获取tabList
        const savedTabs = cookies.get('tabList');
        // 如果cookie中有tabList，且是数组，则赋值给tabList
        if (savedTabs && Array.isArray(savedTabs)) {
            tabList.value = savedTabs;
        }
    }

    initTabList();

    // 监听路由变化
    onBeforeRouteUpdate((to) => {
        activeTab.value = to.path;
        addTab({
            title: to.meta.title || '新标签',
            path: to.path
        })
    })

    // 切换Tab，@change-tab事件传入tab的name值
    function changeTab(tabName) {
        // 路由跳转到对应的Tab
        activeTab.value = tabName;
        // 跳转路由
        router.push(tabName);
    }

    // 移除tab
    function removeTab(tabName) {
        let tabs = tabList.value;
        let active = activeTab.value;

        // 如果移除的tab为当前激活的tab，则需要切换到其他tab
        if (tabName === active) {
            tabs.forEach((tab, Index) => {
                if (tab.path === tabName) {
                    const nextTab = tabs[Index + 1] || tabs[Index - 1];
                    if (nextTab) {
                        active = nextTab.path;
                        router.push(active);
                    }
                }
            })
        }
        activeTab.value = active;
        tabList.value = tabs.filter(tab => tab.path !== tabName);
        cookies.set('tabList', tabList.value);
    }

    // 下拉菜单关闭函数
    const handleClose = (commard) => {
        switch (commard) {
            case 'closeOther':
                // 关闭其他Tab
                tabList.value = tabList.value.filter(tab => tab.path === '/' || tab.path ===activeTab.value);
                break;
            case 'closeAll':
                // 关闭所有Tab
                activeTab.value = '/';
                router.push('/');
                tabList.value = tabList.value.filter(tab => tab.path === '/');
                break;
            default:
                break;
        }
        cookies.set('tabList', tabList.value);
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    };
}