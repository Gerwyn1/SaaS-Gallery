if (document.readyState !== "loading") {
  console.log("document is already ready, just execute code here");
  myInitCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("document was not ready, place code here");
    myInitCode();
  });
}

function myInitCode() {
  const starsEl = document.querySelectorAll(".fa-star");
  const emojisEl = document.querySelectorAll(".far");
  const colorsArray = ["red", "orange", "lightblue", "lightgreen", "green"];

  console.log(starsEl);
  console.log(emojisEl);

  updateRating(3);

  starsEl.forEach((starEl, index) => {
    starEl.addEventListener("click", () => {
      updateRating(index);
    });
  });

  function updateRating(index) {
    starsEl.forEach((starEl, idx) => {
      if (idx < index + 1) {
        starEl.classList.add("active");
      } else {
        starEl.classList.remove("active");
      }
    });

    emojisEl.forEach((emojiEl) => {
      emojiEl.style.transform = `translateX(-${index * 50}px)`;
      emojiEl.style.color = colorsArray[index];
    });
  }
}
