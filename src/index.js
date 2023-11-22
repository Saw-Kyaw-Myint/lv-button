import HelloWorld from "./components/HelloWorld.vue";

export { HelloWorld };

export default {
  install: (app, options) => {
    app.component("HelloWorld", HelloWorld);
  },
};
