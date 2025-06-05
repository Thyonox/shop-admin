import NProgress from "nprogress";
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false});

export function showFullLoading(){
    NProgress.start()
}

export function hideFullLoading(){
    NProgress.done()
}
