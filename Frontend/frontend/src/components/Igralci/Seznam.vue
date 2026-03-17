<template>
  <div>
    <h2>Seznam igralcev</h2>

    <ul>
      <li v-for="Igralec in paginatedIgralci" :key="Igralec._id" @click="izberiIgralca(Igralec._id)" :class="{selected: izbranId === Igralec._id}">
        {{ Igralec.ime }} {{ Igralec.priimek }}
      </li>
    </ul>

    <div style="padding-left: 60%;">
      <button @click="prevPage" :disabled="page === 1"> &lt; </button>
      <span> {{ page }} / {{ totalPages }} </span>
      <button @click="nextPage" :disabled="page === totalPages"> &gt; </button>
    </div>

    <br>

    <button @click="izbrisiIgralca" style="position:sticky; bottom:5px; font-size: 30px;">
      Izbriši izbranega igralca
    </button>

    <p>
      Izbran ID: {{ izbranId }}
    </p>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Seznam",

  setup() {

    const igralci = ref<any[]>([]);
    const izbranId = ref<any>(0);

    const page = ref(1);
    const perPage = 20;

    const totalPages = computed(() => {
      return Math.ceil(igralci.value.length / perPage);
    });

    const paginatedIgralci = computed(() => {
      const start = (page.value - 1) * perPage;
      return igralci.value.slice(start, start + perPage);
    });

    const nextPage = () => {
      if(page.value < totalPages.value){
        page.value++;
      }
    };

    const prevPage = () => {
      if(page.value > 1){
        page.value--;
      }
    };

    const naloziIgralce = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = res.data;
      } catch (err) {
        console.error("Napaka pri nalaganju:", err);
      }
    };

    const izberiIgralca = (id:any) => {

      if(izbranId.value === id){
        izbranId.value = 0;
      }
      else{
        izbranId.value = id;
      }

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

    return {
      igralci,
      izbranId,
      izberiIgralca,
      izbrisiIgralca,
      page,
      totalPages,
      paginatedIgralci,
      nextPage,
      prevPage
    };

  }

});
</script>

<style scoped>

</style>