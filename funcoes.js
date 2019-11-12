const maximoPontos = 15;
let numeroPontos = 15;

const atributos = {
  forca: 0,
  destreza: 0,
  saude: 0,
  inteligencia: 0,
  consciencia: 0,
  presenca: 0
};

const retornaPontos = () => {
  let classe = "text-success";
  if (numeroPontos > 5 && numeroPontos < 10) classe = "text-warning";
  if (numeroPontos < 5) classe = "text-danger";
  const conteudo = `Pontos: <span class="font-weight-bold font-italic ${classe}">${numeroPontos}</span>`;
  document.querySelector(".numero-pontos").innerHTML = conteudo;
};

const limparAtributos = () => {
  numeroPontos = 15;
  retornaPontos();
};

const atribuirPontos = evento => {
  const erros = document.querySelectorAll(".invalid-tooltip");
  erros.forEach(erro => {
    erro.classList.remove("d-block", "show");
  });

  const valorAnterior = atributos[evento.id];
  const valorNovo = parseInt(evento.value, 10);

  if (valorNovo > -1) {
    if (valorNovo > 10) {
      if (evento.parentNode.children[2]) {
        evento.parentNode.children[2].classList.add("d-block", "show");
        evento.value = valorAnterior;
      }
      return;
    }
    if (numeroPontos > 0 && valorNovo <= maximoPontos) {
      if (valorNovo > valorAnterior) {
        const diferencaPontos = numeroPontos - valorNovo;
        if (diferencaPontos <= numeroPontos && numeroPontos - valorNovo >= 0) {
          numeroPontos -= valorNovo;
        } else {
          evento.value = valorAnterior;
          document.querySelector(".alert").classList.add("show");
        }
      } else if (numeroPontos < maximoPontos) {
        numeroPontos += 1;
      }
      atributos[evento.id] = valorNovo;
    } else {
      evento.value = valorAnterior;
      document.querySelector(".alert").classList.add("show");
    }
  } else {
    evento.value = 0;
  }

  setTimeout(() => {
    document.querySelector(".alert").classList.remove("show");
  }, 10000);
  retornaPontos();
  calcularEstatisticas();
};

const calcularEstatisticas = () => {
  const iniciativa = document.querySelector("#iniciativa");
  const mov = document.querySelector("#mov");
  if (iniciativa && mov) {
    iniciativa.value = atributos.destreza;
    mov.value = atributos.destreza * 10;
  }

  const pvs = document.querySelector("#pvs");
  const pes = document.querySelector("#pes");
  const pms = document.querySelector("#pms");
  if (pvs && pes && pms) {
    pvs.value = atributos.saude * 10;
    pes.value = atributos.saude * 10;
    pms.value = atributos.saude * 10;
  }

  const armadura = document.querySelector("#forca-armadura");

  const forcaArmaA = document.querySelector("#forca-arma-a");
  const destrezaArmaA = document.querySelector("#destreza-arma-a");

  const forcaArmaDef = document.querySelector("#forca-arma-def");
  const destrezaArmaDef = document.querySelector("#destreza-arma-def");
  if (
    armadura &&
    forcaArmaA &&
    forcaArmaDef &&
    destrezaArmaA &&
    destrezaArmaDef
  ) {
    armadura.value = atributos.forca;
    forcaArmaA.value = atributos.forca;
    forcaArmaDef.value = atributos.forca;
    destrezaArmaA.value = atributos.destreza;
    destrezaArmaDef.value = atributos.destreza;
  }
};

const calculaTotalArma = () => {
  const forcaArmaA = document.querySelector("#forca-arma-a");
  const destrezaArmaA = document.querySelector("#destreza-arma-a");
  const danoArmaA = document.querySelector("#dano-arma-a");
  const totalArmaA = document.querySelector("#total-arma-a");

  if (forcaArmaA && destrezaArmaA && danoArmaA && totalArmaA) {
    totalArmaA.value =
      parseInt(forcaArmaA.value, 10) +
      parseInt(destrezaArmaA.value, 10) +
      parseInt(danoArmaA.value, 10);
  }

  const forcaArmaDef = document.querySelector("#forca-arma-def");
  const destrezaArmaDef = document.querySelector("#destreza-arma-def");
  const danoArmaDef = document.querySelector("#dano-arma-def");
  const totalArmaDef = document.querySelector("#total-arma-def");

  if (forcaArmaDef && destrezaArmaDef && danoArmaDef && totalArmaDef) {
    totalArmaDef.value =
      parseInt(forcaArmaDef.value, 10) +
      parseInt(danoArmaDef.value, 10) +
      parseInt(danoArmaDef.value, 10);
  }
};

const iniciarAcoes = () => {
  retornaPontos();
};

iniciarAcoes();
