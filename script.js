 var sr = ScrollReveal({
    duration: 2000
  });

  sr.reveal('.second__section');
  sr.reveal('.third__section');
  sr.reveal('.fourth__section');
  sr.reveal('.fifth__section');
  sr.reveal('.sixth__section');

  gsap.from(".logo", {opacity: 0, duration: 3, delay: .5, y: 10, ease:"expo.out"});
  gsap.from(".announcement div", {opacity: 0, duration: 3, delay: .5, y: 10, ease:"expo.out"});
  gsap.from(".first__headings", {opacity: 0, duration: 3, delay: .5, y: 10, ease:"expo.out"});
  gsap.from(".board__img", {opacity: 0, duration: 3, delay: .5, y: 10, ease:"expo.out"});
  gsap.from("nav", {opacity: 0, duration: 3, delay: .5, y: 10, ease:"expo.out"});
  gsap.from(".header__main button", {opacity: 0, duration: 3, delay: .5, y: 10, ease:"expo.out"});

  const menuIcon = document.querySelector(".menu-icon");
  const mobileNav = document.querySelector("nav.mobile");
  let  isMobNavOpen = false;

  menuIcon.addEventListener("click", function() {
    isMobNavOpen =!isMobNavOpen;
    updateNav();
  });

  const mobNavLinks = mobileNav.querySelectorAll("a");
  mobNavLinks.forEach(link => link.addEventListener("click", function() {
    isMobNavOpen = false;
    updateNav();
  }));

  function updateNav() {
    if (isMobNavOpen) {
      menuIcon.setAttribute("name", "x");
      mobileNav.style.display = "block";
    } else{
      menuIcon.setAttribute("name", "menu");
      mobileNav.style.display = "none";
    }
  }


  window.addEventListener("load", function() {
    const forms = document.querySelectorAll('.data__form');
    forms.forEach(form => {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
          method: 'POST',
          body: data,
        })
        .then(() => {
          alert("Өтініш қабылданды, жақында хабарласамыз!");
          if (modal.style.display == "block") {
            closeModal();
          }
          form.reset();
        });
      });
    });
  });
  

  var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btns = document.querySelectorAll(".sign-up-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btns.forEach(btn => (
  btn.onclick = function() {
  openModal();
}
))


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

function closeModal() {
  modal.style.display = "none";
  modal.classList.remove("requires-no-scroll");
}

function openModal() {
  modal.style.display = "block";
  modal.classList.add("requires-no-scroll");
}