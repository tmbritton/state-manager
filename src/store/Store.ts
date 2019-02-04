import { PubSub } from '../pubsub/PubSub';
import { IMutation } from '../interfaces/IMutation';
import { IPayload } from '../interfaces/IPayload';

export class Store {

    private state: Object;
    private mutations: Object;
    private pubsub: PubSub

    constructor(stateDefinition: Object, mutations: Object) {
        this.pubsub = new PubSub;
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
