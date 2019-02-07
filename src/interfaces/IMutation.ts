import { IPayload } from "./IPayload";

export type IMutation = (state: object, payload: IPayload) => void;
