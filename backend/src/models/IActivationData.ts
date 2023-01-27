export interface IActivationDataDB {
    id: number,
    user_id: number,
    activation_link: string,
    is_activated: 0 | 1,
    created_at: string
}

export interface IActivationDataCreation {
    userId: number,
    activationLink: string,
    isActivated: 0 | 1,
    createdAt: string
}

export interface IActivationData extends IActivationDataCreation {
    id: number
}