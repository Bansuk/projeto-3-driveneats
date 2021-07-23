function selectMenuOption(menuOption){
    const sel = document.querySelector("." + menuOption);
    const sel2 = document.querySelector("." + menuOption + " ion-icon")
    sel.classList.add("menu__option--selected");
    sel2.classList.remove("hidden");
}