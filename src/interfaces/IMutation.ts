import { IPayload } from "./IPayload";

export interface IMutation {
    (state: object, payload: IPayload): void;
}