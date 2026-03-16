<template>
  <div>
    <h2>Rezultati</h2>

    <ol class="rezultati-list">
      <li v-for="(Igralec, index) in sortedIgralci" :key="Igralec._id" :class="['igralec', medalClass(index)]">
        <span class="rank">{{ index + 1 }}</span>
        {{ Igralec.ime }} {{ Igralec.priimek }} - {{ Igralec.točke }} pik
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Tekme",
  setup() {
    const igralci = ref<any[]>([]);

    const naloziIgralce = async () => {
      try {
        const res = await axios.get("http://localhost:6380/api/v1/igralci/igralci");
        igralci.value = res.data;
      } catch (err) {
        console.error("Napaka pri nalaganju:", err);
      }
    };

    onMounted(naloziIgralce);

    const sortedIgralci = computed(() => {
      return [...igralci.value].sort((a, b) => b.točke - a.točke);
    });

    const medalClass = (index: number) => {
      if (index === 0) return 'zlata';
      if (index === 1) return 'srebrna';
      if (index === 2) return 'bronasta';
      return '';
    };

    return { sortedIgralci, medalClass };
  }
});
</script>

<style scoped>
.rezultati-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.igralec {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
}

.rank {
  display: inline-block;
  width: 30px;
  font-weight: bold;
  margin-right: 10px;
  text-align: center;
}

.zlata .rank {
  font-size: 40px;
  color: #FFD700;
}

.srebrna .rank {
  font-size: 32px;
  color: #C0C0C0;
}

.bronasta .rank {
  font-size: 26px;
  color: #CD7F32;
}

.zlata, .srebrna, .bronasta {
  font-weight: bold;
}
</style>