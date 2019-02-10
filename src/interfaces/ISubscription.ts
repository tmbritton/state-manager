export interface ISubscription {
    callback: ICallback;
    priority: number;
}
// export type ISubscription = (type: string, callback: ICallback, priority: number);
export type ICallback = (payload: any) => void;
