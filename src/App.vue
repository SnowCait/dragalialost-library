<template>
  <div id="app">
    <router-link to="/"><img alt="Vue logo" src="./assets/logo.png"></router-link>
    <router-view />
    <footer>
      <ul>
        <li class="github">
          <a href="https://github.com/SnowCait/dragalialost-library" target="_blank">
            <img src="@/assets/img/ui/logo/GitHub-Mark-120px-plus.png" alt="GitHub" />
          </a>
        </li>
        <li class="twitter">
          <a href="https://twitter.com/snow_cait" target="_blank">
            <img src="@/assets/img/ui/logo/Twitter_Social_Icon_Circle_Color.png" alt="Twitter" />
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
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

footer {
  margin: 1em auto;
}
footer ul {
  list-style: none;
  display: flex;
  align-items: center;
  width: 80px;
  margin: 0 auto;
  padding: 0;
}
footer ul li {
  width: 40px;
}
footer ul li img {
  width: 32px;
  height: 32px;
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
