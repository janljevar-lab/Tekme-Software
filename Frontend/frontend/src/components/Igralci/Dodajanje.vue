<template>
  <div class="dodajanje-container">
    <h2>Dodaj novega igralca</h2>

    <form @submit.prevent="dodajIgralca" class="dodajanje-form">

      <div class="form-group">
        <label for="ime">Ime:</label>
        <input type="text" id="ime" v-model="ime" required />
      </div>

      <div class="form-group">
        <label for="priimek">Priimek:</label>
        <input type="text" id="priimek" v-model="priimek" required />
      </div>

      <div class="form-group">
        <label for="drzava">Država:</label>
        <input type="text" id="drzava" v-model="država" />
      </div>

      <div class="form-group">
        <label for="datum">Datum rojstva:</label>
        <input type="date" id="datum" v-model="datumRojstva" />
      </div>

      <button type="submit">Dodaj</button>
    </form>

    <p class="sporocilo" v-if="sporocilo">{{ sporocilo }}</p>
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
        ime.value = "";
        priimek.value = "";
        država.value = "";
        datumRojstva.value = "";
        sporocilo.value = "Igralec uspešno dodan!";
        window.location.reload();
      } catch (error: any) {
        console.error(error);
        sporocilo.value = "Napaka pri dodajanju igralca!";
      }
    };

    return { ime, priimek, država, datumRojstva, sporocilo, dodajIgralca };
  }
});
</script>

<style scoped>

input{
  width: 100%;
  padding: 10px 12px;
  margin: 6px 0 12px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.dodajanje-container {
  position: sticky;
  top: 40px;
  width: 500px;
  max-height: 600px;
  margin: 40px auto;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.dodajanje-form .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  height: 100px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #2196f3;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #14c17c;
}


</style>