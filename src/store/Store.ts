import { IMutation } from "../interfaces/IMutation";
import { PubSub } from "../pubsub/PubSub";

export class Store {

    private state: any;
    private mutations: object;

    constructor(stateDefinition: object, mutations: object) {
        this.state = stateDefinition;
        this.mutations = mutations;
    }

    public getState() {
        return this.state;
    }

    public getMutations(): object {
        return this.mutations;
    }

    public addMutation(type: string, callable: IMutation) {
        this.mutations[type] = callable;
    }

    public commit(type: string, payload: object) {
        this.mutations[type].call(this.state, payload);
        PubSub.publish(type, this.state);
    }
}
