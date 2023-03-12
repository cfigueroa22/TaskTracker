const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar-menu");
const subject = document.querySelector(".task-title");
const message = document.querySelector(".task-body");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("text-body");
const note = document.querySelector(".notes");

// hamburger menu function
menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

subject.addEventListener("submit", (e) => {
  const taskTitle = subject.value;
  const taskMessage = message.value;
});
