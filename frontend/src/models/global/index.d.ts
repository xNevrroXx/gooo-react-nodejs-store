import {ArraySchema, ArraySchemaConstructor} from "yup";

declare module "yup" {
    interface ArraySchema {
        unique(message?: string): ArraySchema
    }
}