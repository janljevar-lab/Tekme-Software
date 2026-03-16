<template>
  <div>
    <div style="display: flex;">
      
      <Seznam :igralci="igralci" @osvezi="naloziIgralce" />

      
      <Dodajanje @osvezi="naloziIgralce" />

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Seznam from "./Igralci/Seznam.vue";
import Dodajanje from "./Igralci/Dodajanje.vue";
import axios from "axios";

export default defineComponent({
  name: "Igralci",
  components: { Seznam, Dodajanje },
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

</style>