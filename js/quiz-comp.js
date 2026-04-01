// ════════════════════════════════════════════════════════
// QUIZ COMPÉTITIF
// ════════════════════════════════════════════════════════

let compState = null;

function goQuizComp() {
  showPage('quiz-comp');
  resetCompState();
  showCompScreen('ready');
}

function resetCompState() {
  if (compState && compState.timerId) clearInterval(compState.timerId);
  compState = {
    lives: 3,
    score: 0,
    streak: 0,
    bestStreak: 0,
    answered: 0,
    pool: [],
    poolIndex: 0,
    allQuestions: [],
    timerId: null,
    timeLeft: 15,
    answeredThisQ: false
  };
  compState.allQuestions = getAllQuestions();
  compState.pool = shuffleArray([...Array(compState.allQuestions.length).keys()]);
  compState.poolIndex = 0;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showCompScreen(name) {
  document.querySelectorAll('.comp-screen').forEach(s => s.classList.remove('active'));
  document.getElementById('comp-screen-' + name).classList.add('active');
  // Reset rules view when showing rules
  if (name === 'rules') {
    document.querySelector('.comp-rules-box').style.display = 'block';
    document.getElementById('comp-countdown').style.display = 'none';
  }
}

function startCompCountdown() {
  document.querySelector('.comp-rules-box').style.display = 'none';
  const cdDiv = document.getElementById('comp-countdown');
  cdDiv.style.display = 'flex';
  const numEl = document.getElementById('comp-countdown-num');
  let count = 3;
  numEl.textContent = count;
  numEl.className = 'comp-cd-animate';

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      numEl.textContent = count;
      numEl.className = '';
      void numEl.offsetWidth;
      numEl.className = 'comp-cd-animate';
    } else if (count === 0) {
      numEl.textContent = 'GO!';
      numEl.className = '';
      void numEl.offsetWidth;
      numEl.className = 'comp-cd-animate';
    } else {
      clearInterval(interval);
      showCompScreen('quiz');
      renderCompHUD();
      nextCompQuestion();
    }
  }, 800);
}

function renderCompHUD() {
  const livesEl = document.getElementById('comp-lives');
  livesEl.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('span');
    heart.className = 'comp-heart' + (i < compState.lives ? '' : ' lost');
    heart.textContent = i < compState.lives ? '\u2764\uFE0F' : '\uD83D\uDDA4';
    livesEl.appendChild(heart);
  }
  document.getElementById('comp-score').textContent = compState.score;
  document.getElementById('comp-streak').textContent = compState.streak;
  document.getElementById('comp-best-streak').textContent = compState.bestStreak;
}

function nextCompQuestion() {
  if (compState.lives <= 0) { endCompGame(); return; }

  // Reshuffle if pool exhausted
  if (compState.poolIndex >= compState.pool.length) {
    compState.pool = shuffleArray([...Array(compState.allQuestions.length).keys()]);
    compState.poolIndex = 0;
  }

  const qIdx = compState.pool[compState.poolIndex++];
  const q = compState.allQuestions[qIdx];
  compState.answeredThisQ = false;
  compState.currentQIdx = qIdx;

  // Render question
  document.getElementById('comp-question').textContent = q.q;
  const optsEl = document.getElementById('comp-options');
  optsEl.innerHTML = q.opts.map((o, j) =>
    `<button class="comp-opt" onclick="answerComp(${qIdx},${j})">${o}</button>`
  ).join('');

  // Question counter
  document.getElementById('comp-q-count').textContent = compState.answered + 1;

  startCompTimer();
}

