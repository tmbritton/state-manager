export interface ISubscription {
    type: string;
    callback: ICallback;
    priority?: number;
}

export type ICallback = (payload: object) => void;
