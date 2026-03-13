<template>
  <div>

    <h2>Dodaj novega igralca</h2>

    <form @submit.prevent="dodajIgralca">

      <div>
        <label for="ime">Ime:</label>
        <input type="text" id="ime" v-model="ime" required />
      </div>


      <div>
        <label for="priimek">Priimek:</label>
        <input type="text" id="priimek" v-model="priimek" required />
      </div>

      <button type="submit">Dodaj</button>
    </form>

    <p v-if="sporocilo">{{ sporocilo }}</p>

  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Dodajanje",

  setup() {
    const ime = ref("");
    const priimek = ref("");
    const sporocilo = ref("");

    const dodajIgralca = async () => {
  try {
    await axios.post(
      "http://localhost:6380/api/v1/igralci/registracijaIgralca",
      { ime: ime.value, priimek: priimek.value }
    );

    ime.value = "";
    priimek.value = "";

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

    return {
      ime,
      priimek,
      sporocilo,
      dodajIgralca,
    };
  },
});
</script>

<style scoped>

</style>