<template>
  <!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
 -->
  <div class="mix">
    <header class="flex-center">
      <h3>Contenu du header</h3>
    </header>
    <section
      v-for="section in sectionss"
      class="a"
      data-section-fullscroll
      :class="section.class"
    >
      <div class="flex-center">
        <h2>{{ section.text }}</h2>
      </div>
    </section>
    <section data-section-fullscroll id="landing-page" class="">
      <div class="flex-center">
        <h2>Otra mas</h2>
      </div>
    </section>
    <section id="landing-page" class="">
      <div class="flex-center">
        <h2>Sin scroll</h2>
      </div>
    </section>

    <div class="">
      <h3>Contenido intermedio</h3>
    </div>

    <div class="containerr">
      <h2 class="containerr__headline">Wanna see something neat?</h2>
    </div>
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
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default {
  data() {
    return {
      sectionss: [
        { class: "first", text: "Scroll down" },
        { class: "second", text: "Animated with GSAP" },
        { class: "third", text: "GreenSock" },
        { class: "fourth", text: "SAnimation platformn" },
        { class: "fifth", text: "Keep scrolling" },
      ],
    };
  },
  mounted() {
    console.log("document", document);
    console.log("window", window);

    // this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
    // some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
    const scrolling = {
      enabled: true,
      events: "scroll,wheel,touchmove,pointermove".split(","),
      prevent: (e) => e.preventDefault(),
      disable() {
        if (scrolling.enabled) {
          scrolling.enabled = false;
          window.addEventListener("scroll", gsap.ticker.tick, {
            passive: true,
          });
          scrolling.events.forEach((e, i) =>
            (i ? document : window).addEventListener(e, scrolling.prevent, {
              passive: false,
            })
          );
        }
      },
      enable() {
        if (!scrolling.enabled) {
          scrolling.enabled = true;
          window.removeEventListener("scroll", gsap.ticker.tick);
          scrolling.events.forEach((e, i) =>
            (i ? document : window).removeEventListener(e, scrolling.prevent)
          );
        }
      },
    };

    function goToSection(section, anim, i) {
      // skip if a scroll tween is in progress
      if (!scrolling.enabled) {
        return;
      }

      scrolling.disable();
      gsap.to(window, {
        scrollTo: { y: section, autoKill: false },
        onComplete: scrolling.enable,
        duration: 0.7,
      });

      anim && anim.restart();
    }

    /* Add scrolljacking to sectionts  data-section */
    const sections = document.querySelectorAll("[data-section-fullscroll]");
    console.log("sections", sections);
    sections.forEach((section, i) => {
      const intoAnim = gsap.from(section.querySelector("h2"), {
        yPercent: -120,
        duration: 0.7,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=1",
        end: "bottom top+=1",
        onEnter: () => goToSection(section, intoAnim),
        onEnterBack: () => goToSection(section),
      });
    });

    /* Add scroll parallax */
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

<style lang="scss" scoped>
body {
  background-color: black;
  color: white;
}
.mix {
  section,
  footer,
  header {
    display: flex;
    height: 100vh;
    width: 100%;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  h2 {
    font-size: clamp(1rem, 5vw, 5rem);
    font-weight: 400;
    text-align: center;
    letter-spacing: 0.5em;
    margin-right: -0.5em;
    color: hsl(0, 0, 80%);
    width: 90vw;
    max-width: 1200px;
  }
  h3 {
    color: white;
    font-size: 2rem;
  }
  footer {
    background-color: black;
    color: white;
  }

  $bg-gradient: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  .first {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920);
  }

  .second {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920");
  }

  .third {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920);
  }

  .fourth {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920);
  }

  .fifth {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75w=1920");
    background-position: 50% 45%;
  }

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
