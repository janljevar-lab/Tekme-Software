<template>
  <div>
    <h2>Seznam igralcev</h2>
    <ul>
      <li v-for="item in igralci" :key="item.id || item._id">
       
    <div v-if="clicked()">   
        {{ item.ime }} {{ item.priimek }}
    </div>  
    
    </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";



export default defineComponent({
  name: "Seznam",

  setup() {
    const igralci = ref<Array<{ ime: string; priimek: string; id?: string; _id?: string }>>([]);

    const naloziIgralce = async () => {
      try {
        const response = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = response.data;
      } catch (error) {
        console.error("Napaka pri nalaganju igralcev:", error);
      }
    };

    onMounted(() => {
      naloziIgralce();
    });

    return {
      igralci,
    };
  },
});
</script>

<style scoped>
h2 {
  color: #2c3e50;
}

ul {
    list-style-type: none;
}
</style>