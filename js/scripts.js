
//inicialização de variáveis globais para verificar se as 3 opções do menu foram selecionadas
let foodSelected = 0;
let beverageSelected = 0;
let dessertSelected = 0;

let selectedFoodName;
let selectedFoodPrice;
let selectedBeverageName;
let selectedBeveragePrice;
let selectedDessertName;
let selectedDessertPrice;

let orderMsg;

//Adiciona ou remove o layout de selecionado no item clicado pelo usuario
function selectMenuOption(menuOptionSelected){

    //Pega a classe identificadora do tipo de opcao
    const classOption = menuOptionSelected.parentElement.classList.item(1);

    //Pega o nome e o preco do item selecionado
    const selectedOptionName = menuOptionSelected.children.item(2).innerHTML;
    const selectedOptionPrice = menuOptionSelected.children.item(4).innerHTML;

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

    checkOrderStatus(classOption, selectedOptionName, selectedOptionPrice);
}

//Verifica se o usuario selecionou os 3 itens do menu
function checkOrderStatus(classOption, selectedOptionName, selectedOptionPrice){

    if(foodSelected === 0 && classOption === "menu__options-foods"){
        foodSelected = 1;
        selectedFoodName = selectedOptionName;
        selectedFoodPrice = selectedOptionPrice;
    } else if(beverageSelected === 0 && classOption === "menu__options-beverages"){
        beverageSelected = 1;
        selectedBeverageName  = selectedOptionName;
        selectedBeveragePrice = selectedOptionPrice;

    } else if(dessertSelected === 0 && classOption === "menu__options-desserts"){
        dessertSelected = 1;
        selectedDessertName  = selectedOptionName;
        selectedDessertPrice = selectedOptionPrice;
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

//Exibe ao usuario os detalhes do pedido
function checkOrder(){
    const userName = prompt("Por favor, informe seu nome:");
    const userAddress = prompt("Por favor, informe seu endereço:");
    const totalPrice = convertPrice(selectedFoodPrice) + convertPrice(selectedBeveragePrice) + convertPrice(selectedDessertPrice);
    const orderBox = document.querySelector(".order");

    orderMsg = `Olá, gostaria de fazer o pedido:\n- Prato: ${selectedFoodName}\n- Bebida: ${selectedBeverageName}\n- Sobremesa: ${selectedDessertName}\nTotal: R$ ${totalPrice.toFixed(2)}\n\nNome: ${userName}\nEndereço: ${userAddress}`;
    orderBox.classList.remove("hidden");
    document.querySelector(".order__box-row-food-name").innerHTML = selectedFoodName;
    document.querySelector(".order__box-row-food-price").innerHTML = selectedFoodPrice;
    document.querySelector(".order__box-row-beverage-name").innerHTML = selectedBeverageName;
    document.querySelector(".order__box-row-beverage-price").innerHTML = selectedBeveragePrice;
    document.querySelector(".order__box-row-dessert-name").innerHTML = selectedDessertName;
    document.querySelector(".order__box-row-dessert-price").innerHTML = selectedDessertPrice;
    document.querySelector(".order__box-row-total-price").innerHTML = `R$ ${totalPrice.toFixed(2)}`;
}

//Retorna a tela do menu
function cancelOrder(){
    const orderBox = document.querySelector(".order");
    orderBox.classList.add("hidden");
    foodSelected = 0;
    beverageSelected = 0;
    dessertSelected = 0;
}

//Envia o pedido por wpp
function sendOrder(){
    const encodededMsg = encodeURIComponent(orderMsg);
    window.location.href='https://wa.me/5521996297000?text=' + encodededMsg;
}

//Transforma o valor recebido em valor numérico
function convertPrice(price){
    return Number(price.substring(2).replace(",", "."))
}