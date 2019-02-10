import { ICallback, ISubscription } from "../interfaces/ISubscription";

/**
 * Publish events with a payload.
 * Accept subscriptions with a callback.
 */
export const PubSub = (() => {

    const subscriptions = {};
    const defaultPriority = 10;

    /**
     * Subscribe to a published event.
     * @param subscription
     */
    const subscribe = (type: string, callback: ICallback, priority?: number): void => {
        const subscription: ISubscription = {
            callback,
            priority: defaultPriority,
        };
        if (typeof priority === "number") {
            subscription.priority = priority;
        }
        if (!subscriptions[type]) {
            subscriptions[type] = [];
        }
        subscriptions[type].push(subscription);

        // Sort subscriptions by priority.
        subscriptions[type].sort((a, b) => {
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
    };

    /**
     * Publish an event.
     * @param type Type of event.
     * @param payload
     */
    const publish = (type: string, payload: object): void => {
        if (subscriptions.hasOwnProperty(type)) {
            subscriptions[type].forEach((subscription) => subscription.callback(payload));
        }
    };

    /**
     * Return all subscriptions.
     */
    const getSubscriptions = () => {
        return subscriptions;
    };

    /**
     * Remove a subscription.
     * @param type Type of subscription.
     * @param index Index of subscription in type array.
     */
    const removeSubscription = (type: string, index: number): void => {
        if (subscriptions[type]) {
            subscriptions[type].splice(index, 1);
        } else {
            throw new Error("There are no subscriptions of type: " + type);
        }
    };

    return {
        getSubscriptions,
        publish,
        removeSubscription,
        subscribe,
    };
})();
