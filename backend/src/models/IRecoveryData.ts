export interface IRecoveryDataDB {
    id: number,
    user_id: number,
    value: string,
    is_used: 0 | 1,
    created_at: string
}

export interface IRecoveryDataCreation {
    userId: number,
    value: string,
    createdAt: string
}

export interface IRecoveryData extends IRecoveryDataCreation {
    id: number,
    isUsed: 0 | 1,
}