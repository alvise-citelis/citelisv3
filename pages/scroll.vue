<template>
  <!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
 -->
  <div class="scroll">
    <header class="containerr">
      <h2 class="containerr__headline">Wanna see something neat?</h2>
    </header>
    <section class="containerr hero">
      <div class="hero__inner">
        <div class="hero__images">
          <img
            class="hero__image"
            src="https://images.unsplash.com/photo-1508781197106-d8c535dcf276?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          />
        </div>
        <div class="hero__content">
          <div class="hero__headline">
            <span>Ahora si funciona </span>
          </div>
        </div>
      </div>
    </section>
    <footer class="containerr">
      <h2 class="containerr__headline">That's pretty neat.</h2>
    </footer>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    gsap.to(".hero", {
      scrollTrigger: {
        trigger: ".hero",
        scrub: true,
        pin: true,
        start: "center 50%",
        end: "bottom -50%",
        toggleClass: "active",
        ease: "power2",
      },
    });
    gsap.to(".hero__image", {
      scrollTrigger: {
        trigger: ".hero",
        scrub: 0.5,
        start: "top bottom",
        end: "bottom -300%",
        ease: "power2",
      },
      y: "-30%",
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&display=swap");

* {
  box-sizing: border-box;
}

body {
  background: black;
  font-family: "IBM Plex Sans", sans-serif;
}
.scroll {
  .containerr {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    color: white;
    text-align: center;
  }

  .containerr__headline {
    font-size: 5vmin;
  }
  .hero {
    height: 110vh;
    &__inner {
      display: flex;
      position: relative;
      width: 100vw;
      max-height: 100vh;
      overflow: hidden;

      &::before {
        content: "";
        display: block;
        padding-bottom: calc(100% / (16 / 9));
      }
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 150%;
      object-fit: cover;
    }

    &__content {
      display: none;
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    &__headline {
      --padding: 1.5vmin;
      --duration: 400ms;
      --delay: calc(var(--duration) / 2);
      --ease: cubic-bezier(0.25, 1, 0.5, 1);

      z-index: 9;
      font-size: 5vmin;
      position: relative;
      display: inline-block;
      font-size: 10vmin;
      overflow: hidden;
      margin-top: calc(var(--padding) * -1);
      padding: var(--padding);

      &::after {
        content: "";
        position: absolute;
        top: calc(100% - var(--padding));
        left: 0;
        background-color: white;
        width: 100%;
        height: 1.5vmin;
        transform: scaleX(0);
        transition: transform var(--duration) var(--delay) var(--ease);
      }

      span {
        display: block;
        transform: translateY(110%);
        transition: transform var(--duration) var(--ease);
      }
    }
    &.active {
      & ::after {
        transform: scaleX(1);
        transition-delay: 0s;
      }
      span {
        transform: translateY(0);
        transition-delay: var(--delay);
      }
    }
  }
}
</style>
