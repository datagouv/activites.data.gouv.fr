<template>
  <div id="app">
      <header-datagouv></header-datagouv>
      <router-view/>
      <footer-datagouv></footer-datagouv>
  </div>
</template>
<style>
  body{
    margin:0;
    width: 100%;
    height: 100%;
  }
  html{
    scroll-behavior: smooth;
  }
</style>

<script>
import HeaderDatagouv from './components/HeaderDatagouv.vue';
import FooterDatagouv from './components/FooterDatagouv.vue';
export default {
  name: 'home',
  components: { HeaderDatagouv, FooterDatagouv },
};
</script>