import {confirm, notify} from "@/utils/message.js";
import {logout,changePassword} from "@/api/manager.js";
import {removeToken} from "@/utils/auth.js";
import useUserStore from "@/store/modules/user.js";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";

// 退出登录逻辑
export function useLogout(){
    const router = useRouter();
    const userStore = useUserStore();
    function handleLogout() {
        confirm('是否要退出登录？').then(() => {
            logout().finally(() => {
                // 移除 Token
                removeToken();
                // 清理状态
                userStore.user = {};
                // 跳转登录页
                router.push("/login");
                // 提示
                notify('退出成功')
            })
        }).catch(() => {})
    }
    return {handleLogout};
}

// 更改密码逻辑
export function useRePassword(){
    const router = useRouter();
    const userStore = useUserStore();

    // 是否展示修改密码对话框
    const isShowDialog = ref(false);

    // 表单数据
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: '',
    })

    // 表单数据校验规则
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }

    //表单引用
    const formRef = ref(null);

    const onSubmit = () => {
        console.log(form)
        formRef.value.validate((valid) => {
            if (!valid) return;
            // 数据校验通过，执行修改密码方法
            changePassword(form).then(res => {
                // 移除 Token
                removeToken();
                // 清理状态
                userStore.user = {};
                // 跳转登录页
                router.push("/login");
                // 提示
                notify('密码修改成功，请重新登录');
            })
        })
    }

    return {isShowDialog, form,rules,formRef,onSubmit};
}