<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
    <SideBarL />
    <SideBarR />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import SideBarL from "@/components/SideBarL.vue";
import SideBarR from "@/components/SideBarR.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    SideBarL,
    SideBarR,
  },
  created() {
    this.$store.dispatch('fetchPosts');
  },
};
</script>

<style>
@import "@/assets/universal.css";
@import "@/assets/index.css";
</style>
