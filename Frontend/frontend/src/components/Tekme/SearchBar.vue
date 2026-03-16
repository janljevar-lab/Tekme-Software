<template>
  <div>
    <input 
      type="text" 
      placeholder="Išči igralca..."
      v-model="searchText"
      @input="pošljiFilter"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  emits: ["filter"],
  setup(_, { emit }) {
    const searchText = ref("");

    const pošljiFilter = () => {
      emit("filter", searchText.value);
    };

    return { searchText, pošljiFilter };
  }
});
</script>

<style scoped>
input{
  padding: 5px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>