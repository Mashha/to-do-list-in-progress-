import { manageLists } from "./listManager";
import { storeItems } from "./storage";

export function addProjectToPage() {
  //open modal
  const btnToOpenForm = document.querySelector(".btn-open-modal");
  btnToOpenForm.addEventListener("click", openForm);

  function openForm() {
    const divModal = document.querySelector(".form-modal");
    // clean input before you open
    cleanInput();
    divModal.classList.add("open");
  }

  //loop over the array
  function loopAndDisplay() {
    const projectItems = document.querySelectorAll(".list-item");
    projectItems.forEach((item) => {
      item.remove();
    });

    for (let i = 0; i < manageLists.storedLists.length; i++) {
      addProjectToDiv(manageLists.storedLists[i]);
      // storeItems.setItem("project", manageLists.storedLists[i])
      // storeItems.getItem("project");
    }
  }
  //load default data
  window.onload = loopAndDisplay;

  //add project to array
  document.querySelector("#form").addEventListener("submit", addProjectToArray);

  function addProjectToArray(e) {
    e.preventDefault();

    if (e.target[0].value === "") {
      alert("add project name");
    } else {
      let formField = e.target[0].value;
      closeModalForm();
      manageLists.addList(`${formField}`);
      loopAndDisplay();
    }
  }

  // add project to div
  function addProjectToDiv(project) {
    const addProjectToDiv = document.querySelector(".project-container");
    const listElement = document.createElement("li");
    listElement.classList.add("list-item");
    listElement.textContent = project.name;
    listElement.id = project.id;
    const deleteLi = document.createElement("button");
    deleteLi.classList.add("remove-li");
    deleteLi.textContent = "X";
    const editLi = document.createElement("button");
    editLi.classList.add("edit-project");
    editLi.textContent = "edit";
    listElement.append(editLi, deleteLi);
    addProjectToDiv.append(listElement);

    // edit project
    editLi.addEventListener("click", function () {
      const divEditList = document.querySelector(".form-edit-project");
      divEditList.classList.add("edit-form");
      const projectNameInput = document.querySelector(".edited-project-name");
      projectNameInput.value = project.name;
    });

    document
      .querySelector("#form-edit")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const newName = document.querySelector(".edited-project-name");
        manageLists.editAList(project, newName.value);
        closeEditedForm();
        loopAndDisplay();
      });

    //close edited form
    document
      .querySelector(".close-edit-form")
      .addEventListener("click", closeEditedForm);
    function closeEditedForm() {
      const divEditList = document.querySelector(".form-edit-project");
      divEditList.classList.remove("edit-form");
    }

    //remove project from the page
    deleteLi.addEventListener("click", function () {
      const getAListWithID = manageLists.getAList(project.id);
      const findIndex = manageLists.storedLists.indexOf(getAListWithID);
      manageLists.removeList(findIndex);
      loopAndDisplay();
    });
  }
  //clean input field
  function cleanInput() {
    const inputField = document.querySelector(".project-name");
    inputField.value = "";
  }

  //close modal form
  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", closeModalForm);

  function closeModalForm() {
    const divModalClose = document.querySelector(".form-modal");
    divModalClose.classList.remove("open");
  }
}