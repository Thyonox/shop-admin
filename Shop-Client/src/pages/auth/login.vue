<template>
    <div class="body">
        <div :class="['container',{'active':isShow}]" id="container">
            <div class="form-container sign-in">
                <div class="form">
                    <h1>登陆账户</h1>
                    <div class="social-icons">
                        <a href="#"><i class="ri-google-fill"></i></a>
                        <a href="#"><i class="ri-wechat-fill"></i></a>
                        <a href="#"><i class="ri-facebook-circle-fill"></i></a>
                        <a href="#"><i class="ri-linkedin-box-fill"></i></a>
                    </div>
                    <span>或者使用邮箱密码登录</span>
                    <input type="email" placeholder="邮箱账号" v-model="formData.username">
                    <input type="password" placeholder="邮箱密码" v-model="formData.password">
                    <a href="#">忘记密码?</a>
                    <button @click="submit">登录</button>
                </div>
            </div>

            <div class="form-container sign-up">
                <div class="form">
                    <h1>创建账户</h1>
                    <div class="social-icons">
                        <a href="#"><i class="ri-google-fill"></i></a>
                        <a href="#"><i class="ri-wechat-fill"></i></a>
                        <a href="#"><i class="ri-facebook-circle-fill"></i></a>
                        <a href="#"><i class="ri-linkedin-box-fill"></i></a>
                    </div>
                    <span>或者使用邮箱密码注册</span>
                    <input type="text" placeholder="用户名">
                    <input type="email" placeholder="邮箱账号">
                    <input type="password" placeholder="邮箱密码">
                    <button>注册</button>
                </div>
            </div>

            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-left">
                        <h1>欢迎回来!</h1>
                        <p>登录以使用网站的全部功能</p>
                        <button class="btn" id="loginBtn" @click="isShow=false">登录</button>
                    </div>

                    <div class="toggle-panel toggle-right">
                        <h1>你好朋友!</h1>
                        <p>注册以使用网站的全部功能</p>
                        <button class="btn" id="registerBtn" @click="isShow=true">注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive, ref} from "vue";

// 登录注册状态切换
const isShow = ref(false);

// 表单数据
const formData = reactive({
  username: '',
  password: '',
})

const submit = () => {
  console.log(formData)
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'M PLUS 1p', sans-serif;
}

.body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to right, #a8edea, #fed6e3);
}

/* 父容器使用相对定位，子容器使用绝对定位 */
.container {
    background-color: #fff;
    border-radius: 40px;
    overflow: hidden;
    min-height: 480px;
    max-width: 100%;
    width: 768px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
}

.container p {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin: 20px 0;
}

.container span {
    font-size: 12px;
}

.container a {
    text-decoration: none;
    color: #333;
    font-size: 13px;
    margin: 15px 0 10px;
}

.container button {
    border-radius: 8px;
    background-color: #330867;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 45px;
    margin: 10px 0;
    cursor: pointer;
}

.container button.btn {
    background-color: transparent;
    border: 1px solid #fff;
}

.container .form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    background-color: #fff;
}

.container input {
    width: 100%;
    padding: 10px 15px;
    margin: 8px 0;
    background-color: #eee;
    border: none;
    outline: none;
    font-size: 13px;
}

.form-container {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    transition: all 0.6s ease-in-out;
    background-color: #fff;
}

.sign-in {
    left: 0;
    z-index: 2;
}

/* 使动画连贯 */
.container.active .sign-in {
    transform: translateX(100%);
    opacity: 0;
    z-index: 1;
    animation: signInMove 0.6s;
}

@keyframes signInMove {

    0%,
    49.99% {
        opacity: 1;
        z-index: 2;
    }

    50% {
        opacity: 0;
        z-index: 1;
    }
}

.sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
}

.container.active .sign-up {
    transform: translateX(100%);
    z-index: 2;
    opacity: 1;
    animation: signUpMove 0.6s;
}

@keyframes signUpMove {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50% {
        opacity: 1;
        z-index: 2;
    }
}

.social-icons {
    margin: 20px 0;
}

.social-icons a {
    border: 1px solid #ccc;
    border-radius: 20%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;
    font-size: 20px;
}

.social-icons a:hover {
    border-color: #9c9c9c;
}

.toggle-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, #30cfd0, #330867);
    overflow: hidden;
    z-index: 10000;
    border-radius: 150px 0 0 100px;
    transition: all 0.6s ease-in-out;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.35);
}

.container.active .toggle-container {
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.35);
}

.toggle {
    position: relative;
    height: 100%;
    width: 200%;
    left: -100%;
    overflow: hidden;
    color: #fff;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

/* 跟随父容器 toggle-container 的变化，确保覆盖整个容器 */
.container.active .toggle {
    transform: translateX(50%);
}

.toggle-panel {
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    text-align: center;
    transition: all 0.6s ease-in-out;
    transform: translateX(0);
}

.toggle-left {
    left: -50%;
    transform: translateX(0);
}

.container.active .toggle-left {
    transform: translateX(100%);
}

.toggle-right {
    right: 0;
    transform: translateX(0);
}

.container.active .toggle-right {
    transform: translateX(100%);
}
</style>