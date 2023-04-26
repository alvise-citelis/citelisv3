<template>
  <div
    class="contrainer bg-black h-screen text-yellow text-center flex justify-center items-center flex-col"
  >
    <h2>Este es el incio</h2>
    <nav class="flex justify-between w-1/2">
      <nuxt-link to="/demo">demo</nuxt-link>
      <nuxt-link to="/mix">mix</nuxt-link>
      <nuxt-link to="/scrolljacking">scrolljacking</nuxt-link>
      <nuxt-link to="/scroll">scroll</nuxt-link>
    </nav>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default {
  data: () => ({}),
};
</script>

<style>
.banner {
  height: 300px;
  position: relative;
}
.banner > * {
  position: absolute;
  height: 100%;
}
</style>
