<template>
    <el-main class="image-list-main">
        <div class="top">
            <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">
            fenye
        </div>
    </el-main>
</template>

<script setup>

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


</style>