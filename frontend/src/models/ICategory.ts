export interface ICategoryCreation {
    name: string,
    label: string,
    parentId: number
}
export interface ICategory extends ICategoryCreation{
    id: number,
    createdAt: string
}