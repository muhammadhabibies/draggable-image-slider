// const cardContainer = document.querySelector(".card-container"),
//   firstImg = cardContainer.querySelectorAll("img")[0],
//   arrowIcons = document.querySelectorAll("i");

// let isDragStart = false,
//   isDragging = false,
//   prevPageX,
//   prevScrollLeft,
//   positionDiff;

// const showHideIcons = () => {
//   // showing and hiding prev/next icon according to cardContainer scroll left value
//   //   console.log(cardContainer);
//   let scrollWidth = cardContainer.scrollWidth - cardContainer.clientWidth; // getting max scrollable width
//   arrowIcons[0].style.display = cardContainer.scrollLeft == 0 ? "none" : "block";
//   arrowIcons[1].style.display =
//     cardContainer.scrollLeft == scrollWidth ? "none" : "block";
// };

// arrowIcons.forEach((icon) => {
//   icon.addEventListener("click", () => {
//     let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
//     // if clicked icon is left, reduce width value from the cardContainer scroll left else add to it
//     cardContainer.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
//     setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
//   });
// });

// const autoSlide = () => {
//   // if there is no image left to scroll then return from here
//   if (
//     cardContainer.scrollLeft - (cardContainer.scrollWidth - cardContainer.clientWidth) > -1 ||
//     cardContainer.scrollLeft <= 0
//   )
//     return;

//   positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
//   let firstImgWidth = firstImg.clientWidth + 14;
//   // getting difference value that needs to add or reduce from cardContainer left to take middle img center
//   let valDifference = firstImgWidth - positionDiff;

//   if (cardContainer.scrollLeft > prevScrollLeft) {
//     // if user is scrolling to the right
//     return (cardContainer.scrollLeft +=
//       positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
//   }
//   // if user is scrolling to the left
//   cardContainer.scrollLeft -=
//     positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
// };

const cardContainer = document.querySelector(".card-container");

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX; // kordinat mouse yang ngeklik
  prevScrollLeft = cardContainer.scrollLeft; // kordinat yang sudah di scroll
};

const dragging = (e) => {
  // scroll cardContainer ke kiri berdasarkan mouse pointer
  if (!isDragStart) return;
  e.preventDefault();

  // tambahin class di cardContainer
  cardContainer.classList.add("dragging");

  // scroll
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  cardContainer.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
  cardContainer.classList.remove("dragging");
};

// ketika ngeklik atau drag
cardContainer.addEventListener("mousedown", dragStart);
cardContainer.addEventListener("touchstart", dragStart);

// kordinat pergerakan mouse di element
document.addEventListener("mousemove", dragging);
cardContainer.addEventListener("touchmove", dragging); // mousemove versi device

// ketika melepas klik atau drag
document.addEventListener("mouseup", dragStop);
cardContainer.addEventListener("touchend", dragStop); // device melepas drag
