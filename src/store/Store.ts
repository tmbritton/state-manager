import { IMutation } from "../interfaces/IMutation";
import { IPayload } from "../interfaces/IPayload";
import { PubSub } from "../pubsub/PubSub";

export class Store {

    private state: object;
    private mutations: object;
    private pubsub: PubSub;

    constructor(stateDefinition: object, mutations: object) {
        this.pubsub = new PubSub();
        this.state = stateDefinition;
        this.mutations = mutations;
    }

    public getState() {
        return this.state;
    }

    public addMutation(type: string, callable: IMutation) {
        this.mutations[type] = callable;
    }

    public commit(type: string, payload: IPayload) {
        this.mutations[type](payload);
        this.pubsub.publish(type, {payload: this.state});
    }
}
