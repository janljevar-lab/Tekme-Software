<template>
  <div id="app">
    <h1>Športni site</h1>

    <Dodajanje/>

    <Seznam />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Seznam from "./components/Seznam.vue";
import Dodajanje from "./components/Dodajanje.vue";

export default defineComponent({
  name: "App",
  components: {
    Seznam,
    Dodajanje,

  },
});
</script>

<style>
#app {
  font-family: Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
  margin-top: 60px;
}
</style>