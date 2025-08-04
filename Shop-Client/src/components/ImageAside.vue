<template>
    <el-aside class="image-list-aside" v-loading="loading">
        <div class="top">
            <!-- 侧边图片分类列表项 -->
            <ImageAsideItem v-for="(item, index) in imageClassList" 
                            :key="index"
                            :active="activeId === item.id"
                            @edit="handleEdit(item)"
                            @delete="handleDelete(item.id)"
                            @click="handleChangeActive(item.id)">
                {{ item.name }}
            </ImageAsideItem>
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
    </el-aside>

    <!-- 对话框组件 -->
    <FormDialog :title="title" ref="formDialogRef" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000"></el-input-number>    
            </el-form-item>
        </el-form>
    </FormDialog>
</template>

<script setup>
import ImageAsideItem from '@/components/ImageAsideItem.vue';
import FormDialog from './FormDialog.vue';

import { getImageClassList, createImageClass, updateImageClass, deleteImageClass } from '@/api/image_class';
import { ref } from 'vue';
import { notify } from '@/utils/message';
import { computed } from 'vue';
import { reactive } from 'vue';

const imageClassList = ref([]);
const total = ref(0);
const currentPage = ref(1);
const limit = ref(10);
const activeId = ref(0);
const loading = ref(false);
const editId = ref(0);
const title = computed(() => editId.value ? '修改' : '新增');
const formDialogRef = ref(null);
const formRef = ref(null);
const form = reactive({ name: '', order: 50 });
const rules = { name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }] };

// 获取图片分类列表数据
function getData(page = null) {
    if (typeof page === 'number') {
        currentPage.value = page;
    }
    loading.value = true;
    getImageClassList(currentPage.value).then(res => {
        console.log(res);
        imageClassList.value = res.list;
        total.value = res.totalCount;
        // 默认选中列表第一项
        activeId.value = res.list?.[0].id || 0;
    }).finally(() => {
        loading.value = false;
    })
}

getData();

const handleChangeActive = (id) => {
    activeId.value = id;
}

// 提交表单数据
const handleSubmit = () => {
    formRef.value.validate(valid => {
        if (!valid) return;
        formDialogRef.value.showLoading();
        loading.value = true;
        const api = editId.value ? updateImageClass(editId.value, form) : createImageClass(form);
        api.then(() => {
            notify(editId.value ? '修改成功' : '新增成功');
            formDialogRef.value.close();
            getData();
        }).finally(() => {
            formDialogRef.value.hideLoading();
            loading.value = false;
        });
    });
}

// 新增分类
const handleCreate = () => {
    editId.value = 0;
    form.name = '';
    form.order = 50;
    formDialogRef.value.open();
}

// 修改分类
const handleEdit = (item) => {
    editId.value = item.id;
    form.name = item.name;
    form.order = item.order;
    formDialogRef.value.open();
}

// 删除分类
const handleDelete = (id) => {
    loading.value = true;
    deleteImageClass(id).then(() => {
        notify('删除成功');
        getData();
    }).finally(() => {
        loading.value = false;
    });
}

defineExpose({
    handleCreate
})
</script>

<style scoped>
.image-list-aside {
    width: 220px;
    position: relative;
}

.image-list-aside .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-list-aside .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>