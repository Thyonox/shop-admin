import {ElMessageBox, ElNotification} from 'element-plus'

// 通知方法
export function notify(message, type='success', dangerouslyUseHTMLString=false){
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 2000
    })
}

// 确认方法
export function confirm(content, type='warning', title='提示'){
    // Promise 方法，return 出去
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        }
    )
}