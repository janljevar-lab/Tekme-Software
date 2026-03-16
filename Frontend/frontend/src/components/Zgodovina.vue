<template>
  <div>
    <h2>Zgodovina vseh tekem</h2>

    <ul>
      <li v-for="tekma in tekme" :key="tekma._id">
        {{ tekma.igralec1.ime }} {{ tekma.igralec1.priimek }}
        vs
        {{ tekma.igralec2.ime }} {{ tekma.igralec2.priimek }}
        - Rezultat: {{ tekma.rezultat1 }} : {{ tekma.rezultat2 }}
      </li>
    </ul>

    <p v-if="tekme.length === 0">Ni še nobene tekme.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Zgodovina",

  setup() {
    const tekme = ref<any[]>([]);

    const naloziTekme = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/tekme/");
        tekme.value = res.data;
      } catch (err) {
        console.error("Napaka pri nalaganju tekem:", err);
      }
    };

    onMounted(naloziTekme);

    return {
      tekme
    };
  }
});
</script>

<style scoped>
</style>