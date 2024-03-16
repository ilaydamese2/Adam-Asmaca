
const defaultWords = ["javascript", "html", "css", "react", "python"];
let localStorageWords = localStorage.getItem("words") ? JSON.parse(localStorage.getItem("words")) : [];
let words = [...localStorageWords];


let chosenWord = "";
let guessedWord = [];
let remainingGuesses = 4;


function chooseWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    guessedWord = chosenWord.split("").map(letter => (letter === " " ? " " : "*"));
    document.getElementById("word-display").innerText = guessedWord.join("");
}


function guessLetter(letter) {
    letter = letter.toLowerCase();
    let correctGuess = false;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            guessedWord[i] = letter;
            correctGuess = true;
        }
    }
    if (!correctGuess) {
        remainingGuesses--;
        document.getElementById("guess-count").innerText = remainingGuesses;
        if (remainingGuesses === 0) {
            endGame(false);
        }
    }
    updateDisplay();
    if (!guessedWord.includes("*")) {
        endGame(true);
    }
}


function endGame(win) {
    if (win) {
        alert("Tebrikler! Kelimeyi buldunuz.");
    } else {
        alert("Üzgünüm, kelimeyi bulamadınız. Doğru kelime: " + chosenWord);
    }
    document.getElementById("guess-input").disabled = true;
    document.getElementById("guess-btn").disabled = true;
    document.getElementById("new-game-btn").style.display = "block";
}

function updateDisplay() {
    document.getElementById("word-display").innerText = guessedWord.join("");
}


document.getElementById("guess-btn").addEventListener("click", function() {
    let letter = document.getElementById("guess-input").value;
    if (letter.length === 1 && letter.match(/[a-z]/i)) {
        guessLetter(letter);
    } else {
        alert("Lütfen geçerli bir harf girin.");
    }
    document.getElementById("guess-input").value = "";
});


document.getElementById("new-game-btn").addEventListener("click", function() {
    document.getElementById("guess-input").disabled = false;
    document.getElementById("guess-btn").disabled = false;
    remainingGuesses = 4;
    document.getElementById("guess-count").innerText = remainingGuesses;
    chooseWord();
    document.getElementById("new-game-btn").style.display = "none";
});


document.getElementById("view-words-btn").addEventListener("click", function() {
    let wordListContainer = document.getElementById("word-list-container");
    if (!wordListContainer) {
        wordListContainer = document.createElement("div");
        wordListContainer.id = "word-list-container";
        wordListContainer.classList.add("word-list");
        document.body.appendChild(wordListContainer);
    } else {
        wordListContainer.style.display = "block";
        wordListContainer.innerHTML = "";
    }

    words.forEach(word => {
        let wordItem = document.createElement("div");
        wordItem.innerText = word;

       
        let editButton = document.createElement("button2");
        editButton.innerText = "Düzenle";
        editButton.classList.add("button2");
        editButton.addEventListener("click", function() {
            let newWord = prompt("Yeni kelimeyi girin:", word);
            if (newWord && newWord.trim() !== "") {
                words[words.indexOf(word)] = newWord.trim().toLowerCase();
                refreshWordList();
                saveToLocalStorage();
            } else {
                alert("Geçerli bir kelime girin.");
            }
        });
        wordItem.appendChild(editButton);

       
        let deleteButton = document.createElement("button3");
        deleteButton.innerText = "Sil";
        deleteButton.classList.add("button3");
        deleteButton.addEventListener("click", function() {
            if (confirm("Bu kelimeyi silmek istediğinize emin misiniz?")) {
                words.splice(words.indexOf(word), 1);
                refreshWordList();
                saveToLocalStorage();
            }
        });
        wordItem.appendChild(deleteButton);

        wordListContainer.appendChild(wordItem);
    });

    
    let addWordButton = document.getElementById("add-word-button");
    if (!addWordButton) {
        addWordButton = document.createElement("button");
        addWordButton.id = "add-word-button";
        addWordButton.innerText = "Yeni Kelime Ekle";
        addWordButton.classList.add("button");
        addWordButton.addEventListener("click", function() {
            let newWord = prompt("Eklemek istediğiniz yeni kelimeyi girin:");
            if (newWord && newWord.trim() !== "") {
                words.push(newWord.trim().toLowerCase());
                refreshWordList();
                saveToLocalStorage();
            } else {
                alert("Geçerli bir kelime girin.");
            }
        });
        document.body.appendChild(addWordButton);
    }
    
});


function refreshWordList() {
    let wordListContainer = document.getElementById("word-list-container");
    if (wordListContainer) {
        wordListContainer.innerHTML = "";
        words.forEach(word => {
            let wordItem = document.createElement("div");
            wordItem.innerText = word;

            let editButton = document.createElement("button2");
            editButton.innerText = "Düzenle";
            editButton.classList.add("button2");
            editButton.addEventListener("click", function() {
                let newWord = prompt("Yeni kelimeyi girin:", word);
                if (newWord && newWord.trim() !== "") {
                    words[words.indexOf(word)] = newWord.trim().toLowerCase();
                    refreshWordList();
                    saveToLocalStorage();
                } else {
                    alert("Geçerli bir kelime girin.");
                }
            });
            wordItem.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Sil";
            deleteButton.classList.add("button");
            deleteButton.addEventListener("click", function() {
                if (confirm("Bu kelimeyi silmek istediğinize emin misiniz?")) {
                    words.splice(words.indexOf(word), 1);
                    refreshWordList();
                    saveToLocalStorage();
                }
            });
            wordItem.appendChild(deleteButton);

            wordListContainer.appendChild(wordItem);
        });
    }
}


function saveToLocalStorage() {
    localStorage.setItem("words", JSON.stringify(words));
}


document.addEventListener("DOMContentLoaded", function() {
    chooseWord();
});
