<template>
  <div id="app">
    <router-link to="/"><img alt="Vue logo" src="./assets/logo.png"></router-link>
    <router-view />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.thumbnails {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.thumbnails > li {
    display: inline-block;
    height: 50px;
    width: 50px;
    margin: 0;
    padding: 0;
}
.thumbnails > li > img {
    height: 50px;
    width: 50px;
}
</style>
