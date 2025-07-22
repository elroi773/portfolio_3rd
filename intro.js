const noise = () => {
  let viewWidth,
    viewHeight,
    canvas = document.getElementById("canvas"),
    ctx;

  // film grain config
  let patternSize = 100,
    patternScaleX = 1,
    patternScaleY = 1,
    patternRefreshInterval = 1,
    patternAlpha = 19; // int between 0 and 255 -> 19

  let patternPixelDataLength = patternSize * patternSize * 4,
    patternCanvas,
    patternCtx,
    patternData,
    frame = 0;

  window.onload = function () {
    initCanvas();
    initGrain();
    requestAnimationFrame(loop);

    window.addEventListener("resize", () => {
      viewWidth = canvas.width = canvas.clientWidth;
      viewHeight = canvas.height = canvas.clientHeight;
    });
  };

  // create a canvas which will render the grain
  function initCanvas() {
    viewWidth = canvas.width = canvas.clientWidth;
    viewHeight = canvas.height = canvas.clientHeight;
    ctx = canvas.getContext("2d");
    ctx.scale(patternScaleX, patternScaleY);
  }

  // create a canvas which will be used as a pattern
  function initGrain() {
    patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    patternCtx = patternCanvas.getContext("2d");
    patternData = patternCtx.createImageData(patternSize, patternSize);
  }

  // put a random shade of gray into every pixel of the pattern
  function update() {
    let value;
    for (let i = 0; i < patternPixelDataLength; i += 4) {
      value = (Math.random() * 255) | 0;
      patternData.data[i] = value;
      patternData.data[i + 1] = value;
      patternData.data[i + 2] = value;
      patternData.data[i + 3] = patternAlpha;
    }
    patternCtx.putImageData(patternData, 0, 0);
  }

  // fill the canvas using the pattern
  function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);
    ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
    ctx.fillRect(0, 0, viewWidth, viewHeight);
  }

  function loop() {
    if (++frame % patternRefreshInterval === 0) {
      update();
      draw();
    }
    requestAnimationFrame(loop);
  }
};

noise();

const scroll = new LocomotiveScroll({
  el: document.querySelector("#js-scroll"),
  smooth: true,
  class: "is-inview",
});

// 커서 및 링크 움직임 효과
(function () {
  const links = document.querySelectorAll(".cursor-nav .link");
  const cursor = document.querySelector(".cursor");

  // 마우스 커서 따라다니게 (정확한 위치 맞춤)
  window.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;

    // transform을 사용하여 정확한 위치 설정
    cursor.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
  });

  // span 살짝 따라다니는 효과
  const animateLink = function (e) {
    const span = this.querySelector("span");
    const { offsetX: x, offsetY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = this;

    const move = 25;
    const xMove = (x / width) * (move * 2) - move;
    const yMove = (y / height) * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === "mouseleave") span.style.transform = "";
  };

  links.forEach((link) => {
    link.addEventListener("mousemove", animateLink);
    link.addEventListener("mouseleave", animateLink);
  });
})();

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

var o = $(".card");

$("#top").on("mousemove", function (t) {
  var e = -($(this).width()/2 - t.offsetX) / 20;
  var n = ($(this).height()/2 - t.offsetY) / 20;
  o.css("transform", `rotateY(${e}deg) rotateX(${n}deg)`);
});

$("#top").on("mouseleave", function () {
  o.css("transform", "rotateY(0deg) rotateX(0deg)");
});
