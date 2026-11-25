// Share button on case studies: phone share sheet if available, else copy the link.
const share = document.querySelector(".share-btn");
share.addEventListener("click", async () => {
  if (navigator.share) return navigator.share({ title: document.title, url: location.href }).catch(() => {});
  await navigator.clipboard.writeText(location.href);
  share.textContent = "Link copied";
  setTimeout(() => (share.textContent = "Share"), 2000);
});
