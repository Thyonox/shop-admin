<template>
    <div class="index-card-container">
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
                        <el-card shadow="hover" class="index-card-item">
                            <div class="card-body__body">
                                <span class="index-card-item-title">{{ item.value }}</span>
                                <span class="index-card-item-label">{{ item.label }}</span>
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
.index-card-container {
    margin-top: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.index-card-item {
    border: none;
    background-color: #f5f5f5;
}

.card-body__body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.index-card-item-title {
    font-size: 20px;
}

.index-card-item-label {
    font-size: 12px;
    color: #999;
}

</style>