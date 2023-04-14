<template>
  <!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
-->
  <div>
    <header>
      <div>Animated Sections</div>
      <div>Made By Brian</div>
    </header>
    <section v-for="section in sectionss" :class="section.class">
      <div class="outer">
        <div class="inner">
          <div class="bg">
            <h2 class="section-heading">{{ section.text }}</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    const sections = document.querySelectorAll("section");
    const images = document.querySelectorAll(".bg");
    const headings = gsap.utils.toArray(".section-heading");
    const outerWrappers = gsap.utils.toArray(".outer");
    const innerWrappers = gsap.utils.toArray(".inner");
    let listening = false,
      direction = "down",
      current,
      next = 0;

    const touch = {
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0,
      startTime: 0,
      dt: 0,
    };

    const tlDefaults = {
      ease: "slow.inOut",
      duration: 1.25,
    };

    const splitHeadings = headings.map((heading) => {
      /* return new SplitText(heading, {
        type: "chars, words, lines",
        linesClass: "clip-text",
      }); */
    });
    function revealSectionHeading() {
      return gsap.to(splitHeadings[next], {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
      });
    }

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    // Slides a section in on scroll down
    function slideIn() {
      // The first time this function runs, current is undefined
      if (current !== undefined) gsap.set(sections[current], { zIndex: 0 });

      gsap.set(sections[next], { autoAlpha: 1, zIndex: 1 });
      gsap.set(images[next], { yPercent: 0 });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: tlDefaults,
          onComplete: () => {
            listening = true;
            current = next;
          },
        })
        .to([outerWrappers[next], innerWrappers[next]], { yPercent: 0 }, 0)
        .from(images[next], { yPercent: 15 }, 0)
        .add(revealSectionHeading(), 0);

      if (current !== undefined) {
        tl.add(
          gsap.to(images[current], {
            yPercent: -15,
            ...tlDefaults,
          }),
          0
        ).add(
          gsap
            .timeline()
            .set(outerWrappers[current], { yPercent: 100 })
            .set(innerWrappers[current], { yPercent: -100 })
            .set(images[current], { yPercent: 0 })
            .set(sections[current], { autoAlpha: 0 })
        );
      }

      tl.play(0);
    }

    // Slides a section out on scroll up
    function slideOut() {
      gsap.set(sections[current], { zIndex: 1 });
      gsap.set(sections[next], { autoAlpha: 1, zIndex: 0 });
      gsap.set([outerWrappers[next], innerWrappers[next]], { yPercent: 0 });
      gsap.set(images[next], { yPercent: 0 });

      gsap
        .timeline({
          defaults: tlDefaults,
          onComplete: () => {
            listening = true;
            current = next;
          },
        })
        .to(outerWrappers[current], { yPercent: 100 }, 0)
        .to(innerWrappers[current], { yPercent: -100 }, 0)
        .to(images[current], { yPercent: 15 }, 0)
        .from(images[next], { yPercent: -15 }, 0)
        .add(revealSectionHeading(), ">-1")
        .set(images[current], { yPercent: 0 });
    }

    function handleDirection() {
      listening = false;

      if (direction === "down") {
        next = current + 1;
        if (next >= sections.length) next = 0;
        slideIn();
      }

      if (direction === "up") {
        next = current - 1;
        if (next < 0) next = sections.length - 1;
        slideOut();
      }
    }

    function handleWheel(e) {
      if (!listening) return;
      direction = e.wheelDeltaY < 0 ? "down" : "up";
      handleDirection();
    }

    function handleTouchStart(e) {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.startX = t.pageX;
      touch.startY = t.pageY;
    }

    function handleTouchMove(e) {
      if (!listening) return;
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.dx = t.pageX - touch.startX;
      touch.dy = t.pageY - touch.startY;
      if (touch.dy > 10) direction = "up";
      if (touch.dy < -10) direction = "down";
      handleDirection();
    }

    slideIn();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap");

$bg-gradient: linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.6) 0%,
  rgba(0, 0, 0, 0.3) 100%
);

* {
  box-sizing: border-box;
  user-select: none;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  color: white;
  background: black;
  font-family: "Cormorant Garamond", serif;
  text-transform: uppercase;
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

header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  width: 100%;
  z-index: 3;
  height: 7em;
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(0.66rem, 2vw, 1rem);
  letter-spacing: 0.5em;
}

section {
  height: 100%;
  width: 100%;
  top: 0;
  position: fixed;
  visibility: hidden;
  will-change: transform;

  .outer,
  .inner {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    will-change: transform;
  }

  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    background-size: cover;
    background-position: center;

    h2 {
      z-index: 2;
    }

    .clip-text {
      overflow: hidden;
    }
  }
}

.first {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.second {
  .bg {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920");
  }
}

.third {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.fourth {
  .bg {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920);
  }
}

.fifth {
  .bg {
    background-image: $bg-gradient,
      url("https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75w=1920");
    background-position: 50% 45%;
  }
}
</style>
