export interface ICategoryRequest {
    name: string,
    label: string,
    parentId: number
}

export interface ICategoryCreation extends ICategoryRequest{
    createdAt: string
}

export interface ICategory extends ICategoryCreation{
    id: string
}

export interface ICategoryDB {
    id: string
    name: string,
    label: string,
    parent_id: number
    created_at: string
}