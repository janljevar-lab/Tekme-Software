<template>
  <div class="zgodovina-container">
    <h2>Vse Tekme</h2>
    <ul>
      <li v-for="tekma in obrnjeneTekme" :key="tekma._id">
        {{ tekma.igralec1Ime }} : {{ tekma.igralec2Ime }} - {{ tekma.datum }} : {{ tekma.rezultat1 }} - {{ tekma.rezultat2 }}
      </li>
    </ul>
    <p v-if="loading">Nalaganje...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";


export default defineComponent({
  name: "Zgodovina",
  setup() {
    const tekme = ref<any[]>([]);
    const igralciMap = ref<Map<string, string>>(new Map());
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Naloži vse igralce in ustvari map id -> ime
    const fetchIgralci = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        res.data.forEach((i: any) => {
          igralciMap.value.set(i._id, `${i.ime} ${i.priimek}`);
        });
      } catch (err) {
        console.error("Napaka pri nalaganju igralcev", err);
      }
    };

    // Naloži vse tekme
    const fetchTekme = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get("http://localhost:6380/api/v1/tekme/all");
        tekme.value = response.data.map((t: any) => ({
          ...t,
          igralec1Ime: igralciMap.value.get(t.igralec1) || t.igralec1,
          igralec2Ime: igralciMap.value.get(t.igralec2) || t.igralec2
        }));
      } catch (err: any) {
        error.value = "Napaka pri pridobivanju tekem";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await fetchIgralci();
      await fetchTekme();
    });

    const obrnjeneTekme = computed(() => [...tekme.value].reverse());

    return { tekme, loading, error, obrnjeneTekme };
  },
});
</script>

<style>
.zgodovina-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  width: 97vw;
  box-sizing: border-box;
  padding: 12px 20px;
  margin-bottom: 2px;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
}

li:hover {
  background-color: #e0f7fa;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}
</style>