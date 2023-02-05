import mysql from "mysql";
// own modules
import dbPool from "./index";
// types
import {MysqlError, PoolConnection} from "mysql";
import {ICategory, ICategoryCreation, ICategoryDB} from "../models/ICategory";
import {ICategoryTree} from "../models/ICategoryTree";

type TArgumentFindCategory = {
    id: number,
    name?: never
} | {
    id?: never,
    name: string
}

class CategoryActions {
    createTree(categories: ICategory[]): ICategoryTree[] {
        const tree: ICategoryTree[] = [];

        for (let i = 0, length = categories.length; i < length; i++) {
            const category = categories[i];

            if (category.parentId == 0) {
                tree.push({...category, children: []});
            }
            else {
                let j = 0;
                let parentBranch: false | ICategoryTree = false;
                do {
                    parentBranch = findParentDeeper(tree[j], category.parentId);
                    if(parentBranch) {
                        parentBranch.children.push({...category, children: []})
                    }
                    j++;
                } while(parentBranch == false);
            }
        }
        return tree;

        function findParentDeeper(tree: ICategoryTree, targetParentId: ICategoryTree["id"]): ICategoryTree | false {
            if (tree.id === targetParentId) {
                return tree;
            }

            for (let i = 0; i < tree.children.length; i++) {
                const someBranch = tree.children[i];

                if(someBranch.id == targetParentId) {
                    return someBranch;
                }

                if(someBranch.children.length > 0) {
                    const parentBranch = findParentDeeper(someBranch, targetParentId);
                    if (parentBranch) {
                        return parentBranch;
                    }
                }
            }

            return false;
        }
    }
    normalization({name, label, id, created_at, parent_id}: ICategoryDB): ICategory {
        return {
            name,
            label,
            id,
            createdAt: created_at,
            parentId: parent_id
        }
    }
    async create ({name, parentId, createdAt, label}: ICategoryCreation) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const createSQLString = "INSERT INTO product_category (name, parent_id, created_at, label) VALUES (?, ?, ?, ?)";
                const createSQLQuery = mysql.format(createSQLString, [name, parentId, createdAt, label]);

                connection.query(createSQLQuery, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }
    async find ({id, name}: TArgumentFindCategory): Promise<ICategoryDB> {
        return new Promise<ICategoryDB>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findSQLString = "SELECT * FROM product_category WHERE ";
                if(id) {
                    findSQLString += `id = "${id}"`;
                }
                else if(name) {
                    findSQLString += `name = "${name}"`;
                }
 
                connection.query(findSQLString, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve(result[0]);
                })
            })
        })
    }

    async findAll (): Promise<ICategoryDB[]> {
        return new Promise<ICategoryDB[]>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const findSQLString = "SELECT * FROM product_category";

                connection.query(findSQLString, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }
}

export default new CategoryActions();