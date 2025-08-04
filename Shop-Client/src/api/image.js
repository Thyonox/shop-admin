import instance from "@/utils/request";

// 图片列表分页
export function getImageList(id, page = 1, limit = 12) {
  return instance.get(`/admin/image_class/${id}/image/${page}?limit=${limit}`)
}

// 重命名
export function updateImage(id, name) {
  return instance.post(`/admin/image/${id}`, {name})
}

// 删除
export function deleteImage(ids) {
  return instance.post(`/admin/image/delete_all`, {ids})
}

// 上传图片路径
export const uploadImageAction = import.meta.env.VITE_BASE_URL + "/admin/image/upload"