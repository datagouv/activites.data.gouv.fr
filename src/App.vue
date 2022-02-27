<template>
  <div id="app">
      <header-datagouv></header-datagouv>
      <router-view/>
      <footer-datagouv></footer-datagouv>
  </div>
</template>
<style>
</style>

<script>
import HeaderDatagouv from './components/HeaderDatagouv.vue';
import FooterDatagouv from './components/FooterDatagouv.vue';
export default {
  name: 'home',
  components: { HeaderDatagouv, FooterDatagouv },
};
</script>