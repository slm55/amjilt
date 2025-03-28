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