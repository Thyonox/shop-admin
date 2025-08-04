<template>
    <el-main class="image-list-main" v-loading="loading">
        <div class="top">
            <!-- 图片展示 -->
            <el-row :gutter="20">
                <el-col :span="6" v-for="(image, index) in imageList" :key="index">
                    <el-card shadow="hover" class="image-item-card">
                        <el-image :src="image.url" 
                                  fit="cover"
                                  :preview-src-list="imageListPreview"
                                  :initial-index="index"
                                  class="image-item">
                        </el-image>
                        <div class="image-title">{{ image.name }}</div>
                        <div class="buttons">
                            <el-button type="primary" text size="small" @click="handleEdit(item)">重命名</el-button>
                            <el-button type="primary" text size="small" @click="handleDelete(item)">删除</el-button>
                        </div>
                    </el-card>      
                </el-col>
            </el-row>    
        </div>
        <div class="bottom">
            <!-- 分页按钮 -->
            <el-pagination @current-change="getData" 
                           :current-page="currentPage"
                           :page-size="limit"  
                           layout="prev, next"
                           :total="total"   
                           background>
            </el-pagination>
        </div>
    </el-main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { getImageList, updateImage, deleteImage } from '@/api/image';

const currentPage = ref(1);
const limit = ref(12);
const total = ref(0);
const imageClassId = ref(0);
const imageList = ref([]);
const loading = ref(false);
const imageListPreview = computed(() => imageList.value.map(image => image.url));

function getData(page = null) {
    if (typeof page === 'number') {
        currentPage.value = page;
    }
    loading.value = true;
    getImageList(imageClassId.value, currentPage.value, limit.value).then(res => {
        console.log(res);
        imageList.value = res.list;
        total.value = res.totalCount;
        
    }).finally(() => {
        loading.value = false;
    })
}

const loadData = (classId) => {
    imageClassId.value = classId;
    currentPage.value = 1;
    getData();
}

defineExpose({
    loadData
});
</script>

<style scoped>
.image-list-main {
    position: relative;
}

.image-list-main .top  {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0px 10px;
}

.image-list-main .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-item {
    height: 163px;
    width: 100%;
}

:deep(.el-card__body) {
    padding: 0px;
}

.image-item-card {
    margin-bottom: 20px;
    position: relative;
}

.image-title {
    position: absolute;
    top: 143px;
    left: 0px;
    right: 0px;
    background-color: #333333;
    opacity: 0.6;
    color: #fff;
    font-size: 14px;
    border-radius: 3px;
    padding: 0 10px;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>