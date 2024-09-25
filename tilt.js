document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const menuImgContainer = document.querySelector(".menu-img");
  const images = document.querySelectorAll(".menu-img img"); // Use querySelectorAll to select all images

  let mouse = { x: 0, y: 0 };
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  const scales = [0.81, 0.84, 0.87, 0.9]; // Fixed typo in array

  function update() {
    let dx = mouse.x - cx;
    let dy = mouse.y - cy;
    let tiltx = (dy / cy) * 20;
    let tilty = (dx / cx) * 20;

    // Animate container tilt
    gsap.to(menuImgContainer, {
      duration: 2,
      transform: `rotate3d(${tiltx}, ${tilty}, 0, 15deg)`,
      ease: "power3.out",
    });

    // Parallax effect for images
    images.forEach((img, index) => {
      // Corrected forEach
      let parallaxX = -(dx * (index + 1)) / 100;
      let parallaxY = -(dy * (index + 1)) / 100;

      let transformStyles = `translate(calc(-50% + ${parallaxX}px), calc(-50% + ${parallaxY}px)) scale(${scales[index]})`;

      gsap.to(img, {
        duration: 2,
        transform: transformStyles,
        ease: "power3.out",
      });
    });
  }

  // Capture mouse movement and trigger update
  document.body.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    update();
  });
});

let elements = document.querySelectorAll(".menu-link p");

elements.forEach((element) => {
  let innerText = element.innerText;
  element.innerHTML = "";

  let textContainer = document.createElement("div");
  textContainer.classList.add("block");

  for (let letter of innerText) {
    let span = document.createElement("span");
    span.innerText = letter.trim() === "" ? "\xa0" : letter;
    span.classList.add("letter");
    textContainer.appendChild(span);
  }

  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));
});

elements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.classList.add("play");
  });

  element.addEventListener("mouseleave", () => {
    element.classList.remove("play");
  });
});
