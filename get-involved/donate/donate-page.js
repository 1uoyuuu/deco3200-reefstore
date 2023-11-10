function setupMSF(form) {
  //toggle between different pages by adding/removing class name
  const showPage = (element) => {
    element.classList.add("msf-show");
    element.classList.remove("msf-hide");
  };
  const hidePage = (element) => {
    element.classList.add("msf-hide");
    element.classList.remove("msf-show");
  };

  let msfPages = document.querySelectorAll(`#${form.id} > .form-page`);
  //arrow function to display or hide the page
  //declare the total page count of the form and current page
  let msfIndex = 0;
  let currentPage = msfPages[msfIndex];
  showPage(currentPage);
  //get all the buttons
  const backBtns = document.querySelectorAll(`#${form.id} .back-btn`);
  const nextBtns = document.querySelectorAll(`#${form.id} .next-btn`);
  //remove the back button for the first page, and the next button for the last page
  backBtns[0].classList.add("msf-visually-hide");
  nextBtns[msfPages.length - 1].classList.add("msf-hide");

  //By default the nextBtn should be disabled until user select a design mode
  // nextBtns[0].disabled = true;
  // nextBtns[1].disabled = true;

  //user can always goes back to the previous page without any problem
  //so the back buttons should work when user click it
  const locationOptions = document.querySelectorAll(".location-option");
  locationOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      locationOptions.forEach((opt) => opt.classList.remove("active-option"));
      opt.classList.add("active-option");
      // designMode = document.querySelector(".location-option.active-option").id;
      nextBtns[0].disabled = false;
    });
  });
  backBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      //prevent automatically refreshing the page
      event.preventDefault();
      hidePage(currentPage);
      if (msfIndex !== 0) {
        //decrement the page index
        msfIndex--;
      }
      //change the current page
      currentPage = msfPages[msfIndex];
      showPage(currentPage);
    });
  });
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      //prevent automatically refreshing the page
      event.preventDefault();
      hidePage(currentPage);
      console.log("clicking next");
      if (msfIndex !== msfPages.length - 1) {
        //decrement the page index
        msfIndex++;
      }
      //change the current page
      currentPage = msfPages[msfIndex];
      showPage(currentPage);
    });
  });
}

setupMSF(document.getElementById("donate-form"));
//for the simplicity of this demo, there will be no information operation or actually submitting the form here
document.getElementById("donate-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the form from submitting
  window.location.href = "/get-involved/";
});
//set the image display as captured image if there is any
const storedImageBase64 = sessionStorage.getItem("capturedImage");
const capturedContainer = document.querySelectorAll(".captured-image");
console.log(capturedContainer);
if (storedImageBase64) {
  console.log("LOADING IMAGE" + storedImageBase64);
  capturedContainer.forEach((el) => {
    const img = document.createElement("img");
    img.src = storedImageBase64;
    console.log(el);
    el.appendChild(img);
  });
} else {
  capturedContainer.forEach((el) => {
    const p = document.createElement("p");
    p.textContent = "Please create a coral before donation";
    console.log(el);
    el.appendChild(p);
  });
}
