import { PubSub } from "../pubsub/PubSub";

test("Get subscriptions / subscribing", () => {
    const type = "test";
    const type2 = "test2";
    PubSub.subscribe(type, () => { return; });
    const subscriptions = PubSub.getSubscriptions();
    expect(subscriptions[type].length).toBe(1);
    PubSub.subscribe(type, () => { return; });
    expect(subscriptions[type].length).toBe(2);
    PubSub.subscribe(type2, () => { return; });
    expect(subscriptions[type2].length).toBe(1);
});

test("Publishing an event", () => {
    const type = "test";

    PubSub.subscribe(type, (payload) => {
        expect(payload.test).toBe(2);
    });

    PubSub.publish(type, {test: 2});
});

test("Removing a subscription", () => {
    const type = "test";
    const initialLength = PubSub.getSubscriptions()[type].length;

    PubSub.removeSubscription(type, 0);
    const newLength = PubSub.getSubscriptions()[type].length;

    expect(newLength).toBeLessThan(initialLength);
});
