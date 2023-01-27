export interface IRecoveryDataDB {
    id: number,
    user_id: number,
    value: string,
    created_at: string
}

export interface IRecoveryDataCreation {
    userId: number,
    value: string,
    createdAt: string
}

export interface IRecoveryData extends IRecoveryDataCreation {
    id: number
}