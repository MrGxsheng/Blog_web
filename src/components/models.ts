export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

// 后端服务器地址 todo 记住这里，回头上这里找来
export const BASE_URL = 'http://8.130.26.187:8080';
