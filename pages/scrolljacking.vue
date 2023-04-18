<template>
  <!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
 -->
  <div class="scrolljacking">
    <section id="landing-page" class="hero-story hero hero1">
      <div class="full-col width-100">
        <h1>Landing Screen</h1>
      </div>
    </section>

    <section id="rooms" class="hero-story hero second-hero hero2">
      <div class="left-col width-33">
        <h2>Des chambres pour vous</h2>
      </div>
      <div class="right-col width-66 delayed">
        <h2>Contenu pour les chambres</h2>
      </div>
    </section>

    <section id="you" class="hero-story hero second-hero hero3">
      <div class="left-col width-33 delayed">
        <h2>Contenu gauche pour proche de vous</h2>
      </div>
      <div class="middle-col width-33">
        <h2>Proche de vous</h2>
      </div>
      <div class="right-col width-33 delayed">
        <h2>Contenu droite pour proche de vous</h2>
      </div>
    </section>

    <section id="near" class="hero-story hero second-hero hero4">
      <div class="left-col width-66 delayed">
        <h2>Contenu pour proche de tout</h2>
      </div>
      <div class="right-col width-33">
        <h2>Proche de tout</h2>
      </div>
    </section>

    <footer class="hero-story hero second-hero hero5">
      <h2>Contenu du footer</h2>
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
  mounted() {
    console.log("document", document);
    console.log("window", window);
    const sections = document.querySelectorAll("section");
    console.log("sections", sections);

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

    sections.forEach((section, i) => {
      const intoAnim = gsap.from(section.querySelector(".right-col"), {
        yPercent: 50,
        duration: 1,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=1",
        end: "bottom top+=1",
        markers: true,
        onEnter: () => goToSection(section, intoAnim),
        onEnterBack: () => goToSection(section),
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.scrolljacking {
  body {
    overflow-x: hidden;
  }
  section,
  footer {
    display: flex;
    height: 100vh;
    width: 100%;
  }
  .left-col,
  .middle-col,
  .right-col,
  .full-col {
    height: 100vh;
    margin: 0;
  }
  .width-0 {
    width: 0;
  }
  .width-33 {
    width: 33.33%;
  }
  .width-66 {
    width: 66.66%;
  }
  .width-100 {
    width: 100%;
  }
  #landing-page .full-col {
    background-color: grey;
  }
  #rooms .left-col {
    background-color: red;
  }
  #rooms .right-col {
    background-color: pink;
  }
  #you .middle-col {
    background-color: green;
  }
  #you .left-col,
  #you .right-col {
    background-color: palegreen;
  }
  #near .right-col {
    background-color: blue;
  }
  #near .left-col {
    background-color: lightblue;
  }
  footer {
    background-color: black;
    color: white;
  }
}
</style>
