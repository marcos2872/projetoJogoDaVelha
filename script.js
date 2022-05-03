const board = document.querySelector(".board");
const jogo = document.querySelectorAll(".jogo");
const containerText = document.querySelector(".container-text");
const texto = document.querySelector(".texto");
const reiniciar = document.querySelector(".reiniciar");
const placarX = document.querySelector('.placarX');
const placarO = document.querySelector('.placarO');
const placarEmpate = document.querySelector('.empate');

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

let contX = 0;
let contO = 0;
let contEmpate = 0;

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
            contX += 1;
            placar();
            return;
          }
          empate();
          return;
        }
        if (classe === "o") {
          e.target.classList.add(classe);
          classe = "x";
          o.push(Number(e.target.id));
          if (verificar(o)) {
            containerText.style.display = "flex";
            texto.innerText = "O Ganhou!!";
            contO += 1;
            placar();
            return;
          }
          empate();
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

function empate() {
  let cont = 0;
  for (let i of jogo) {
    if (i.classList.contains("o") || i.classList.contains("x")) {
      cont += 1;
    }
  }
  if (cont === 9) {
    containerText.style.display = "flex";
    texto.innerText = "Empate!!";
    contEmpate += 1;
    placar();
  }
}


function placar() {
  if(contX === 1) {
    placarX.innerText = `X tem ${contX} vitória`;
  }
if(contX > 1) {
  placarX.innerText = `X tem ${contX} vitórias`;
}

if(contO === 1) {
  placarO.innerText = `O tem ${contO} vitória`;
}
if(contO > 1) {
placarO.innerText = `O tem ${contO} vitórias`;
}

if(contEmpate === 1) {
  placarEmpate.innerText = `Empate: ${contEmpate} `;
}
if(contEmpate > 1) {
placarEmpate.innerText = `Empates: ${contEmpate} `;
}
}
placar();