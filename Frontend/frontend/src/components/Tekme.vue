<template>
  <div>
    <div style="display: flex;">
      
      <Seznam :igralci="igralci" @osvezi="naloziIgralce" />


    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Seznam from "./Tekme/Seznam2.vue";
import DodajTekmo from "./Tekme/SearchBar.vue";
import axios from "axios";

export default defineComponent({
  name: "Igralci",
  components: { Seznam, DodajTekmo},
  setup() {
    const igralci = ref<any[]>([]);

    const naloziIgralce = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = res.data;
      } catch (err) {
        console.error("Napaka pri nalaganju:", err);
      }
    };

    onMounted(naloziIgralce);

    return { igralci, naloziIgralce };
  }
});
</script>

<style scoped>
ul{
    color: red;
}
</style>