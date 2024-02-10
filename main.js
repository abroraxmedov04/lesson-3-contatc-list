// fist I need to call items

const elForm = document.querySelector(".js-form");

const elInputName = document.querySelector(".js-input-name");
const elInputRelatives = document.querySelector(".js-input-relative");
const elInputNumber = document.querySelector(".js-input-number");

const eltemplate = document.querySelector(".js-template").content;

const elUlwrapper = document.querySelector(".js-list-contact");

// arr to store values
const contacts = [];

function findIndex(arr, inputValue) {
  const findNumberIndex = arr.findIndex(function (item) {
    return item.numberuser == inputValue;
  });
  return findNumberIndex;
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  //   get values

  const nameValue = elInputName.value.trim();
  const relativesValues = elInputRelatives.value.trim();
  const numValue = elInputNumber.value.trim();

  //call addContact

  //   check for unique number
  const numberIndex = findIndex(contacts, numValue);
  if (numberIndex > -1) {
    elInputNumber.classList.add("is-invalid");
    return;
  } else {
    elInputNumber.classList.remove("is-invalid");
  }

  addContact(nameValue, relativesValues, numValue);
  renderConatct(contacts, elUlwrapper);
});

// function in order to create object
function addContact(name, relative, numberPhone) {
  const contact = {
    nameUser: name,
    relativeUser: relative,
    numberuser: numberPhone,
  };

  contacts.push(contact);
}

// function in order to render
function renderConatct(arr, nodeUl) {
  nodeUl.innerHTML = "";

  arr.forEach((contact, index) => {
    const contactClone = eltemplate.cloneNode(true);

    contactClone.querySelector(".list-name").textContent = contact.nameUser;
    contactClone.querySelector(".list-relatives").textContent =
      contact.relativeUser;
    contactClone.querySelector(".list-num").textContent = contact.numberuser;
    contactClone.querySelector(".list-num").href = `tel:${contactClone.number}`;

    contactClone.querySelector(".js-delete-list-btn").textContent =
      "Delete Contact";

    contactClone.querySelector(".js-delete-list-btn").dataset.contactIndex =
      index;
    nodeUl.appendChild(contactClone);
  });
}
console.log(contacts);

// deelte btn and function

function deleteContact(index) {
  contacts.splice(index, 1);

  renderConatct(contacts, elUlwrapper);
}

elUlwrapper.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-delete-list-btn")) {
    const deleteBtnIndex = Number(evt.target.dataset.contactIndex);

    deleteContact(deleteBtnIndex);
  }
});
