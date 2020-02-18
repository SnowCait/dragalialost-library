<template>
  <div id="app">
    <header>
      <img src="Hildegarde.png" />
      <h1>イリア教会 聖城分室</h1>
      <nav>
        <router-link to="/">ホーム</router-link>
      </nav>
    </header>
    <router-view />
    <footer>
      <ul>
        <li class="github">
          <a href="https://github.com/SnowCait/dragalialost-library" target="_blank" rel="noopener">
            <img src="@/assets/img/ui/logo/GitHub-Mark-120px-plus.png" alt="GitHub" />
          </a>
        </li>
        <li class="twitter">
          <a href="https://twitter.com/snow_cait" target="_blank" rel="noopener">
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
  /* margin-top: 60px; */
}

header {
  border-bottom: solid 1px lightgray;
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 8px;
}
header img {
  width: 32px;
  height: 32px;
  border-radius: 5px;
}
header h1 {
  font-size: 1em;
  margin: 0 0.5em;
  vertical-align: middle;
}
header nav {
  margin-left: auto;
}

footer {
  margin-top: 1em;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
  border-top: solid 1px lightgray;
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
