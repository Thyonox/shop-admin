<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="3" :offset="0" v-for="(item, index) in navList" :key="index">
                <el-card shadow="hover" @click="router.push(item.path)">
                    <div class="card-body">
                        <el-icon :size="16" :style="{ color: item.color }">
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </div>
                </el-card>

            </el-col>
        </el-row>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navList = [
    {
        icon: "user",
        color: "rgba(14, 165, 233)",
        title: "用户",
        path: "/user/list"
    },
    {
        icon: "shopping-cart",
        color: "rgba(139, 92, 246)",
        title: "商品",
        path: "/goods/list"
    },
    {
        icon: "tickets",
        color: "rgba(217, 70, 239)",
        title: "订单",
        path: "/order/list"
    },
    {
        icon: "chat-dot-square",
        color: "rgba(20, 184, 166)",
        title: "评价",
        path: "/comment/list"
    },
    {
        icon: "picture",
        color: "rgba(244, 63, 94)",
        title: "图库",
        path: "/image/list"
    },
    {
        icon: "bell",
        color: "rgba(16, 185, 129)",
        title: "公告",
        path: "/notice/list"
    },
    {
        icon: "set-up",
        color: "rgba(59, 130, 246)",
        title: "配置",
        path: "/setting/base"
    },
    {
        icon: "files",
        color: "rgba(245, 158, 11)",
        title: "优惠券",
        path: "/coupon/list"
    }
]
</script>

<style scoped>
.container {
    position: relative;
    margin-top: 20px;
}

.el-row {
    width: 100%;
}

.el-card {
    cursor: pointer;
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.card-body span {
    font-size: 14px;
}
</style>