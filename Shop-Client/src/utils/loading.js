import NProgress from "nprogress";
// 使用自定义的 NProgress 的 CSS 文件
import '@/assets/style/nprogress.css';
import {useNProgress} from "@vueuse/integrations/useNProgress";

// 使用 useNProgress 对 NProgress 进行响应式包装
const {isLoading, progress} = useNProgress();

// 取消右上角加载圈
NProgress.configure({showSpinner: false});

// 全局 Loading 切换方法
export function toggleFullLoading(){
    isLoading.value = !isLoading.value;
}