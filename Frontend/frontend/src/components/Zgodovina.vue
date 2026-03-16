<template>
  <div>
    <h2>Vse Tekme</h2>
    <ul>
      <li v-for="tekma in tekme" :key="tekma._id">
        {{ tekma.igralec1 }} : {{ tekma.igralec2 }} - {{ tekma.datum }}
      </li>
    </ul>
    <p v-if="loading">Nalaganje...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
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
        tekme.value = response.data; // predpostavimo, da API vrne array z igralec1, igralec2, datum
      } catch (err: any) {
        error.value = "Napaka pri pridobivanju tekem";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchTekme);

    return {
      tekme,
      loading,
      error,
    };
  },
});
</script>