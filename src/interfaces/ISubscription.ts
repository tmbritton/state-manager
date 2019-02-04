export interface ISubscription {
    type: string,
    callback: Function
    priority?: number
}

export interface ICallback {
    (payload: object): void;
}
