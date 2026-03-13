<template>
  <div>

    <h2>Seznam igralcev</h2>

    <ul>
        <li v-for="item in igralci" :key="item.idNumber" @click="odstraniIgralca(item.idNumber)" style="cursor: pointer;">

            {{ item.ime }} {{ item.priimek }}

        </li>
    </ul>
    
  </div>
</template>


<script lang="ts">

import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";


export default defineComponent({
  name: "Seznam",

  setup() {
    const igralci = ref<Array<{ ime: string; priimek: string; idNumber: string }>>([]);


    const naloziIgralce = async () => {
      try {
        const response = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = response.data;
      } catch (error) {
        console.error("Napaka pri nalaganju igralcev:", error);
      }
    };


    const odstraniIgralca = async (idNumber: string) => {
      try {
        // Pošlji request na backend za trajno brisanje
        await axios.delete(`http://localhost:6380/api/v1/igralci/${idNumber}`);
        
        // Odstrani iz frontend seznama
        igralci.value = igralci.value.filter(i => i.idNumber !== idNumber);
      } catch (error) {
        console.error("Napaka pri brisanju igralca:", error);
      }
    };


    onMounted(() => {
      naloziIgralce();
    });


    return {
      igralci,
      odstraniIgralca,
    };
  },
});

</script>


<style scoped>

</style>