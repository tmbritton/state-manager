import { IPayload } from "../interfaces/IPayload";
import { ISubscription } from "../interfaces/ISubscription";

/**
 * Publish events with a payload.
 * Accept subscriptions with a callback.
 */
export class PubSub {

    private subscriptions: any[];

    constructor() {
        this.subscriptions = [];
    }

    /**
     * Subscribe to a published event.
     * @param subscription
     */
    public subscribe(subscription: ISubscription): PubSub {
        if (typeof subscription.priority !== "number") {
            subscription.priority = 0;
        }
        if (!this.subscriptions[subscription.type]) {
            this.subscriptions[subscription.type] = [];
        }
        this.subscriptions[subscription.type].push({
            callback: subscription.callback,
            priority: subscription.priority,
        });

        // Sort subscriptions by priority.
        this.subscriptions[subscription.type].sort((a, b) => {
            if (a.priority < b.priority) {
                return -1;
            }
            if (a.priority > b.priority) {
                return 1;
            }
            if (a.priority === b.priority) {
                return 0;
            }
        });

        return this;
    }

    public publish(type: string, payload: IPayload): void {
        if (this.subscriptions.hasOwnProperty(type)) {
            this.subscriptions[type].every((subscription) => subscription.callback(payload));
        } else {
            throw new Error("There are no subscriptions to type: " + type);
        }
    }

    public getSubscriptions(): ISubscription[] {
        return this.subscriptions;
    }

    public removeSubscription(type: string, index: number): PubSub {
        if (this.subscriptions[type]) {
            this.subscriptions[type].splice(index, 1);
        } else {
            throw new Error("There are no subscriptions of type: " + type);
        }
        return this;
    }
}
