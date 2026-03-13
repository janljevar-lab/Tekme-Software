<template>
  <div>
    <h2>Seznam igralcev</h2>

    <ul>
      <li
        v-for="Igralec in igralci"
        :key="Igralec._id"
        @click="izberiIgralca(Igralec._id)"
        :style="{cursor:'pointer', background: izbranId === Igralec._id ? '#ddd' : ''}"
      >
        {{ Igralec.ime }} {{ Igralec.priimek }}
      </li>
    </ul>

    <br>

    <button @click="izbrisiIgralca">
      Izbriši izbranega igralca
    </button>

    <p v-if="izbranId">
      Izbran ID: {{ izbranId }}
    </p>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Seznam",

  setup() {

    const igralci = ref<any[]>([]);
    const izbranId = ref<string | null>(null);

    const naloziIgralce = async () => {
      const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
      igralci.value = res.data;
    };

    const izberiIgralca = (id:string) => {
      izbranId.value = id;
    };

    const izbrisiIgralca = async () => {

      if(!izbranId.value){
        alert("Najprej izberi igralca");
        return;
      }

      try{

        const link = `http://localhost:6380/api/v1/igralci/igralci/${izbranId.value}`;

        console.log("DELETE LINK:", link);

        await axios.delete(link);

        igralci.value = igralci.value.filter(i => i._id !== izbranId.value);

        izbranId.value = null;

      }catch(err){
        console.error("Napaka pri brisanju:", err);
      }

    };

    onMounted(naloziIgralce);

    return {
      igralci,
      izbranId,
      izberiIgralca,
      izbrisiIgralca
    };
  }
});
</script>

<style scoped>

ul{
  list-style:none;
  padding:0;
}

li{
  padding:8px;
  border-bottom:1px solid #ccc;
}

li:hover{
  background:#eee;
}

button{
  padding:8px 12px;
}

</style>