function startCompTimer() {
  compState.timeLeft = 15;
  updateTimerDisplay();

  const circle = document.getElementById('comp-timer-circle');
  const circumference = 2 * Math.PI * 54;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = '0';
  circle.style.transition = 'none';
  circle.classList.remove('timer-danger');

  void circle.offsetWidth;
  circle.style.transition = 'stroke-dashoffset 15s linear';
  circle.style.strokeDashoffset = circumference;

  if (compState.timerId) clearInterval(compState.timerId);
  compState.timerId = setInterval(() => {
    compState.timeLeft--;
    updateTimerDisplay();
    if (compState.timeLeft <= 5) {
      document.getElementById('comp-timer-circle').classList.add('timer-danger');
    }
    if (compState.timeLeft <= 0) {
      clearInterval(compState.timerId);
      compState.timerId = null;
      if (!compState.answeredThisQ) {
        handleCompTimeout();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('comp-timer-text');
  el.textContent = compState.timeLeft;
  el.className = 'comp-timer-text' + (compState.timeLeft <= 5 ? ' danger' : '');
}

function handleCompTimeout() {
  compState.answeredThisQ = true;
  compState.lives--;
  compState.streak = 0;
  compState.answered++;

  const q = compState.allQuestions[compState.currentQIdx];
  highlightCorrectAnswer(q.ans);
  renderCompHUD();
  setTimeout(() => nextCompQuestion(), 1200);
}

function answerComp(qIdx, chosen) {
  if (compState.answeredThisQ) return;
  compState.answeredThisQ = true;

  clearInterval(compState.timerId);
  compState.timerId = null;

  const q = compState.allQuestions[qIdx];
  const correct = q.ans;

  const buttons = document.querySelectorAll('.comp-opt');
  buttons.forEach((b, j) => {
    b.classList.add('disabled');
    if (j === correct) b.classList.add('correct');
    else if (j === chosen && chosen !== correct) b.classList.add('wrong');
  });

  compState.answered++;

  if (chosen === correct) {
    compState.streak++;
    if (compState.streak > compState.bestStreak) {
      compState.bestStreak = compState.streak;
    }
    const points = 10 + (compState.streak - 1) * 2;
    compState.score += points;
    showPointsPopup('+' + points);
  } else {
    compState.lives--;
    compState.streak = 0;
  }

  renderCompHUD();
  setTimeout(() => nextCompQuestion(), 1000);
}

function highlightCorrectAnswer(correctIdx) {
  const buttons = document.querySelectorAll('.comp-opt');
  buttons.forEach((b, j) => {
    b.classList.add('disabled');
    if (j === correctIdx) b.classList.add('correct');
  });
}

function showPointsPopup(text) {
  const popup = document.createElement('div');
  popup.className = 'comp-points-popup';
  popup.textContent = text;
  document.getElementById('comp-score-display').appendChild(popup);
  setTimeout(() => popup.remove(), 800);
}

async function endCompGame() {
  if (compState.timerId) { clearInterval(compState.timerId); compState.timerId = null; }
  showCompScreen('gameover');
  document.getElementById('comp-final-score').textContent = compState.score;
  document.getElementById('comp-final-streak').textContent = compState.bestStreak;
  document.getElementById('comp-final-answered').textContent = compState.answered;

  await persistCompScore(compState.score, compState.bestStreak);
}

async function persistCompScore(score, bestStreak) {
  if (!currentUser) return;
  const newRecordEl = document.getElementById('comp-new-record');
  try {
    const snap = await db.ref('users/' + currentUser.pseudo + '/competitive').get();
    const prev = snap.exists() ? snap.val() : { bestScore: 0, bestStreak: 0 };
    let isNewRecord = false;
    const updated = { bestScore: prev.bestScore || 0, bestStreak: prev.bestStreak || 0 };
    if (score > updated.bestScore) { updated.bestScore = score; isNewRecord = true; }
    if (bestStreak > updated.bestStreak) { updated.bestStreak = bestStreak; isNewRecord = true; }
    if (isNewRecord) {
      await db.ref('users/' + currentUser.pseudo + '/competitive').set(updated);
      newRecordEl.style.display = 'block';
    } else {
      newRecordEl.style.display = 'none';
    }
  } catch(e) {
    console.error('persistCompScore', e);
    newRecordEl.style.display = 'none';
  }
}
