<template>
  <!--
Sections animate in and out on scroll. Scroll up or down and the sections will wrap around after hitting the start or end. Uses GSAP for the animations.
 -->
  <div class="demo">
    <header>
      <div>Animated Sections</div>
      <div>Made By Brian</div>
    </header>
    <div class="dots">
      <ul>
        <li
          v-for="(i, index) in sectionss"
          :class="index == next ? 'active' : ''"
        />
      </ul>
    </div>
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
  name: "DemoPro",
  data() {
    return {
      sectionss: [
        { class: "first", text: "Scroll down" },
        { class: "second", text: "Animated with GSAP" },
        { class: "third", text: "GreenSock" },
        { class: "fourth", text: "SAnimation platformn" },
        { class: "fifth", text: "Keep scrolling" },
      ],
      current: null,
      next: 0,
    };
  },
  mounted() {
    const sections = document.querySelectorAll("section");
    const images = document.querySelectorAll(".bg");
    const headings = gsap.utils.toArray(".section-heading");
    const outerWrappers = gsap.utils.toArray(".outer");
    const innerWrappers = gsap.utils.toArray(".inner");

    let listening = false,
      direction = "down";

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
    const revealSectionHeading = () => {
      return gsap.to(splitHeadings[this.next], {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
      });
    };

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    // Slides a section in on scroll down
    const slideIn = () => {
      // The first time this function runs, current is undefined
      if (this.current !== undefined)
        gsap.set(sections[this.current], { zIndex: 0 });

      gsap.set(sections[this.next], { autoAlpha: 1, zIndex: 1 });
      gsap.set(images[this.next], { yPercent: 0 });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: tlDefaults,
          onComplete: () => {
            listening = true;
            this.current = this.next;
          },
        })
        .to(
          [outerWrappers[this.next], innerWrappers[this.next]],
          { yPercent: 0 },
          0
        )
        .from(images[this.next], { yPercent: 15 }, 0)
        .add(revealSectionHeading(), 0);

      if (this.current !== undefined) {
        tl.add(
          gsap.to(images[this.current], {
            yPercent: -15,
            ...tlDefaults,
          }),
          0
        ).add(
          gsap
            .timeline()
            .set(outerWrappers[this.current], { yPercent: 100 })
            .set(innerWrappers[this.current], { yPercent: -100 })
            .set(images[this.current], { yPercent: 0 })
            .set(sections[this.current], { autoAlpha: 0 })
        );
      }

      tl.play(0);
    };

    // Slides a section out on scroll up
    const slideOut = () => {
      gsap.set(sections[this.current], { zIndex: 1 });
      gsap.set(sections[this.next], { autoAlpha: 1, zIndex: 0 });
      gsap.set([outerWrappers[this.next], innerWrappers[this.next]], {
        yPercent: 0,
      });
      gsap.set(images[this.next], { yPercent: 0 });

      gsap
        .timeline({
          defaults: tlDefaults,
          onComplete: () => {
            listening = true;
            this.current = this.next;
          },
        })
        .to(outerWrappers[this.current], { yPercent: 100 }, 0)
        .to(innerWrappers[this.current], { yPercent: -100 }, 0)
        .to(images[this.current], { yPercent: 15 }, 0)
        .from(images[this.next], { yPercent: -15 }, 0)
        .add(revealSectionHeading(), ">-1")
        .set(images[this.current], { yPercent: 0 });
    };

    const handleDirection = () => {
      listening = false;

      if (direction === "down") {
        if (this.current >= sections.length - 1) {
          listening = true;
          console.log("no more");
          return;
        }
        this.next = this.current + 1;
        if (this.next >= sections.length) this.next = 0;
        slideIn();
      }

      if (direction === "up") {
        if (this.current <= 0) {
          listening = true;
          console.log("no more");
          return;
        }
        this.next = this.current - 1;
        if (this.next < 0) this.next = sections.length - 1;
        slideOut();
      }
    };

    const handleWheel = (e) => {
      if (!listening) return;
      direction = e.wheelDeltaY < 0 ? "down" : "up";
      handleDirection();
    };

    const handleTouchStart = (e) => {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.startX = t.pageX;
      touch.startY = t.pageY;
    };

    const handleTouchMove = (e) => {
      if (!listening) return;
      e.preventDefault();
    };

    function handleTouchEnd(e) {
      if (!listening) return;
      const t = e.changedTouches[0];
      touch.dx = t.pageX - touch.startX;
      touch.dy = t.pageY - touch.startY;
      if (touch.dy > 10) direction = "up";
      if (touch.dy < -10) direction = "down";
      handleDirection();
    }

    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    slideIn();
  },
};
</script>

<style lang="scss" scoped>
/* dots*/
.dots {
  z-index: 2;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  li {
    background: white;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 1rem;
    transition: transform 300ms ease;
    &.active {
      transform: scale(1.8);
      transition: transform 300ms ease;
    }
  }
}
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
