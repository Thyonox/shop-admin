<template>
    <div class="container">
        <el-card shadow="hover">
            <template #header>
                <div class="card-header">
                    <span>{{ title }}</span>
                    <el-tag type="danger" effect="plain">
                        {{ tip }}
                    </el-tag>
                </div>
            </template>
            <div class="card-body">
                <el-row :gutter="20">
                    <el-col :span="6" :offset="0" v-for="(item, index) in btns" :key="index">
                        <el-card shadow="hover">
                            <div class="card-body__body">
                                <span>{{ item.value }}</span>
                                <span>{{ item.label }}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div><!-- card body -->
        </el-card>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    tip: String,
    btns: Array,
})
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>