<template>
  <div class="home">
    <NavBar name="Boombox Dashboard" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    NavBar,
  },
};
</script>
