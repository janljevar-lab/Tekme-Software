<template>
  <div id="app">
    <h1>Glavni meni</h1>

    <div class="menu">
      <button 
        :class="{active: activeKomponent === 'igr'}"
        @click="izberiKomponent('igr')">
        Igralci
      </button>

      <button 
        :class="{active: activeKomponent === 'tek'}"
        @click="izberiKomponent('tek')">
        Tekme
      </button>

      <button 
        :class="{active: activeKomponent === 'stat'}"
        @click="izberiKomponent('stat')">
        Stats
      </button>
    </div>

    <hr>


    <component :is="aktivnaKomponenta" />
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Igralci from "./components/Igralci.vue";
import Tekme from "./components/Tekme.vue";
import Stats from "./components/Stats.vue";

export default defineComponent({
  name: "App",
  components: { Igralci, Tekme, Stats },

  setup() {

    const activeKomponent = ref('igr');

    const komponentMap: Record<string, any> = {
      'igr': Igralci,
      'tek': Tekme,
      'stat': Stats
    };

    const izberiKomponent = (k: string) => {
      activeKomponent.value = k;
    };

    const aktivnaKomponenta = computed(() => komponentMap[activeKomponent.value]);

    return {
      activeKomponent,
      izberiKomponent,
      aktivnaKomponenta
    };
  }
});
</script>

<style scoped>

</style>