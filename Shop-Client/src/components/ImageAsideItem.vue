<template>
    <div class="aside-item" :class="{ 'active': active }">
        <p>
            <slot />
        </p>
        <div class="buttons">
            <el-button text type="primary" size="small" @click="$emit('edit')">
                <el-icon :size="16">
                    <Edit />
                </el-icon>
            </el-button>
            <el-popconfirm title="确定删除该分类吗？"
                           confirmButtonText="确定"
                           cancelButtonText="取消"
                           @confirm="$emit('delete')">
                <template #reference>
                    <el-button class="button-close" text type="primary" size="small">
                        <el-icon :size="16">
                            <Close />
                        </el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
        </div>  
    </div>
</template>

<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

defineEmits([
    'edit', 
    'delete'
])
</script>

<style scoped>
.aside-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    cursor: pointer;
}

.aside-item:hover,
.aside-item.active{
    background-color: #eff6ff;
}

.aside-item p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.aside-item .buttons {
    display: flex;
    align-items: center;
}

.buttons .button-close {
    margin: 0;
}
</style>