import { ElNotification } from 'element-plus'

// 通知方法
export function notify(message, type='success', dangerouslyUseHTMLString=false){
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 2000
    })
}