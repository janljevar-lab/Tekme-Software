<template>
  <div id="app">
    <h1> <img src="./assets/logo.png" alt="logo" height="50px"> Sports-Software</h1>

    <div class="nav">
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

      <button 
        :class="{active: activeKomponent === 'stat'}"
        @click="izberiKomponent('zgo')">
        Zgodovina
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
import Zgodovina from "./components/Zgodovina.vue";


export default defineComponent({
  
  name: "App",
  components: { Igralci, Tekme, Stats },


  setup() {

    const activeKomponent = ref('igr');

    const komponentMap: Record<string, any> = {
      'igr': Igralci,
      'tek': Tekme,
      'stat': Stats,
      'zgo' : Zgodovina
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


<style>

h1{
  font-family: "Times New Roman", Times, serif;
}


.nav {
  border-radius: 6px;
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  background-color: #5883b8;
}


.nav button {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  background-color: #2b4753;
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}


.nav button:hover {
  background-color: #b2d7f5;
}


.nav button:active {
  transform: scale(0.96);
}



body{
  background-color: #e4f4ff;
}


</style>