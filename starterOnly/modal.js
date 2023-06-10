function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".modalwrapper");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");
const formBtnSubmit = document.querySelector(".btn-submit");
let formInputs = {};

console.log(form.elements);
for (const field of form.elements) {
  if (field.name != "location") {
    formInputs = {
      ...formInputs,
      [field.name]: {
        state: false,
        errors: field.type,
      },
    };
  }
}

const checkingRules = {
  first: {
    pattern: /^[a-zA-ZÀ-ÿ-]{3,20}$/,
    errorMessage:
      "Entrer une chaîne de caractères,supérieur à 3 et inférieur à 20. Elle ne doit pas comporter de caractères spéciaux.",
  },
  last: {
    pattern: /^[a-zA-ZÀ-ÿ-]{3,20}$/,
    errorMessage:
      "Entrer une chaîne de caractères,supérieur à 3 et inférieur à 20. Elle ne doit pas comporter de caractères spéciaux.",
  },
};
const errors = {
  text: "Entrer une chaîne de caractères,supérieur à 3 et inférieur à 20. Elle ne doit pas comporter de caractères spéciaux.",
  email: ["Error email 1", "Error email 2"],
  number: ["Error number 1", "Error number 2"],
  radio: ["Error radio 1", "Error radio 2"],
  checkbox: ["Error checkbox 1", "Error checkbox 2"],
};
console.log(formInputs);
// launch modal form
function launchModal() {
  modalbg.classList.add("modalwrapper--show");
}
function closeModal() {
  modalbg.classList.remove("modalwrapper--show");
}

/* Form */
function handleError(errorText, target) {
  // If querySelector id= name[targetName] &&  paragraph = querySelector id= name[targetName]
  let errorParagraph = document.querySelector(`#error\\[${target.name}\\]`);
  //else
  if (!errorParagraph) {
    errorParagraph = document.createElement("p");
    errorParagraph.id = `error[${target.name}]`;
    errorParagraph.classList.add("form_error");
  }
  errorParagraph.innerHTML = `${errorText}`;
  target.after(errorParagraph);
}
function handleForm(e) {
  const rule = checkingRules[e.target.name];
  if (rule) {
    const testing = rule.pattern.test(e.target.value);
    if (testing) {
      formInputs[e.target.name].state = true;
      handleError("", e.target);
    } else {
      formInputs[e.target.name].state = false;
      handleError(rule.errorMessage, e.target);
    }
  }
  /*

  if (e.target.name === "first") {
    let pattern = /^[a-zA-ZÀ-ÿ-]{3,20}$/;

    if (!pattern.test(e.target.value)) {
      formInputs.first.state = false;
      handleError(errors.text, e.target);
    } else {
      formInputs.first.state = true;
      handleError("", e.target);
    }
  } else if (e.target.name === "last") {
    let pattern = /^[a-zA-ZÀ-ÿ-]{3,20}$/;

    if (!pattern.test(e.target.value)) {
      formInputs.last.state = false;
      handleError(errors.text, e.target);
    } else {
      formInputs.first.state = true;
      handleError("", e.target);
    }*/
}
/* ifelse (e.target.name === "birthdate"){
    // getTime() or toStringIso()
  } */

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// Watch Form
formBtnSubmit.addEventListener("click", () => {});
form.addEventListener("change", handleForm);
