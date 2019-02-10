import { ISubscription } from "../interfaces/ISubscription";

/**
 * Publish events with a payload.
 * Accept subscriptions with a callback.
 */
export const PubSub = (() => {

    const subscriptions: ISubscription[] = [];
    const defaultPriority = 10;

    /**
     * Subscribe to a published event.
     * @param subscription
     */
    const subscribe = (subscription: ISubscription): void => {
        if (typeof subscription.priority !== "number") {
            subscription.priority = defaultPriority;
        }
        if (!subscriptions[subscription.type]) {
            subscriptions[subscription.type] = [];
        }
        subscriptions[subscription.type].push({
            callback: subscription.callback,
            priority: subscription.priority,
        });

        // Sort subscriptions by priority.
        subscriptions[subscription.type].sort((a, b) => {
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

    const publish = (type: string, payload: object): void => {
        if (subscriptions.hasOwnProperty(type)) {
            subscriptions[type].every((subscription) => subscription.callback(payload));
        }
    };

    const getSubscriptions = (): ISubscription[] => {
        return subscriptions;
    };

    const removeSubscription = (type: string, index: number) => {
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
