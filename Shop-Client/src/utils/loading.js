import NProgress from "nprogress";
// import 'nprogress/nprogress.css';
// 使用自定义的 NProgress 的 CSS 文件
import '@/assets/style/nprogress.css';

// 取消右上角加载圈
NProgress.configure({showSpinner: false});

// 开启全局 Loading 进度条
export function showFullLoading(){
    NProgress.start();
}

// 关闭全局 Loading 进度条
export function hideFullLoading(){
    NProgress.done();
}