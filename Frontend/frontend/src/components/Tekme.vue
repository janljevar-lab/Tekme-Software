<template>
  <div>
    <h2>Seznam tekem</h2>

    <ul>
      <li v-for="Igralec in igralci" :key="Igralec._id">
        {{ Igralec.ime }} {{ Igralec.priimek }}
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
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

    const izberiIgralca = (id:any) => {
      izbranId.value = izbranId.value === id ? 0 : id;
    };

    const izbrisiIgralca = async () => {
      if(izbranId.value === 0){
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

    return { igralci, izbranId, izberiIgralca, izbrisiIgralca };
  }
});
</script>

<style scoped>
ul{
    color: red;
}
</style>