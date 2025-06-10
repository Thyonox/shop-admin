<template>
    <div class="container" :style="{ left: appStore.asideWidth }">
        <!-- 标签页 -->
        <el-tabs v-model="activeTab" type="card" tab-position="top" @tab-change="changeTab" @tab-remove="removeTab" class="el-tabs">
            <el-tab-pane v-for="item in tabList" :closable="item.path !== '/'" :key="item.path" :label="item.title"
                :name="item.path">

            </el-tab-pane>
        </el-tabs>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleClose" class="el-dropdown" trigger="click">
            <div class="el-dropdown-link">
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
                    <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { useTabList } from '@/services/tabService.js';
import useAppStore from '@/store/modules/app.js';

const appStore = useAppStore();
const { activeTab, tabList, changeTab, removeTab, handleClose} = useTabList();
</script>

<style scoped>
.container {
    display: flex;
    align-items: flex-start;
    position: fixed;
    top: 64px;
    right: 0;
    height: 44px;
    background-color: #F3F4F6;
    padding: 0 10px 0 20px;
    z-index: 1000;
}

/* 需要为 el-tabs 设置宽度才能进行tab滚动 */
.el-tabs {
    min-width: 100px;
}

:deep(.el-tabs__nav-prev),
:deep(.el-tabs__nav-next) {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 滚动条末尾不能点击 */
:deep(.is-disabled) {
    cursor: not-allowed;
    color: #c4b7b7;
}

:deep(.el-tabs__header){
    margin: 0;
    border: none;
    align-items: flex-start;
}

:deep(.el-tabs__nav){
    border: none !important;
    gap: 10px;
}

:deep(.el-tabs__item) {
    border: none !important;
    background-color: #fff;
    height: 32px;
    border-radius: 5px;
}

.el-dropdown {
    margin-left: auto;
    height: 32px;
    width: 32px;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.el-dropdown .el-dropdown-link {
    outline: none;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-dropdown .el-dropdown-link .el-icon--right {
    margin: 0;
}

</style>