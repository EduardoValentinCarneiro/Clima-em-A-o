// Garante que a página sempre volte ao topo ao recarregar (F5)
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  setTimeout(() => window.scrollTo(0, 0), 50); // reforço extra para navegadores que mantêm posição
});

// Efeito aparecer ao rolar
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
fadeEls.forEach(el => observer.observe(el));

/* --- QUIZ --- */
const quizData = [
  {
    question: "1️⃣ O que causa o aumento do efeito estufa?",
    options: ["A) Plantar árvores", "B) Queima de combustíveis fósseis", "C) Reciclagem", "D) Energia solar"],
    answer: 1
  },
  {
    question: "2️⃣ Qual é uma consequência das mudanças climáticas?",
    options: ["A) Derretimento de geleiras", "B) Aumento de florestas", "C) Redução do calor", "D) Mais chuvas equilibradas"],
    answer: 0
  },
  {
    question: "3️⃣ O que o cidadão pode fazer para ajudar o planeta?",
    options: ["A) Jogar lixo nas ruas", "B) Economizar energia e água", "C) Poluir rios", "D) Desmatar"],
    answer: 1
  },
  {
    question: "4️⃣ O que os governos podem incentivar para reduzir emissões?",
    options: ["A) Carros elétricos e transporte público", "B) Queimadas", "C) Aumento de fábricas poluentes", "D) Mais plástico"],
    answer: 0
  },
  {
    question: "5️⃣ Qual dessas ações ajuda o meio ambiente?",
    options: ["A) Reutilizar e reciclar", "B) Jogar lixo no mar", "C) Gastar água à toa", "D) Queimar lixo"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const progress = document.getElementById("progress");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

function selectAnswer(i) {
  const q = quizData[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  if (i === q.answer) {
    buttons[i].style.background = "#43a047";
    score++;
  } else {
    buttons[i].style.background = "#e53935";
    buttons[q.answer].style.background = "#43a047";
  }
  nextBtn.style.display = "inline-block";
  progress.style.width = ((currentQuestion + 1) / quizData.length) * 100 + "%";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  progress.style.width = "100%";
  resultEl.innerHTML = `✅ Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas!<br><br>🌱 Continue aprendendo e cuidando do planeta!`;
}

loadQuestion();
