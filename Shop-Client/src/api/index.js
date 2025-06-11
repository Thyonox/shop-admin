import instance from "@/utils/request.js";

// 获取统计面板数据
export function getPanels(){
    return instance.get('/admin/statistics1');
}

// 获取商品和订单数据
export function getGoodsAndOrders(){
    return instance.get('/admin/statistics2');
}

// 获取ECharts图表数据
export function getEcharts(type){
    return instance.get('/admin/statistics3?type=' + type);
}