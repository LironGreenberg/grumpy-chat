<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="view"/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import AppHeader from '@/views/AppHeader.vue';

  export default {
    name: 'Home',
    components: {
      AppHeader
    }
  }
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
  }

  html, body, #app {
    height: 100%;
    width: 100%;
    margin: 0;

  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    display: flex;
    flex-flow: column;
  }

</style>
