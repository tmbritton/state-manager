import { PubSub } from "./pubsub/PubSub";
import { Store } from "./store/Store";

export const StateManager = (() => {
  return {
    PubSub,
    Store,
  };
})();
