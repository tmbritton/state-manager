import { PubSub } from "../pubsub/PubSub";
import { Store } from "../store/Store";

const initialState = {
  test: "Foo",
};

const mutations = {
  // Can't use arrow functions because of what it does to "this".
  test: function(payload) {
    this.test = payload.testString;
  },
};

const store = new Store(initialState, mutations);

test("Get State", () => {
  expect(store.getState().test).toBe("Foo");
});

test("Get Mutations", () => {
  expect(Object.keys(store.getMutations()).length).toBe(1);
});

test("Text Mutation", () => {
  const testPayload = {
    testString: "Bar",
  };
  store.commit("test", testPayload);
  expect(store.getState().test).toBe("Bar");
});

test("Commit publishes change", () => {
  const testPayload = {
    testString: "Baz",
  };

  PubSub.subscribe("test", (payload) => {
    expect(payload.test).toBe(testPayload.testString);
  });

  store.commit("test", testPayload);
});
