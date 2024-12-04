// types.ts
export interface MenuItem {
    id: string;
    name: string;
    price: number;
    description?: string; // 可选字段
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string; // 错误或其他信息
}
