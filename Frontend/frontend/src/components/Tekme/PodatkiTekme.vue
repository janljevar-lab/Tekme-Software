<template>
  <div class="overlay">
    <div class="modal">
      <h2>Podatki tekme</h2>
      <p>Igralec 1: {{ igralec1.ime }} {{ igralec1.priimek }}</p>
      <input type="number" v-model="rezultat1" placeholder="Rezultat igralca 1" />
      <p>Igralec 2: {{ igralec2.ime }} {{ igralec2.priimek }}</p>
      <input type="number" v-model="rezultat2" placeholder="Rezultat igralca 2" />
      <div>
        <button @click="$emit('zapri')">Zapri</button>
        <button @click="shraniTekmo">Shrani</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "PodatkiTekme",
  props: { igralec1: { type: Object, required: true }, igralec2: { type: Object, required: true } },
  setup(props, { emit }) {
    const rezultat1 = ref<number | null>(null);
    const rezultat2 = ref<number | null>(null);

    const shraniTekmo = async () => {
      if (rezultat1.value === null || rezultat2.value === null) {
        alert("Vnesi rezultate obeh igralcev!");
        return;
      }

      try {
        await axios.post("http://localhost:6380/api/v1/tekme/create", {
          igralec1: props.igralec1._id,
          rezultat1: rezultat1.value,
          igralec2: props.igralec2._id,
          rezultat2: rezultat2.value
        });

if (rezultat1.value > rezultat2.value) {

    await axios.put(`http://localhost:6380/api/v1/igralci/igralci/${props.igralec1._id}`,{
        točke: 21,
    });

    await axios.put(`http://localhost:6380/api/v1/igralci/igralci/${props.igralec2._id}`,{
        točke: 21 - (rezultat1.value - rezultat2.value),
    });

} else {
    await axios.put(`http://localhost:6380/api/v1/igralci/igralci/${props.igralec2._id}`,{
        točke: 21,
    });

    await axios.put(`http://localhost:6380/api/v1/igralci/igralci/${props.igralec1._id}`,{
        točke: 21 - (rezultat2.value - rezultat1.value),
    });  
}
        emit("zapri");

      } catch (err) {
        console.error(err);
        alert("Napaka pri shranjevanju tekme.");
      }
    };

    return { rezultat1, rezultat2, shraniTekmo };
  }
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}

.modal input {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  box-sizing: border-box;
}

button {
  margin-right: 5px;
}
</style>