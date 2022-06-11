const tiles = document.querySelector(".tile-container") //. é pelo nome da classe
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow") //# é direto pelo id
const preferencesOptions = document.querySelector("#preferencesOptions") //# é direto pelo id
const keybordFirstRow = document.querySelector("#keybordFirstRow")
const keybordSecondRow = document.querySelector("#keybordSecondRow")
const keybordThirdRow = document.querySelector("#keybordThirdRow")

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const rows = 6
const columns = 5
let currentRow = 0
let currentColumn = 0

const letreco = "VASCO";
let letrecoMap = {}
for(let index = 0; index < letreco.length; index++){
    letrecoMap[letreco[index]] = index;
}

const guesses = []

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    //salvando as tentativas
    guesses[rowIndex] = new Array(columns);

    const tileRow = document.createElement("div");
    tileRow.setAttribute("id", "row"+rowIndex);
    tileRow.setAttribute("class", "tile-row");
    
    //Coloca um ID para cada bloquinho(linha e coluna)

    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const tileColumn = document.createElement("div");
        tileColumn.setAttribute("id", "row"+rowIndex+"column"+columnIndex);
        //caso foi a primeira fileira, é o typing, caso contrário disable
        tileColumn.setAttribute("class", rowIndex === 0 ? "tile-column typing" : "tile-column disabled");
        tileRow.append(tileColumn);
        guesses[rowIndex][columnIndex] = "";
    }
    tiles.append(tileRow);
    
}

const checkGuess = () =>{
    const guess = guesses[currentRow].join("") // juntando letras, sem espaços
    if(guess.length !== columns){
        return;
    }

    var currentColumns = document.querySelectorAll(".typing");

    for (let index = 0; index < columns; index++) {
        const letter = guess[index];

        if(letrecoMap[letter] === undefined){
            currentColumns[index].classList.add("wrong");
        } else { 
            if(letrecoMap[letter] === index){
                //letter find, in correct place
                currentColumns[index].classList.add("right");
            } else{
                //letter find, but in wrong place
                currentColumns[index].classList.add("displaced");
            }
        }
        
    }

    if(guess === letreco){
        window.alert("Parabéns, não fez mais que sua obrigação.");
    } 
    if (currentRow === rows - 1) {
        window.alert("Burro");
    } else {
        moveToNextRow();
    }
};

const moveToNextRow = () => {
    currentRow++;
    currentColumn = 0;
}

const handleKeybordOnClick = (key) => {
    //Como cada bloquinho foi adicionado um ID anteriomente, poderemos acessa-lo aqui
    if(currentColumn === columns){
        return
    }
    
    const currentTile = document.querySelector(
        "#row"+currentRow+"column"+currentColumn
    );
    currentTile.textContent = key;
    //coloca as letras na matriz
    guesses[currentRow][currentColumn] = key
    currentColumn++;
};

const createKeybordRow = (keys, keybordRow) =>{
    keys.forEach((key) => {
        var buttonElement = document.createElement("button");
        buttonElement.textContent = key;
        buttonElement.setAttribute("id", key);
        buttonElement.addEventListener("click", () => handleKeybordOnClick(key));
        keybordRow.append(buttonElement);
    });
};

createKeybordRow(keysFirstRow, keybordFirstRow)
createKeybordRow(keysSecondRow, keybordSecondRow)
createKeybordRow(keysThirdRow, keybordThirdRow)

const handleBackspace = () =>{
    console.log("apaga")
} 

const backspaceButton = document.createElement("button")
backspaceButton.addEventListener("click", handleBackspace)
backspaceButton.textContent = "<"
backspaceAndEnterRow.append(backspaceButton)

const enterButton = document.createElement("button")
enterButton.addEventListener("click", checkGuess)
enterButton.textContent = "ENTER"
backspaceAndEnterRow.append(enterButton)

const preferences = document.createElement("button");
preferences.addEventListener("click", checkGuess);
preferences.textContent = "Preferencias";
backspaceAndEnterRow.append(preferences);