const board = document.querySelector(".board");
const jogo = document.querySelectorAll(".jogo");
const containerText = document.querySelector(".container-text");
const texto = document.querySelector(".texto");
const reiniciar = document.querySelector(".reiniciar");

function verificar(arrayJogo) {
  const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let checker = (array, combinacao) =>
    combinacao.every((el) => array.includes(el));

  for (const combi of combinacoes) {
    if (checker(arrayJogo, combi)) return true;
  }
  return false;
}

let x = [];
let o = [];
let classe = "x";
function clickXO() {
  for (let index = 0; index < jogo.length; index += 1) {
    jogo[index].addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("x") &&
        !e.target.classList.contains("o")
      ) {
        if (classe === "x") {
          e.target.classList.add(classe);
          classe = "o";
          x.push(Number(e.target.id));
          if (verificar(x)) {
            containerText.style.display = "flex";
            texto.innerText = "X Ganhou!!";
            return;
          }

          return;
        }
        if (classe === "o") {
          e.target.classList.add(classe);
          classe = "x";
          o.push(Number(e.target.id));
          if (verificar(o)) {
            containerText.style.display = "flex";
            texto.innerText = "O Ganhou!!";
            return;
          }
          return;
        }
      }
    });
  }
}
clickXO();

function reset() {
  reiniciar.addEventListener("click", () => {
    containerText.style.display = "none";
    texto.innerText = "";
    x = [];
    o = [];
    for (const i of jogo) {
      if (i.classList.contains("x")) {
        i.classList.remove("x");
      }
      if (i.classList.contains("o")) {
        i.classList.remove("o");
      }
    }
  });
}
reset();
