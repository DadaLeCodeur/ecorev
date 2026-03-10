// ════════════════════════════════════════════════════════
// CHATBOT / PROF IA
// ════════════════════════════════════════════════════════

// ── CHATBOT section ──
let chatHistory = [];
let isSending = false;
let chatInitialized = false;

function buildChatbotSec() {
  document.getElementById('chs-chatbot').innerHTML = `
  <div class="sec-title">🤖 Professeur IA</div>
  <div class="sec-sub">Pose tes questions sur le cours, demande des explications ou fais-toi interroger.</div>
  <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px">
    <div style="background:linear-gradient(135deg,rgba(91,141,238,.12),rgba(196,126,240,.08));border:1px solid var(--border);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:14px;flex:1;min-width:240px">
      <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--a1),var(--a5));display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">🎓</div>
      <div><strong style="font-size:13px">Professeur IA — Chapitre 3</strong><br><span style="font-size:12px;color:var(--muted)">Pose tes questions, demande des explications, ou dis "pose-moi une question de cours".</span></div>
    </div>
  </div>
  <div class="chat-wrap">
    <div class="chat-main">
      <div class="chat-messages" id="chat-msgs"></div>
      <div class="chat-input-row">
        <textarea class="chat-input" id="chat-inp" placeholder="Pose ta question sur le cours…" rows="1"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"
          oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
        <button class="chat-send" id="chat-send" onclick="sendMsg()">➤</button>
      </div>
    </div>
    <div class="chat-sidebar">
      <div class="chat-sidebar-title">💡 Suggestions</div>
      <div class="chat-suggs">
        <button class="chat-sugg" onclick="sendSugg(this)">Pose-moi une question de cours</button>
        <button class="chat-sugg" onclick="sendSugg(this)">C'est quoi la différence entre un impôt et une taxe ?</button>
        <button class="chat-sugg" onclick="sendSugg(this)">Explique-moi la création monétaire simplement</button>
        <button class="chat-sugg" onclick="sendSugg(this)">Quels sont les 4 motifs de l'épargne ?</button>
        <button class="chat-sugg" onclick="sendSugg(this)">Keynes vs néoclassiques sur l'épargne ?</button>
        <button class="chat-sugg" onclick="sendSugg(this)">Explique la loi d'Engel avec un exemple</button>
        <button class="chat-sugg" onclick="sendSugg(this)">Quelles sont les 3 fonctions de Musgrave ?</button>
        <button class="chat-sugg" onclick="sendSugg(this)">C'est quoi un cryptoactif ?</button>
        <button class="chat-sugg" onclick="sendSugg(this)">Explique l'égalité épargne = investissement</button>
      </div>
    </div>
  </div>`;
  if (!chatInitialized) {
    chatInitialized = true;
    addMsg('bot', "Bonjour ! 👋 Je suis ton **professeur IA** pour le Chapitre 3.\n\nPose-moi tes questions, demande-moi d'**expliquer une notion**, de te donner un **exemple concret**, ou dis-moi **\"pose-moi une question de cours\"** pour te faire réviser. Par où veux-tu commencer ?");
  } else {
    // re-render existing messages
    const container = document.getElementById('chat-msgs');
    if (container) container.innerHTML = '';
    chatHistory.forEach(m => {
      if (m.role !== 'system') addMsg(m.role === 'user' ? 'user' : 'bot', m.content, false);
    });
  }
}

function addMsg(role, text, push = true) {
  const container = document.getElementById('chat-msgs');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.innerHTML = `<div class="msg-av">${role === 'bot' ? '🎓' : '👤'}</div><div class="msg-bubble">${fmtMsg(text)}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  if (push && role !== 'system') chatHistory.push({ role: role === 'bot' ? 'assistant' : 'user', content: text });
}

function fmtMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/`(.*?)`/g,'<code style="background:rgba(255,255,255,.08);padding:1px 6px;border-radius:4px;font-size:12px">$1</code>')
    .replace(/^[-•]\s(.+)/gm,'<li style="margin-left:16px;margin-bottom:3px">$1</li>')
    .replace(/(<li[^>]*>.*?<\/li>\n?)+/gs, m=>`<ul style="margin:6px 0">${m}</ul>`)
    .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
}

function showTyping() {
  const c = document.getElementById('chat-msgs');
  if (!c) return;
  const d = document.createElement('div');
  d.className = 'msg bot'; d.id = 'typing-msg';
  d.innerHTML = `<div class="msg-av">🎓</div><div class="typing-ind"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div>`;
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}
function removeTyping() { document.getElementById('typing-msg')?.remove(); }

const CH3_AI_CONTEXT = `Tu es un professeur d'économie bienveillant et pédagogue. Tu aides un étudiant à réviser le Chapitre 3 : "Quelles relations d'interdépendance entretiennent les acteurs de l'activité économique ?". Réponds TOUJOURS en français, de manière concise (3-8 phrases) et avec des exemples concrets. Si on te demande de poser une question, pose-en UNE seule. Contenu du cours : 6 secteurs institutionnels (SF, SNF, APU, ISBLSM, Ménages, RDM), fonctions des agents, monnaie (3 fonctions, 3 formes, création scripturale), circuit économique, équilibres macroéconomiques. Théoriciens : Keynes (revenu = déterminant conso), Friedman (revenu permanent), Modigliani (cycle de vie), Duesenberry (effet de cliquet), Musgrave (3 fonctions État), Laffer (trop d'impôts tue l'impôt), Engel (loi sur l'alimentation). Formules : Revenu dispo = Revenus primaires - PO + Prestations. Épargne = RDB - Conso. PIB + M = CF + CI + FBCF + X + ΔStocks. S = I (fermée). S = I + (X-M) (ouverte).`;

async function sendMsg(text) {
  if (isSending) return;
  const input = document.getElementById('chat-inp');
  const msg = (text || input?.value || '').trim();
  if (!msg) return;
  if (input) { input.value = ''; input.style.height = 'auto'; }
  isSending = true;
  const sendBtn = document.getElementById('chat-send');
  if (sendBtn) sendBtn.disabled = true;
  addMsg('user', msg);
  showTyping();
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: CH3_AI_CONTEXT,
        messages: chatHistory
      })
    });
    const data = await resp.json();
    removeTyping();
    const reply = data.content?.[0]?.text || "Désolé, une erreur s'est produite.";
    addMsg('bot', reply);
  } catch { removeTyping(); addMsg('bot', "Oups, une erreur s'est produite. Vérifie ta connexion !"); }
  isSending = false;
  if (sendBtn) sendBtn.disabled = false;
  document.getElementById('chat-inp')?.focus();
}
function sendSugg(btn) { sendMsg(btn.textContent.trim()); }
