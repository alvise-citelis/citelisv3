<template>
  <div
    class="contrainer bg-black h-screen text-yellow text-center flex justify-center items-center flex-col"
    ref="index"
  >
    <h2>Este es el incio</h2>
    <nav class="flex justify-between w-1/2">
      <nuxt-link to="/demo">demo</nuxt-link>
      <nuxt-link to="/mix">mix</nuxt-link>
      <nuxt-link to="/scrolljacking">scrolljacking</nuxt-link>
      <nuxt-link to="/scroll">scroll</nuxt-link>
      <nuxt-link to="/anivideo">anivideo</nuxt-link>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const index = ref();
let ctx;
console.log("aaa");

onMounted(() => {
  console.log("index", index);
  console.log("mounted");

  ctx = gsap.context((selfi) => {
    const sections = selfi.selector("section");
    console.log("sections", sections);
    //let tl = gsap.timeline({ reversed: true, paused: true });
  }, index.value); // <- Scope!
});

onUnmounted(() => {
  ctx.revert(); // <- Easy Cleanup!
});
</script>

<style>
body {
  background-color: black;
}
.banner {
  height: 300px;
  position: relative;
}
.banner > * {
  position: absolute;
  height: 100%;
}
</style>
