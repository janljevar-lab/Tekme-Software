<template>
  <div>
    <h2>Seznam igralcev</h2>
    <SearchBar @filter="filtrirajIgralce" />
    <ul>
      <li
        v-for="igralec in filtriraniIgralci"
        :key="igralec._id"
        @click="izberiIgralca(igralec)"
        :class="{ selected: izbraniIgralci.map(i => i._id).includes(igralec._id) }"
      >
        {{ igralec.ime }} {{ igralec.priimek }}
      </li>
    </ul>
    <p>Igralec 1: {{ igralec1?.ime }} {{ igralec1?.priimek }}</p>
    <p>Igralec 2: {{ igralec2?.ime }} {{ igralec2?.priimek }}</p>
    <button v-if="igralec1 && igralec2" @click="modalOdprto = true">Dodaj tekmo</button>
    <PodatkiTekme 
      v-if="modalOdprto" 
      :igralec1="igralec1" 
      :igralec2="igralec2"
      @zapri="modalOdprto = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import SearchBar from "./SearchBar.vue";
import PodatkiTekme from "./PodatkiTekme.vue";

export default defineComponent({
  name: "SeznamIgralcev",
  components: { SearchBar, PodatkiTekme },
  setup() {
    const igralci = ref<any[]>([]);
    const searchQuery = ref("");
    const izbraniIgralci = ref<any[]>([]);
    const igralec1 = ref<any>(null);
    const igralec2 = ref<any>(null);
    const modalOdprto = ref(false);

    const naloziIgralce = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = res.data;
      } catch (err) { console.error(err); }
    };

    const filtriraniIgralci = computed(() => {
      if (!searchQuery.value) return igralci.value;
      return igralci.value.filter(i =>
        i.ime.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        i.priimek.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const filtrirajIgralce = (query: string) => { searchQuery.value = query; };

    const izberiIgralca = (igralec: any) => {
      const index = izbraniIgralci.value.findIndex(i => i._id === igralec._id);
      if (index !== -1) izbraniIgralci.value.splice(index, 1);
      else {
        if (izbraniIgralci.value.length === 2) izbraniIgralci.value.shift();
        izbraniIgralci.value.push(igralec);
      }
      igralec1.value = izbraniIgralci.value[0] || null;
      igralec2.value = izbraniIgralci.value[1] || null;
    };

    onMounted(naloziIgralce);

    return { filtriraniIgralci, filtrirajIgralce, izbraniIgralci, igralec1, igralec2, izberiIgralca, modalOdprto };
  }
});
</script>

<style>

</style>