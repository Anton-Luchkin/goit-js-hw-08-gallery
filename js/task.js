import gallery from "./gallery-items.js";

const createGalleryRef = galleryImg => {
  const createListItemRef = document.createElement("li");
  createListItemRef.classList.add("gallery__item");
  const createLinkRef = document.createElement("a");
  createLinkRef.classList.add("gallery__link");
  createLinkRef.href = galleryImg.original;
  const createImageRef = document.createElement("img");
  createImageRef.classList.add("gallery__image");
  createImageRef.src = galleryImg.preview;
  createImageRef.alt = galleryImg.description;
  createImageRef.dataset.source = galleryImg.original;
  createLinkRef.appendChild(createImageRef);
  createListItemRef.appendChild(createLinkRef);
  return createListItemRef;
};

const imageList = gallery.map(galleryImg => createGalleryRef(galleryImg));

const containerGalleryRef = document.querySelector(".js-gallery");

containerGalleryRef.append(...imageList);

const refs = {
  lightbox: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  lightboxClose: document.querySelector("button[data-action='close-lightbox']"),
  lightboxOverlayClose: document.querySelector(".lightbox__content")
};

containerGalleryRef.addEventListener("click", onImgClick);

function onImgClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;

  refs.lightbox.classList.add("is-open");
  setLargeImageSrc(largeImageURL);

  window.addEventListener("keydown", onPressEsc);
}

function setLargeImageSrc(url) {
  refs.lightboxImg.src = url;
}

function onCloseLightbox() {
  refs.lightboxImg.src = "";
  refs.lightbox.classList.remove("is-open");
}

function onPressEsc(event) {
  if (event.code === "Escape") {
    onCloseLightbox();
  }
}

refs.lightboxClose.addEventListener("click", () => {
  window.removeEventListener("keydown", onPressEsc);
  onCloseLightbox();
});

refs.lightboxOverlayClose.addEventListener("click", event => {
  window.removeEventListener("keydown", onPressEsc);
  if (event.target === event.currentTarget) {
    onCloseLightbox();
  }
});
