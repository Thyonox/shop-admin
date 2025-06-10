<template>
  <div class="container">
    <el-row :gutter="20" class="el-row">
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover">
          <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
            <el-tag :type="item.unitColor" effect="plain">
              {{ item.unit }}
            </el-tag>
          </div>
          </template>
          <div class="card-body">
            {{ item.value }}
          </div>
          <el-divider />
          <div class="card-foot">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>

        </el-card>
        

      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getPanels, getGoodsAndOrders, getEcharts } from '@/api/index.js';
import { ref } from 'vue';

const panels = ref([]);
getPanels().then(res => {
  console.log(res);
  panels.value = res.panels;
})
</script>

<style scoped>
.container {
  position: relative;
}

.el-row {
  width: 100%;
}

.el-card {
  border: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

:deep(.el-card__header) {
  padding: 8px;
  background-color: #F9FAFB;
}

.card-body {
  font-size: 30px;
  font-weight: bold;
  color: #6b7280;
}

.card-foot {
  display: flex;
  justify-content: space-between;
  color: #6b7280;
  font-size: 14px;
}
</style>