import HelloWorld from "./components/HelloWorld.vue";

export default {
  install: (app, options) => {
    app.component("HelloWorld", HelloWorld);
  },
};
