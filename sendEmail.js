(function () {
  const sendeEmailBtn = document.querySelector(".send-email");

  sendeEmailBtn?.addEventListener("click", () => {
    window.open(`mailto:mkt@youngincm.com`);
  });
})();
