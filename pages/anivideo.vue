<template>
  <div class="anivideo2">
    <div class="body">
      <canvas id="hero-lightpass" />
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    console.clear();

    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    canvas.width = 1158;
    canvas.height = 770;

    const frameCount = 140;

    const src =
      "https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/";
    //const src = "/anivideo/toloache";

    const currentFrame = (index) =>
      `${src}${(index + 1).toString().padStart(4, "0")}.jpg`;

    const images = [];
    const airpods = {
      frame: 0,
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.5,
      },
      onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
    });

    images[0].onload = render;

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[airpods.frame], 0, 0);
    }
  },
};
</script>

<style lang="scss">
.anivideo2 {
  height: 100vh;

  .body {
    height: 6000px;
    background: #000;
  }

  canvas {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100vw;
    max-height: 100vh;
  }
}
</style>
