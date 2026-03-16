<template>
  <div>
    <h2>Seznam igralcev</h2>

    <!-- Search Bar -->
    <SearchBar @filter="filtrirajIgralce" />

    <ul>
      <li
        v-for="Igralec in filtriraniIgralci"
        :key="Igralec._id"
        @click="izberiIgralca(Igralec)"
        :class="{ selected: izbraniIgralci.map(i => i._id).includes(Igralec._id) }"
      >
        {{ Igralec.ime }} {{ Igralec.priimek }}
      </li>
    </ul>

    <br>

    <p>Igralec 1: {{ igralec1?.ime }} {{ igralec1?.priimek }}</p>
    <p>Igralec 2: {{ igralec2?.ime }} {{ igralec2?.priimek }}</p>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import SearchBar from "./SearchBar.vue";  // pravilno ime!

export default defineComponent({
  name: "SeznamIgralcev",
  components: { SearchBar },

  setup() {

    const igralci = ref<any[]>([]);
    const searchQuery = ref("");
    const izbraniIgralci = ref<any[]>([]);

    const igralec1 = ref<any>(null);
    const igralec2 = ref<any>(null);

    const naloziIgralce = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = res.data;
      } catch (err) {
        console.error("Napaka pri nalaganju:", err);
      }
    };

    const filtriraniIgralci = computed(() => {
      if (!searchQuery.value) return igralci.value;
      return igralci.value.filter(i =>
        i.ime.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        i.priimek.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const filtrirajIgralce = (query: string) => {
      searchQuery.value = query;
    };

    const izberiIgralca = (igralec:any) => {

      if (izbraniIgralci.value.find(i => i._id === igralec._id)) {
        izbraniIgralci.value = izbraniIgralci.value.filter(i => i._id !== igralec._id);
      } else {
        if (izbraniIgralci.value.length === 2) {
          izbraniIgralci.value.shift();
        }
        izbraniIgralci.value.push(igralec);
      }

      // Nastavimo igralec1 in igralec2
      igralec1.value = izbraniIgralci.value[0] || null;
      igralec2.value = izbraniIgralci.value[1] || null;
    };

    onMounted(naloziIgralce);

    return {
      filtriraniIgralci,
      filtrirajIgralce,
      izbraniIgralci,
      igralec1,
      igralec2,
      izberiIgralca
    };

  }

});
</script>

<style scoped>
li{
  cursor: pointer;
  padding: 5px;
}
.selected{
  background-color: lightblue;
}
</style>