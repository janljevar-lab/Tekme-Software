<template>
  <div class="zgodovina-container">
    <h2>Vse Tekme</h2>
    <ul>
      <li v-for="tekma in obrnjeneTekme" :key="tekma._id">
        {{ tekma.igralec1 }} : {{ tekma.igralec2 }} - {{ tekma.datum }} - 
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
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchTekme = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get("http://localhost:6380/api/v1/tekme/all");
        tekme.value = response.data;
      } catch (err: any) {
        error.value = "Napaka pri pridobivanju tekem";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const obrnjeneTekme = computed(() => [...tekme.value].reverse());

    onMounted(fetchTekme);

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
  width: 98vw; /* zavzame celotno širino okna */
  box-sizing: border-box;
  padding: 12px 20px;
  margin-bottom: 2px;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  white-space: nowrap; /* prepreči prelom vrstice */
  overflow: hidden; /* skrije presežek, če je predolg */
  text-overflow: ellipsis; /* doda ... če tekst presega širino */
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