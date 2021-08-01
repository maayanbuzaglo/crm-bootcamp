const initEventHandler = (window) => {
  window.addEventListener("click", (event) => {
    console.log("click");
  });
};

export { initEventHandler };
