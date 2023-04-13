<template>
  <div>Esta será la pagina chida</div>
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
