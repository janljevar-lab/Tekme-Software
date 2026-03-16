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

      <div>
        <label for="drzava">Država:</label>
        <input type="text" id="drzava" v-model="država" />
      </div>

      <div>
        <label for="datum">Datum rojstva:</label>
        <input type="date" id="datum" v-model="datumRojstva" />
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
    const država = ref("");
    const datumRojstva = ref("");
    const sporocilo = ref("");

    const dodajIgralca = async () => {
      try {
        await axios.post(
          "http://localhost:6380/api/v1/igralci/registracijaIgralca",
          {
            ime: ime.value,
            priimek: priimek.value,
            drzava: država.value,
            datumRojstva: datumRojstva.value ? new Date(datumRojstva.value) : null
          }
        );

        // Po uspehu počisti polja in prikaži sporočilo
        ime.value = "";
        priimek.value = "";
        država.value = "";
        datumRojstva.value = "";
        sporocilo.value = "Igralec uspešno dodan!";

        // Opcijsko: osveži seznam igralcev
        window.location.reload();
      } catch (error: any) {
        console.error(error);
        sporocilo.value = "Napaka pri dodajanju igralca!";
      }
    };

    return {
      ime,
      priimek,
      država,
      datumRojstva,
      sporocilo,
      dodajIgralca
    };
  }
});
</script>

<style scoped>
</style>