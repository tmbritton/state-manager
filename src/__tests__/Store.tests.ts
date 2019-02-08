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

test("Text Mutation", () => {
  const testPayload = {
    testString: "balls",
  };
  store.commit("test", testPayload);
  expect(store.getState().test).toBe("balls");
});
