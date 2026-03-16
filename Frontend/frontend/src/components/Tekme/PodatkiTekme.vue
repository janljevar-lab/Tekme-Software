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

export default defineComponent({
  name: "PodatkiTekme",
  props: { igralec1: { type: Object, required: true }, igralec2: { type: Object, required: true } },
  setup(props) {
    const rezultat1 = ref<number | null>(null);
    const rezultat2 = ref<number | null>(null);
    const shraniTekmo = () => {
      console.log({
        igralec1: props.igralec1,
        rezultat1: rezultat1.value,
        igralec2: props.igralec2,
        rezultat2: rezultat2.value
      });
      alert("Tekma shranjena v konzolo!");
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
  z-index: 1001;
}

.modal input{
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  box-sizing: border-box;
}

button{
  margin-right: 5px;
}
</style>