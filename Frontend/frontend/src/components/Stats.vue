<template>
  <div>
    <h2>Rezultati</h2>

    <ol>
      <li v-for="Igralec in sortedIgralci" :key="Igralec._id">
        {{ Igralec.ime }} {{ Igralec.priimek }} - {{ Igralec.točke }} pik
      </li>
    </ol>

  </div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Tekme",
  setup() {
    const igralci = ref<any[]>([]);
    const izbranId = ref<any>(0);

    const naloziIgralce = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = res.data;
      } catch (err) {
        console.error("Napaka pri nalaganju:", err);
      }
    };

    const izberiIgralca = (id: any) => {
      izbranId.value = izbranId.value === id ? 0 : id;
    };

    const izbrisiIgralca = async () => {
      if (izbranId.value === 0) {
        alert("Najprej izberi igralca");
        return;
      }
      try {
        const link = `http://localhost:6380/api/v1/igralci/igralci/${izbranId.value}`;
        await axios.delete(link);
        igralci.value = igralci.value.filter(i => i._id !== izbranId.value);
        izbranId.value = 0;
      } catch (err) {
        console.error("Napaka pri brisanju:", err);
      }
    };

    onMounted(naloziIgralce);


    const sortedIgralci = computed(() => {
      return [...igralci.value].sort((a, b) => b.točke - a.točke);
    });

    return { igralci, sortedIgralci, izbranId };
  }
});
</script>

<style scoped>
ul{
    color: green;
}
</style>