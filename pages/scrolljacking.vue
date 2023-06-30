<template>
  <!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
 -->
  <div class="scrolljacking">
    <header class="hero-story hero second-hero hero5">
      <h3>Contenu du header</h3>
    </header>
    <section
      v-for="section in sectionss"
      class="hero-story hero"
      :class="section.class"
    >
      <div class="full-col width-100">
        <h2>{{ section.text }}</h2>
      </div>
    </section>
    <section id="landing-page" class="hero-story hero hero1">
      <div class="full-col width-100">
        <h2>Bottom screen</h2>
      </div>
    </section>

    <footer class="hero-story hero second-hero hero5">
      <h3>Contenu du footer</h3>
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

      //anim.play() && anim.restart();
      if (anim) {
        let tl = gsap.timeline({
          onComplete: () => {
            console.log("tl completada");
          },
          onStart: () => {
            console.log("tl start");
          },
        });

        tl.from(section, {
          backgroundPositionY: "50%",
          duration: 0.7,
          onComplete: () => {
            console.log("back comple");
          },
        });
        tl.from(
          section.querySelector("h2"),
          {
            yPercent: -150,
            duration: 0.7,
            onComplete: () => {
              console.log("title  comple");
            },
          },
          "<"
        );

        /* console.log('section',section);
       const anim = gsap.from(section.querySelector("h2"), {
          yPercent: -120,
          duration: 0.7,
        }) */
        //anim && anim.restart()
      }
    }

    sections.forEach((section, i) => {
      /* const intoAnim = gsap.from(section.querySelector("h2"), {
        yPercent: -120,
        duration: 0.7,
        paused: true,
      }); */

      /* const intoAnim2 = gsap.from(section, {
        backgroundPositionY: "50%",
        duration: 0.7,
        paused: true,
      }); */

      /*  let tl = gsap.timeline({
        paused:true,
        defaults: {
          // children inherit these defaults
          duration: 0.7,
          paused: true,
        },
        
        onComplete:()=>{ console.log('tl completada');},
        onStart:()=>{ console.log('tl start');},

      }).from(section, {backgroundPositionY: "50%",duration: 0.7, onComplete:()=>{ console.log('back comple');},})
        .from(section.querySelector("h2"), {yPercent: -120,duration: 0.7, onComplete:()=>{ console.log('title  comple');},},"<");
 */

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=1",
        end: "bottom top+=1",
        onEnter: () => goToSection(section, true),
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
  footer,
  header {
    display: flex;
    height: 100vh;
    width: 100%;
  }
  .full-col {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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

    //transform: translateY(-100%);
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
  section.hero-story {
    background-size: cover;
  }
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
}
</style>
