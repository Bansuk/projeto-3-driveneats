
//inicialização de variáveis globais para verificar se as 3 opções do menu foram selecionadas
let foodSelected = 0;
let beverageSelected = 0;
let dessertSelected = 0;

//Adiciona ou remove o layout de selecionado no item clicado pelo usuario
function selectMenuOption(menuOptionSelected){

    //Pega a classe identificadora do tipo de opcao
    const classOption = menuOptionSelected.parentElement.classList.item(1);

    //Busca dentro do elemento passado o ion-icon por meio da classe hidden
    const selectedOptionIcon = menuOptionSelected.querySelector("." + classOption + " .hidden");

    const previousSelectedOption = document.querySelector("." + classOption + " .menu__option--selected");
    const previousSelectedOptionIcon = document.querySelector("." + classOption + " .menu__option--selected > ion-icon");

    if(previousSelectedOption !== null){
        previousSelectedOption.classList.remove("menu__option--selected");
        previousSelectedOptionIcon.classList.add("hidden");
    }

    menuOptionSelected.classList.add("menu__option--selected");
    selectedOptionIcon.classList.remove("hidden");

    checkOrderStatus(classOption);
}

//Verifica se o usuario selecionou os 3 itens do menu
function checkOrderStatus(classOption){

    if(foodSelected === 0 && classOption === "menu__options-foods"){
        foodSelected = 1;
    } else if(beverageSelected === 0 && classOption === "menu__options-beverages"){
        beverageSelected = 1;
    } else if(dessertSelected === 0 && classOption === "menu__options-desserts"){
        dessertSelected = 1;
    }

    if((foodSelected + beverageSelected + dessertSelected) === 3){
        enableOrderButton();
    }
}

//Habilita o botao para o usuario fechar o pedido
function enableOrderButton(){
    const footerButton = document.querySelector(".footer__button");
    footerButton.classList.add("footer__button--enabled");
    footerButton.removeAttribute("disabled");
    footerButton.innerHTML = "Fechar pedido";
}