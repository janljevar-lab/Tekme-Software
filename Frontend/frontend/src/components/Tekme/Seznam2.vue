<template>
  <div>
    <h2>Seznam igralcev</h2>
    <SearchBar @filter="filtrirajIgralce" />
    <ul>
      <li v-for="igralec in filtriraniIgralci" :key="igralec._id" @click="izberiIgralca(igralec)" :class="{ selected: izbraniIgralci.map(i => i._id).includes(igralec._id) }">
        {{ igralec.ime }} {{ igralec.priimek }}
      </li>
    </ul>
    <p>Igralec 1: {{ igralec1?.ime }} {{ igralec1?.priimek }}</p>
    <p>Igralec 2: {{ igralec2?.ime }} {{ igralec2?.priimek }}</p>
    <button v-if="igralec1 && igralec2" @click="modalOdprto = true" style="position:sticky; bottom: 5px;">Dodaj tekmo</button>
    <PodatkiTekme v-if="modalOdprto" :igralec1="igralec1" :igralec2="igralec2" @zapri="modalOdprto = false"/>
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

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-width: 400px;
}

li {
  font-size: 150%;
  padding: 10px 15px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}


li:hover {
  background-color: #f0f0f0;
}

.selected {
  background-color: #66a269;
  color: rgb(85, 85, 85);
  font-weight: bold;
}

.selected:hover{
  background-color: #687a69;
  color: rgb(85, 85, 85);
}

h2 {
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

p {
  margin: 5px 0;
  font-family: Arial, sans-serif;
}

button {
  font-size: 35px;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1976d2;
}
</style>