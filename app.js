(() => {
  "use strict";

  const questions = Array.isArray(window.GAME_QUESTIONS) ? window.GAME_QUESTIONS : [];
  const params = new URLSearchParams(window.location.search);
  const isBoardMode = params.get("mode") === "board";
  const storageKey = "cien-mexicanos-state-v4";
  const channelName = "cien-mexicanos-channel-v4";
  const channel = "BroadcastChannel" in window ? new BroadcastChannel(channelName) : null;
  const history = [];
  let toastTimer = null;
  let lastEffectId = null;

  const freshState = () => ({
    currentQuestion: 0,
    revealed: [],
    strikes: [0, 0],
    scores: [0, 0],
    teamNames: ["Equipo Verde", "Equipo Rojo"],
    multiplier: 1,
    bankAwarded: false,
    exactAwarded: false,
    exactAnswerShown: false,
    showWinner: false,
    soundEnabled: true,
    effect: null
  });

  const safeState = (candidate) => {
    const base = freshState();
    if (!candidate || typeof candidate !== "object") return base;
    const candidateScores = Array.isArray(candidate.scores) ? candidate.scores : base.scores;
    const candidateNames = Array.isArray(candidate.teamNames) ? candidate.teamNames : base.teamNames;
    const candidateStrikes = Array.isArray(candidate.strikes)
      ? candidate.strikes
      : [Number(candidate.strikes) || 0, 0];
    return {
      ...base,
      ...candidate,
      currentQuestion: clamp(Number(candidate.currentQuestion) || 0, 0, Math.max(questions.length - 1, 0)),
      scores: [
        Math.max(0, Number(candidateScores[0]) || 0),
        Math.max(0, Number(candidateScores[1]) || 0)
      ],
      teamNames: [
        String(candidateNames[0] || base.teamNames[0]).slice(0, 24),
        String(candidateNames[1] || base.teamNames[1]).slice(0, 24)
      ],
      revealed: Array.isArray(candidate.revealed) ? candidate.revealed.map(Boolean) : [],
      strikes: [
        clamp(Number(candidateStrikes[0]) || 0, 0, 3),
        clamp(Number(candidateStrikes[1]) || 0, 0, 3)
      ],
      multiplier: [1, 2, 3].includes(Number(candidate.multiplier)) ? Number(candidate.multiplier) : 1
    };
  };

  let state = (() => {
    try {
      return safeState(JSON.parse(localStorage.getItem(storageKey)));
    } catch {
      return freshState();
    }
  })();

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  if (isBoardMode) {
    document.body.classList.add("board-mode");
    setTimeout(() => document.body.classList.add("hide-fullscreen-button"), 5000);
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function currentQuestion() {
    return questions[state.currentQuestion] || null;
  }

  function pointsInPlay() {
    const question = currentQuestion();
    if (!question) return 0;
    if (question.type === "exact") return question.points * state.multiplier;
    return question.answers.reduce((total, answer, index) => {
      return total + (state.revealed[index] ? answer.points * state.multiplier : 0);
    }, 0);
  }

  function snapshot() {
    history.push(JSON.stringify({ ...state, effect: null }));
    if (history.length > 30) history.shift();
  }

  function commit(effect = null) {
    if (effect) {
      state.effect = { type: effect, id: `${Date.now()}-${Math.random()}` };
    }
    localStorage.setItem(storageKey, JSON.stringify(state));
    channel?.postMessage({ type: "state", state });
    render();
  }

  function update(mutator, effect = null) {
    snapshot();
    mutator();
    commit(effect);
  }

  function resetQuestion(index = state.currentQuestion) {
    state.currentQuestion = clamp(index, 0, Math.max(questions.length - 1, 0));
    const question = currentQuestion();
    state.revealed = question?.type === "survey" ? question.answers.map(() => false) : [];
    state.strikes = [0, 0];
    state.bankAwarded = false;
    state.exactAwarded = false;
    state.exactAnswerShown = false;
    state.showWinner = false;
  }

  function render() {
    const question = currentQuestion();
    if (!question) {
      $("#questionText").textContent = "Agrega preguntas para comenzar";
      $("#answerGrid").innerHTML = "";
      return;
    }

    $("#teamNameA").textContent = state.teamNames[0] || "Equipo A";
    $("#teamNameB").textContent = state.teamNames[1] || "Equipo B";
    $("#scoreA").textContent = String(state.scores[0]).padStart(3, "0");
    $("#scoreB").textContent = String(state.scores[1]).padStart(3, "0");
    $("#questionCategory").textContent = question.category;
    $("#questionText").textContent = question.question;
    $("#questionType").textContent = question.type === "survey"
      ? `RESPUESTAS POPULARES · ${question.answers.length} EN EL TABLERO`
      : `RESPUESTA DIRECTA · ${question.points * state.multiplier} PUNTOS`;
    $("#pointsBank").textContent = pointsInPlay();
    $("#bankLabel").textContent = question.type === "exact" ? "VALOR DE LA PREGUNTA" : "TOTAL PUNTOS";

    renderAnswers(question);
    renderWinner();
    $$("[data-team-strike]").forEach((element) => {
      const teamIndex = Number(element.dataset.teamStrike);
      const strikeNumber = Number(element.dataset.strike);
      element.classList.toggle("is-active", strikeNumber <= state.strikes[teamIndex]);
    });

    if (!isBoardMode) renderControls(question);
    triggerEffect();
  }

  function renderAnswers(question) {
    const grid = $("#answerGrid");
    grid.classList.toggle("is-exact", question.type === "exact");

    if (question.type === "exact") {
      grid.innerHTML = answerTileMarkup({
        index: 0,
        text: question.answer,
        points: question.points * state.multiplier,
        revealed: state.exactAnswerShown,
        exact: true
      });
      return;
    }

    grid.innerHTML = question.answers.map((answer, index) => answerTileMarkup({
      index,
      text: answer.text,
      points: answer.points * state.multiplier,
      revealed: Boolean(state.revealed[index]),
      exact: false
    })).join("");
  }

  function renderWinner() {
    const overlay = $("#winnerOverlay");
    overlay.hidden = !state.showWinner;
    if (!state.showWinner) return;

    const isTie = state.scores[0] === state.scores[1];
    const winnerIndex = state.scores[0] > state.scores[1] ? 0 : 1;
    $("#winnerLabel").textContent = isTie ? "RESULTADO FINAL" : "EQUIPO GANADOR";
    $("#winnerName").textContent = isTie ? "¡Empate!" : state.teamNames[winnerIndex];
    $("#winnerScore").textContent = isTie
      ? `${state.scores[0]} puntos por equipo`
      : `${state.scores[winnerIndex]} puntos`;
  }

  function answerTileMarkup({ index, text, points, revealed, exact }) {
    const disabled = isBoardMode ? "disabled" : "";
    return `
      <button class="answer-tile ${revealed ? "is-revealed" : ""} ${exact ? "exact-tile" : ""}"
        type="button" data-answer-index="${index}" ${disabled}
        aria-label="${revealed ? `Respuesta ${index + 1}: ${escapeHtml(text)}, ${points} puntos` : `Respuesta ${index + 1}, oculta`}">
        <span class="answer-tile-inner">
          <span class="answer-face answer-front">
            <span class="answer-number">${exact ? "?" : index + 1}</span>
            <span>${exact ? "RESPUESTA ÚNICA" : "RESPUESTA OCULTA"}</span>
          </span>
          <span class="answer-face answer-back">
            <span class="answer-number answer-number--back">${exact ? "?" : index + 1}</span>
            <span class="answer-text">${escapeHtml(text)}</span>
            <span class="answer-points">${points}</span>
          </span>
        </span>
      </button>`;
  }

  function renderControls(question) {
    $("#controlQuestionCount").textContent = `${state.currentQuestion + 1} / ${questions.length}`;
    $("#controlQuestionText").textContent = question.question;
    $("#previousQuestion").disabled = state.currentQuestion === 0;
    $("#nextQuestion").disabled = state.currentQuestion === questions.length - 1;
    $("#controlBank").textContent = pointsInPlay();
    $("#strikeCount").textContent = `Verde ${state.strikes[0]}/3 · Rojo ${state.strikes[1]}/3`;
    $("#teamNameInputA").value = state.teamNames[0];
    $("#teamNameInputB").value = state.teamNames[1];
    $("#awardA").textContent = state.teamNames[0];
    $("#awardB").textContent = state.teamNames[1];
    $("#correctA").textContent = `✓ Correcta · ${state.teamNames[0]}`;
    $("#correctB").textContent = `✓ Correcta · ${state.teamNames[1]}`;
    $("#soundToggle").checked = state.soundEnabled;
    $("#finishGame").textContent = state.showWinner ? "← Volver al tablero" : "★ Mostrar equipo ganador";
    $("#finishGame").classList.toggle("is-active", state.showWinner);

    $$("[data-multiplier]").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.multiplier) === state.multiplier);
    });

    const isSurvey = question.type === "survey";
    $("#answerControls").hidden = !isSurvey;
    $("#exactControls").hidden = isSurvey;
    $("#awardSection").hidden = !isSurvey;
    $("#answerControlTitle").textContent = isSurvey ? "Revelar respuestas" : "Validar respuesta";

    if (isSurvey) {
      const revealedTotal = state.revealed.filter(Boolean).length;
      $("#revealedCount").textContent = `${revealedTotal} / ${question.answers.length}`;
      $("#answerControls").innerHTML = question.answers.map((answer, index) => `
        <button class="answer-control ${state.revealed[index] ? "is-revealed" : ""}"
          data-control-answer-index="${index}" type="button" ${state.bankAwarded ? "disabled" : ""}>
          <span class="answer-control-number">${index + 1}</span>
          <span class="answer-control-text">${escapeHtml(answer.text)}</span>
          <span class="answer-control-points">${answer.points * state.multiplier}</span>
        </button>`).join("");
      $("#awardA").disabled = state.bankAwarded || pointsInPlay() === 0;
      $("#awardB").disabled = state.bankAwarded || pointsInPlay() === 0;
    } else {
      $("#revealedCount").textContent = `${question.points * state.multiplier} pts`;
      $("#correctAnswerPreview").textContent = question.answer;
      $("#revealExact").textContent = state.exactAnswerShown ? "Ocultar respuesta del tablero" : "Mostrar respuesta en el tablero";
      $("#correctA").disabled = state.exactAwarded;
      $("#correctB").disabled = state.exactAwarded;
    }

    $("#addStrikeA").disabled = state.strikes[0] >= 3;
    $("#addStrikeB").disabled = state.strikes[1] >= 3;
    $("#removeStrikeA").disabled = state.strikes[0] <= 0;
    $("#removeStrikeB").disabled = state.strikes[1] <= 0;
    $("#undoAction").disabled = history.length === 0;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function revealAnswer(index) {
    const question = currentQuestion();
    if (!question) return;
    if (question.type === "exact") {
      const willReveal = !state.exactAnswerShown;
      update(() => { state.exactAnswerShown = willReveal; }, willReveal ? "correct" : null);
      if (willReveal) playCorrectSound();
      return;
    }
    if (state.bankAwarded || index < 0 || index >= question.answers.length) return;
    const willReveal = !state.revealed[index];
    update(() => { state.revealed[index] = willReveal; }, willReveal ? "correct" : null);
    if (willReveal) playCorrectSound();
  }

  function addStrike(teamIndex) {
    if (![0, 1].includes(teamIndex) || state.strikes[teamIndex] >= 3) return;
    update(() => { state.strikes[teamIndex] += 1; }, "strike");
    playErrorSound();
  }

  function removeStrike(teamIndex) {
    if (![0, 1].includes(teamIndex) || state.strikes[teamIndex] <= 0) return;
    update(() => { state.strikes[teamIndex] -= 1; });
  }

  function awardSurvey(teamIndex) {
    const points = pointsInPlay();
    const question = currentQuestion();
    if (!question || question.type !== "survey" || state.bankAwarded || points <= 0) return;
    update(() => {
      state.scores[teamIndex] += points;
      state.bankAwarded = true;
    }, "celebrate");
    playWinSound();
    showToast(`${state.teamNames[teamIndex]} recibe ${points} puntos`);
  }

  function awardExact(teamIndex) {
    const question = currentQuestion();
    if (!question || question.type !== "exact" || state.exactAwarded) return;
    const points = question.points * state.multiplier;
    update(() => {
      state.scores[teamIndex] += points;
      state.exactAwarded = true;
      state.exactAnswerShown = true;
    }, "celebrate");
    playWinSound();
    showToast(`¡Correcta! ${state.teamNames[teamIndex]} recibe ${points} puntos`);
  }

  function goToQuestion(delta) {
    const nextIndex = clamp(state.currentQuestion + delta, 0, Math.max(questions.length - 1, 0));
    if (nextIndex === state.currentQuestion) return;
    snapshot();
    resetQuestion(nextIndex);
    commit("next");
  }

  function setMultiplier(value) {
    if (![1, 2, 3].includes(value)) return;
    update(() => { state.multiplier = value; });
  }

  function openBoard() {
    const boardUrl = new URL(window.location.href);
    boardUrl.searchParams.set("mode", "board");
    const boardWindow = window.open(boardUrl.toString(), "encuestaMexicanaBoard");
    if (!boardWindow) {
      showToast("El navegador bloqueó la ventana. Permite ventanas emergentes e inténtalo de nuevo.");
      return;
    }
    showToast("Tablero abierto. Muévelo al proyector y presiona F para pantalla completa.");
  }

  function requestFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.();
    }
  }

  function undo() {
    const previous = history.pop();
    if (!previous) return;
    state = safeState(JSON.parse(previous));
    commit();
    showToast("Última acción deshecha");
  }

  function resetGame() {
    const confirmed = window.confirm("¿Reiniciar todo el juego? Los marcadores volverán a cero.");
    if (!confirmed) return;
    snapshot();
    const names = [...state.teamNames];
    const soundEnabled = state.soundEnabled;
    state = freshState();
    state.teamNames = names;
    state.soundEnabled = soundEnabled;
    resetQuestion(0);
    commit("next");
    showToast("Juego reiniciado");
  }

  function toggleWinner() {
    const willShow = !state.showWinner;
    update(() => {
      state.showWinner = willShow;
    }, willShow ? "celebrate" : null);
    if (willShow) playWinSound();
  }

  function adjustScore(teamIndex, delta) {
    update(() => {
      state.scores[teamIndex] = Math.max(0, state.scores[teamIndex] + delta);
    });
  }

  function setTeamName(teamIndex, value) {
    state.teamNames[teamIndex] = value.trim().slice(0, 24) || `Equipo ${teamIndex === 0 ? "Verde" : "Rojo"}`;
    commit();
  }

  function triggerEffect() {
    if (!state.effect || state.effect.id === lastEffectId) return;
    lastEffectId = state.effect.id;
    if (state.effect.type === "strike") showBigStrike();
    if (state.effect.type === "celebrate") showConfetti();
  }

  function showBigStrike() {
    const element = document.createElement("div");
    element.className = "big-strike";
    element.textContent = "×";
    $("#effectLayer").append(element);
    window.setTimeout(() => element.remove(), 850);
  }

  function showConfetti() {
    const colors = ["#f4c44e", "#ffffff", "#31d096", "#ff6b6f", "#3b79d8"];
    for (let index = 0; index < 54; index += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty("--piece-color", colors[index % colors.length]);
      piece.style.setProperty("--fall-time", `${1.4 + Math.random() * 1.5}s`);
      piece.style.setProperty("--drift", `${-130 + Math.random() * 260}px`);
      piece.style.setProperty("--rotation", `${Math.random() * 360}deg`);
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      $("#effectLayer").append(piece);
      window.setTimeout(() => piece.remove(), 3300);
    }
  }

  function showToast(message) {
    if (isBoardMode) return;
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function audioContext() {
    if (!state.soundEnabled || isBoardMode) return null;
    const Context = window.AudioContext || window.webkitAudioContext;
    return Context ? new Context() : null;
  }

  function tone(context, frequency, start, duration, type = "sine", gainValue = 0.12) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + start);
    gain.gain.setValueAtTime(0.0001, context.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(gainValue, context.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + start + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + start);
    oscillator.stop(context.currentTime + start + duration + 0.02);
  }

  function playCorrectSound() {
    const context = audioContext();
    if (!context) return;
    tone(context, 523.25, 0, 0.13, "sine", 0.1);
    tone(context, 659.25, 0.11, 0.13, "sine", 0.1);
    tone(context, 783.99, 0.22, 0.22, "sine", 0.12);
    window.setTimeout(() => context.close(), 700);
  }

  function playErrorSound() {
    const context = audioContext();
    if (!context) return;
    tone(context, 145, 0, 0.46, "sawtooth", 0.13);
    tone(context, 116, 0.06, 0.4, "square", 0.06);
    window.setTimeout(() => context.close(), 650);
  }

  function playWinSound() {
    const context = audioContext();
    if (!context) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      tone(context, frequency, index * 0.1, 0.28, "triangle", 0.1);
    });
    window.setTimeout(() => context.close(), 1000);
  }

  function attachEvents() {
    $("#answerGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-answer-index]");
      if (!button || isBoardMode) return;
      revealAnswer(Number(button.dataset.answerIndex));
    });

    if (isBoardMode) {
      $("#boardFullscreen").addEventListener("click", requestFullscreen);
      document.addEventListener("mousemove", () => {
        document.body.classList.remove("hide-fullscreen-button");
        window.clearTimeout(document.body.fullscreenHideTimer);
        document.body.fullscreenHideTimer = window.setTimeout(() => document.body.classList.add("hide-fullscreen-button"), 2500);
      });
      return;
    }

    $("#answerControls").addEventListener("click", (event) => {
      const button = event.target.closest("[data-control-answer-index]");
      if (button) revealAnswer(Number(button.dataset.controlAnswerIndex));
    });
    $("#previousQuestion").addEventListener("click", () => goToQuestion(-1));
    $("#nextQuestion").addEventListener("click", () => goToQuestion(1));
    $("#multiplierButtons").addEventListener("click", (event) => {
      const button = event.target.closest("[data-multiplier]");
      if (button) setMultiplier(Number(button.dataset.multiplier));
    });
    $("#addStrikeA").addEventListener("click", () => addStrike(0));
    $("#addStrikeB").addEventListener("click", () => addStrike(1));
    $("#removeStrikeA").addEventListener("click", () => removeStrike(0));
    $("#removeStrikeB").addEventListener("click", () => removeStrike(1));
    $("#awardA").addEventListener("click", () => awardSurvey(0));
    $("#awardB").addEventListener("click", () => awardSurvey(1));
    $("#correctA").addEventListener("click", () => awardExact(0));
    $("#correctB").addEventListener("click", () => awardExact(1));
    $("#revealExact").addEventListener("click", () => revealAnswer(0));
    $("#openBoard").addEventListener("click", openBoard);
    $("#finishGame").addEventListener("click", toggleWinner);
    $("#undoAction").addEventListener("click", undo);
    $("#resetGame").addEventListener("click", resetGame);
    $("#soundToggle").addEventListener("change", (event) => {
      state.soundEnabled = event.target.checked;
      commit();
    });
    $("#teamNameInputA").addEventListener("change", (event) => setTeamName(0, event.target.value));
    $("#teamNameInputB").addEventListener("change", (event) => setTeamName(1, event.target.value));
    $$("[data-score-team]").forEach((button) => {
      button.addEventListener("click", () => adjustScore(Number(button.dataset.scoreTeam), Number(button.dataset.scoreDelta)));
    });
  }

  function handleKeyboard(event) {
    const tag = event.target.tagName;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
    const key = event.key.toLowerCase();

    if (isBoardMode && key === "f") {
      event.preventDefault();
      requestFullscreen();
      return;
    }
    if (isBoardMode) return;

    if (/^[1-8]$/.test(key)) revealAnswer(Number(key) - 1);
    else if (key === "z") addStrike(0);
    else if (key === "x") addStrike(1);
    else if (key === "a") currentQuestion()?.type === "exact" ? awardExact(0) : awardSurvey(0);
    else if (key === "b") currentQuestion()?.type === "exact" ? awardExact(1) : awardSurvey(1);
    else if (key === "u") undo();
    else if (key === "g") toggleWinner();
    else if (event.key === "ArrowRight") goToQuestion(1);
    else if (event.key === "ArrowLeft") goToQuestion(-1);
  }

  channel?.addEventListener("message", (event) => {
    if (event.data?.type !== "state") return;
    state = safeState(event.data.state);
    render();
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey || !event.newValue) return;
    try {
      state = safeState(JSON.parse(event.newValue));
      render();
    } catch {
      // Ignora estados incompletos de otra pestaña.
    }
  });

  document.addEventListener("keydown", handleKeyboard);
  attachEvents();
  resetQuestion(state.currentQuestion);
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) state = safeState(saved);
  } catch {
    state = freshState();
  }
  render();
})();
