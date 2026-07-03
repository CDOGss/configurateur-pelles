/* ============================================================
   Configurateur de pelles — logique applicative
   ============================================================ */
"use strict";

const REPO_URL  = "https://github.com/CDOGss/configurateur-pelles";
const STORE_KEY = "configPelles.v1";

/* ---------- Construction du catalogue d'attaches ---------- */
// Chaque attache reçoit un id unique, sa colonne (type d'attelage)
// et son ordre d'origine dans la colonne (pour la remettre à sa place).
const ATTACHES = [];
COLONNES.forEach((col) => {
  (STOCK[col.id] || []).forEach((name, i) => {
    ATTACHES.push({ id: `${col.id}-${i}`, name, col: col.id, order: i });
  });
});
const ATTACH_BY_ID = Object.fromEntries(ATTACHES.map((a) => [a.id, a]));
const COL_BY_ID = Object.fromEntries(COLONNES.map((c) => [c.id, c]));
// Couleur d'une colonne : celle générée dans data.js, sinon repli sur le CSS.
function couleurCol(colId) {
  return (COL_BY_ID[colId] && COL_BY_ID[colId].couleur) || `var(--c-${colId})`;
}

/* ---------- État (persisté) ---------- */
// assigned[machineId] = [attacheId, ...] dans l'ordre d'affectation
let assigned = loadState();
// clients[machineId] = nom du client (renseigné à la vente)
let clients = loadClients();

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY));
    if (raw && raw.assigned) {
      const valid = {};
      MACHINES.forEach((m) => {
        valid[m.id] = (raw.assigned[m.id] || []).filter((id) => ATTACH_BY_ID[id]);
      });
      return valid;
    }
  } catch (e) { /* ignore */ }
  const empty = {};
  MACHINES.forEach((m) => (empty[m.id] = []));
  return empty;
}
function loadClients() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY));
    if (raw && raw.clients) {
      const valid = {};
      MACHINES.forEach((m) => (valid[m.id] = raw.clients[m.id] || ""));
      return valid;
    }
  } catch (e) { /* ignore */ }
  const empty = {};
  MACHINES.forEach((m) => (empty[m.id] = ""));
  return empty;
}
function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify({ assigned, clients }));
}

/* ---------- Helpers d'état ---------- */
function machineOf(attachId) {
  return MACHINES.find((m) => assigned[m.id].includes(attachId));
}
function paletteOf(colId) {
  return ATTACHES
    .filter((a) => a.col === colId && !machineOf(a.id))
    .sort((x, y) => x.order - y.order);
}
function assignTo(attachId, machineId) {
  const cur = machineOf(attachId);
  if (cur) assigned[cur.id] = assigned[cur.id].filter((id) => id !== attachId);
  if (!assigned[machineId].includes(attachId)) assigned[machineId].push(attachId);
  saveState();
  render();
}
function unassign(attachId) {
  const cur = machineOf(attachId);
  if (cur) assigned[cur.id] = assigned[cur.id].filter((id) => id !== attachId);
  saveState();
  render();
}

/* ---------- Une pelle n'est valide qu'avec une vraie "attache" ---------- */
// L'outil doit contenir le mot « attache » dans son nom (Attache UA62, etc.).
function isAttache(name) {
  return name.toLowerCase().includes("attache");
}

/* ---------- Icône selon le type d'attache ---------- */
function iconFor(name) {
  const n = name.toLowerCase();
  if (n.includes("brh"))     return "🔨"; // brise-roche hydraulique
  if (n.includes("platine")) return "🔧";
  if (n.includes("fourche")) return "🍴";
  if (n.includes("attache")) return "🔗";
  if (n.includes("curage"))  return "🧹";
  return "🪣"; // fouille + godets dx100 par défaut
}

/* ============================================================
   Pelle LEGO en SVG — taille pilotée par le tonnage
   ============================================================ */
function studsRow(x0, x1, y, r) {
  let s = "";
  const span = x1 - x0;
  const n = Math.max(2, Math.round(span / (r * 3.2)));
  const step = span / n;
  for (let i = 0; i < n; i++) {
    const cx = x0 + step * (i + 0.5);
    s += `<ellipse cx="${cx.toFixed(1)}" cy="${y}" rx="${r}" ry="${(r * 0.7).toFixed(1)}" fill="#ffa24d" stroke="#d96a0c" stroke-width="1"/>`;
  }
  return s;
}

function legoSVG(machine) {
  const { tonnage, type } = machine;
  // échelle : 16,5 t → 0.72 ; 38 t → 1.06
  const s = (0.72 + (Math.min(38, Math.max(16.5, tonnage)) - 16.5) / (38 - 16.5) * 0.34).toFixed(3);

  // Train de roulement : chenilles ou pneus
  const under = type === "chenilles"
    ? `
      <rect x="30" y="112" width="150" height="26" rx="13" fill="#2b2f36"/>
      <rect x="40" y="118" width="130" height="13" rx="6" fill="#3d434c"/>
      <circle cx="44" cy="125" r="11" fill="#1f2329" stroke="#4a515b" stroke-width="2"/>
      <circle cx="166" cy="125" r="11" fill="#1f2329" stroke="#4a515b" stroke-width="2"/>
      <circle cx="44" cy="125" r="3" fill="#5b636e"/><circle cx="166" cy="125" r="3" fill="#5b636e"/>
      <g stroke="#22262c" stroke-width="2">
        <line x1="64" y1="118" x2="64" y2="131"/><line x1="82" y1="118" x2="82" y2="131"/>
        <line x1="100" y1="118" x2="100" y2="131"/><line x1="118" y1="118" x2="118" y2="131"/>
        <line x1="136" y1="118" x2="136" y2="131"/>
      </g>`
    : `
      <rect x="42" y="110" width="128" height="12" rx="4" fill="#3a4049"/>
      <circle cx="70" cy="126" r="16" fill="#23272d" stroke="#0f1216" stroke-width="2"/>
      <circle cx="70" cy="126" r="7" fill="#8a939f"/><circle cx="70" cy="126" r="3" fill="#c7ccd4"/>
      <circle cx="150" cy="126" r="16" fill="#23272d" stroke="#0f1216" stroke-width="2"/>
      <circle cx="150" cy="126" r="7" fill="#8a939f"/><circle cx="150" cy="126" r="3" fill="#c7ccd4"/>`;

  return `
  <svg viewBox="0 0 210 152" xmlns="http://www.w3.org/2000/svg" role="img"
       aria-label="Pelle ${type} ${tonnage} tonnes">
    <ellipse cx="105" cy="143" rx="96" ry="6" fill="rgba(0,0,0,.10)"/>
    <g transform="translate(105 80) scale(${s}) translate(-105 -80)">
      ${under}
      <!-- tourelle -->
      <rect x="55" y="104" width="120" height="10" rx="4" fill="#454c56"/>
      <!-- bras (contour sombre puis orange) -->
      <path d="M98,96 L58,52" stroke="#b4570a" stroke-width="19" stroke-linecap="round" fill="none"/>
      <path d="M58,52 L34,92"  stroke="#b4570a" stroke-width="16" stroke-linecap="round" fill="none"/>
      <path d="M98,96 L58,52" stroke="#f6811f" stroke-width="14" stroke-linecap="round" fill="none"/>
      <path d="M58,52 L34,92"  stroke="#f6811f" stroke-width="11" stroke-linecap="round" fill="none"/>
      <!-- godet -->
      <path d="M35,86 L20,94 L18,110 L34,117 L46,108 L42,94 Z" fill="#f6811f" stroke="#b4570a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M20,110 L34,116 L46,108" fill="none" stroke="#ffa24d" stroke-width="2"/>
      <!-- articulations -->
      <circle cx="98" cy="96" r="4" fill="#c7ccd4" stroke="#6b7482"/>
      <circle cx="58" cy="52" r="4" fill="#c7ccd4" stroke="#6b7482"/>
      <circle cx="34" cy="92" r="3.5" fill="#c7ccd4" stroke="#6b7482"/>
      <!-- corps + contrepoids -->
      <rect x="150" y="76" width="24" height="34" rx="6" fill="#d96a0c" stroke="#b4570a" stroke-width="1.5"/>
      <rect x="58" y="74" width="112" height="32" rx="6" fill="#f6811f" stroke="#b4570a" stroke-width="1.5"/>
      ${studsRow(64, 168, 71, 4)}
      <!-- cabine -->
      <rect x="60" y="58" width="34" height="32" rx="5" fill="#ffb46b" stroke="#b4570a" stroke-width="1.5"/>
      <rect x="64" y="62" width="24" height="15" rx="3" fill="#bfe3ff" stroke="#7fb7e8"/>
      ${studsRow(63, 91, 55, 3.6)}
      <!-- gyrophare -->
      <rect x="72" y="52" width="6" height="6" rx="1.5" fill="#ffd43b" stroke="#b4570a"/>
      <!-- tonnage gravé sur le contrepoids -->
      <text x="162" y="97" text-anchor="middle" font-family="Inter,sans-serif"
            font-size="11" font-weight="800" fill="#fff">${tonnage}</text>
    </g>
  </svg>`;
}

/* ============================================================
   Rendu
   ============================================================ */
const elPalette     = document.getElementById("palette");
const elMachines    = document.getElementById("machines");
const elConfigPanel = document.getElementById("configPanel");

// Pelle actuellement "montée" dans le panneau de configuration (transitoire)
let activeMachineId = null;
function setActiveMachine(id) {
  activeMachineId = (id === activeMachineId) ? null : id;
  render();
  if (activeMachineId) {
    // remonter en haut pour voir palette + panneau côte à côte
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function chipHTML(attach, { removable = false } = {}) {
  const color = couleurCol(attach.col);
  return `
    <div class="chip" data-id="${attach.id}" ${removable ? "" : 'data-draggable="1"'}
         style="--chip:${color}" title="${attach.name} · ${attach.col}">
      <span class="chip-ico">${iconFor(attach.name)}</span>
      <span class="chip-name">${attach.name}</span>
      ${removable ? '<button class="chip-remove" data-remove="' + attach.id + '" title="Retirer">×</button>' : ""}
    </div>`;
}

function renderPalette() {
  elPalette.innerHTML = COLONNES.map((col) => {
    const items = paletteOf(col.id);
    const body = items.length
      ? items.map((a) => chipHTML(a)).join("")
      : "";
    return `
      <div class="pal-col">
        <div class="pal-col-head" style="background:${couleurCol(col.id)}">
          ${col.titre}<span class="pal-col-count">${items.length}</span>
        </div>
        <div class="pal-col-body${items.length ? "" : " empty"}">${body}</div>
      </div>`;
  }).join("");
}

// Échappe une valeur pour l'insérer dans un attribut HTML en toute sécurité
function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Carte d'une pelle. context = "grid" (en bas, cliquable) ou "panel" (à droite).
function machineCardHTML(m, context) {
  const items = assigned[m.id].map((id) => ATTACH_BY_ID[id]).filter(Boolean);
  const nbAttache = items.filter((a) => isAttache(a.name)).length;
  const ok = nbAttache > 0; // valide seulement s'il y a une vraie "attache"
  const matMissing = m.matricule === "????";
  const inPanel = context === "panel";
  const details = items.length
    ? items.map((a) => chipHTML(a, { removable: true })).join("")
    : `<div class="machine-drop-empty">${inPanel ? "Glissez une attache ici →" : "Glissez une attache ici"}</div>`;
  const statusTxt = ok
    ? `Configurée · ${nbAttache} attache${nbAttache > 1 ? "s" : ""}${items.length > nbAttache ? " + " + (items.length - nbAttache) + " outil" + (items.length - nbAttache > 1 ? "s" : "") : ""}`
    : (items.length
        ? `Attache requise · ${items.length} outil${items.length > 1 ? "s" : ""} sans attache`
        : "Attache requise");
  return `
    <article class="machine ${ok ? "ok" : ""} ${inPanel ? "in-panel" : ""}"
             data-machine="${m.id}" ${context === "grid" ? 'data-select="1"' : ""}>
      ${inPanel ? '<button class="config-close" id="btnCloseConfig" title="Fermer la configuration">✕ Fermer</button>' : ""}
      <div class="machine-top">
        <div class="lego-wrap">${legoSVG(m)}</div>
        <div class="machine-id">
          <div class="machine-name">${m.designation}</div>
          <div class="machine-meta">
            <span class="badge mat ${matMissing ? "missing" : ""}">Mat. ${m.matricule}</span>
            <span class="badge ton">${m.tonnage} t</span>
            <span class="badge">${m.type === "chenilles" ? "🚜 chenilles" : "🛞 pneus"}</span>
          </div>
        </div>
      </div>
      <div class="machine-client ${clients[m.id] ? "filled" : ""}">
        <span class="machine-client-ico">👤</span>
        <input type="text" class="machine-client-input" data-client="${m.id}"
               value="${escAttr(clients[m.id] || "")}"
               placeholder="Nom du client (à la vente)" autocomplete="off" />
      </div>
      <div class="machine-status">
        <span class="status-dot"></span>${statusTxt}
      </div>
      <div class="machine-drop" data-drop="${m.id}">
        <div class="machine-drop-title">Détails / Attaches</div>
        ${details}
      </div>
    </article>`;
}

function renderMachines() {
  // Grille du bas : la pelle active devient un emplacement "en configuration"
  elMachines.innerHTML = MACHINES.map((m) => {
    if (m.id === activeMachineId) {
      return `
        <article class="machine-slot" data-select="1" data-machine="${m.id}" title="Revenir à cette pelle">
          <div class="machine-slot-lego">${legoSVG(m)}</div>
          <div class="machine-slot-name">${m.designation}</div>
          <div class="machine-slot-tag">⬆ En configuration</div>
        </article>`;
    }
    return machineCardHTML(m, "grid");
  }).join("");

  // Panneau de droite : pelle active ou invitation
  const m = MACHINES.find((x) => x.id === activeMachineId);
  elConfigPanel.classList.toggle("active", !!m);
  elConfigPanel.innerHTML = m
    ? machineCardHTML(m, "panel")
    : `<div class="config-empty">
         <div class="config-empty-ico">🖐️</div>
         <div class="config-empty-title">Sélectionnez une pelle</div>
         <div class="config-empty-text">Cliquez une pelle en bas : elle monte ici pour être configurée, à côté du stock.</div>
       </div>`;
}

function updateProgress() {
  const done = MACHINES.filter((m) =>
    assigned[m.id].some((id) => ATTACH_BY_ID[id] && isAttache(ATTACH_BY_ID[id].name))
  ).length;
  document.getElementById("progressCount").textContent = `${done} / ${MACHINES.length}`;
  document.getElementById("progressPill").classList.toggle("done", done === MACHINES.length);
}

function render() {
  renderPalette();
  renderMachines();
  updateProgress();
}

/* ============================================================
   Glisser-déposer (souris + tactile) via Pointer Events
   ============================================================ */
const ghost = document.getElementById("dragGhost");
let drag = null; // { id, startX, startY, active, hover }

document.addEventListener("pointerdown", (e) => {
  const chip = e.target.closest('.chip[data-draggable]');
  if (!chip || e.button !== 0) return;
  drag = { id: chip.dataset.id, startX: e.clientX, startY: e.clientY, active: false, hover: null, el: chip };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp, { once: true });
});

function onMove(e) {
  if (!drag) return;
  const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
  if (!drag.active) {
    if (Math.hypot(dx, dy) < 5) return; // seuil pour ne pas gêner un clic
    startGhost();
  }
  // position du ghost
  ghost.style.transform = `translate(${e.clientX - drag.offX}px, ${e.clientY - drag.offY}px)`;
  // survol d'une machine ?
  ghost.style.pointerEvents = "none";
  const under = document.elementFromPoint(e.clientX, e.clientY);
  const machine = under && under.closest(".machine");
  if (machine !== drag.hover) {
    if (drag.hover) drag.hover.classList.remove("drop-hover");
    drag.hover = machine;
    if (machine) machine.classList.add("drop-hover");
  }
}

function startGhost() {
  drag.active = true;
  drag.el.classList.add("dragging");
  const rect = drag.el.getBoundingClientRect();
  drag.offX = drag.startX - rect.left;
  drag.offY = drag.startY - rect.top;
  ghost.style.width = rect.width + "px";
  ghost.innerHTML = drag.el.outerHTML.replace('data-draggable="1"', "");
  ghost.classList.add("active");
}

function onUp() {
  window.removeEventListener("pointermove", onMove);
  if (drag && drag.active) {
    const targetMachine = drag.hover;
    if (targetMachine) assignTo(drag.id, targetMachine.dataset.machine);
    // sinon : ne rien faire → l'étiquette reste dans sa colonne d'origine
  }
  cleanupDrag();
}

function cleanupDrag() {
  if (drag && drag.hover) drag.hover.classList.remove("drop-hover");
  if (drag && drag.el) drag.el.classList.remove("dragging");
  ghost.classList.remove("active");
  ghost.innerHTML = "";
  ghost.style.transform = "translate(-9999px,-9999px)";
  drag = null;
}

/* ---------- Clics : retrait d'attache, sélection de pelle, fermeture ---------- */
document.addEventListener("click", (e) => {
  // 1) retirer une attache (prioritaire, ne doit pas sélectionner la pelle)
  const btnRemove = e.target.closest("[data-remove]");
  if (btnRemove) { e.stopPropagation(); unassign(btnRemove.dataset.remove); return; }

  // 2) fermer le panneau de configuration → la pelle redescend
  if (e.target.closest("#btnCloseConfig")) { activeMachineId = null; render(); return; }

  // 3) clic dans le champ Client → ne pas sélectionner la pelle (garder le focus)
  if (e.target.closest("[data-client]")) return;

  // 4) cliquer une pelle en bas → la faire monter dans le panneau
  const selectable = e.target.closest('[data-select="1"]');
  if (selectable) setActiveMachine(selectable.dataset.machine);
});

/* ---------- Saisie du nom du client (sans re-render, pour garder le focus) ---------- */
document.addEventListener("input", (e) => {
  const input = e.target.closest("[data-client]");
  if (!input) return;
  const id = input.dataset.client;
  clients[id] = input.value;
  input.parentElement.classList.toggle("filled", !!input.value.trim());
  saveState();
});

/* ============================================================
   Barre d'actions
   ============================================================ */
document.getElementById("btnReset").addEventListener("click", () => {
  if (confirm("Remettre toutes les pelles à zéro (attaches et noms de client) ?")) {
    MACHINES.forEach((m) => { assigned[m.id] = []; clients[m.id] = ""; });
    saveState();
    render();
  }
});
document.getElementById("btnExport").addEventListener("click", () => {
  if (activeMachineId) { activeMachineId = null; render(); } // imprimer les 8 pelles entières
  window.print();
});
document.getElementById("btnGit").href = REPO_URL;

/* ============================================================
   Enregistrer / Charger une configuration (fichier .json)
   ============================================================ */
// Format robuste : on exporte le nom + la colonne de chaque attache,
// pour pouvoir recharger même si l'ordre du stock a changé.
function construireConfig() {
  return {
    app: "configurateur-pelles",
    version: 2,
    date: new Date().toISOString(),
    machines: MACHINES.map((m) => ({
      id: m.id,
      matricule: m.matricule,
      designation: m.designation,
      client: clients[m.id] || "",
      attaches: assigned[m.id].map((id) => {
        const a = ATTACH_BY_ID[id];
        return { id: a.id, name: a.name, col: a.col };
      }),
    })),
  };
}

document.getElementById("btnSave").addEventListener("click", () => {
  const data = construireConfig();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  const nom = `config-pelles-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.json`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nom;
  a.click();
  URL.revokeObjectURL(url);
});

// Le bouton "Charger" ouvre le sélecteur de fichier
const fileLoad = document.getElementById("fileLoad");
document.getElementById("btnLoad").addEventListener("click", () => fileLoad.click());
fileLoad.addEventListener("change", (e) => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      appliquerConfig(JSON.parse(reader.result));
    } catch (err) {
      alert("Fichier illisible : ce n'est pas un .json de configuration valide.");
    }
    fileLoad.value = ""; // permet de recharger le même fichier ensuite
  };
  reader.readAsText(f);
});

// Applique une config chargée, en re-résolvant chaque attache dans le stock actuel
function appliquerConfig(obj) {
  if (!obj || (!obj.machines && !obj.assigned)) {
    alert("Ce fichier ne contient pas de configuration reconnue.");
    return;
  }
  MACHINES.forEach((m) => { assigned[m.id] = []; clients[m.id] = ""; });
  const used = new Set();
  let placees = 0, ignorees = 0;

  const resoudre = (at) => {
    // 1) même id encore valide et non utilisé
    if (at.id && ATTACH_BY_ID[at.id] && !used.has(at.id) &&
        ATTACH_BY_ID[at.id].name === at.name && ATTACH_BY_ID[at.id].col === at.col) {
      return at.id;
    }
    // 2) sinon, une attache disponible de même nom + même colonne
    const c = ATTACHES.find((a) => a.col === at.col && a.name === at.name && !used.has(a.id));
    return c ? c.id : null;
  };

  if (obj.machines) {
    obj.machines.forEach((entry) => {
      const m =
        (entry.matricule && entry.matricule !== "????" && MACHINES.find((x) => x.matricule === entry.matricule)) ||
        MACHINES.find((x) => x.designation === entry.designation) ||
        MACHINES.find((x) => x.id === entry.id);
      if (!m) { ignorees += (entry.attaches || []).length; return; }
      if (entry.client) clients[m.id] = entry.client;
      (entry.attaches || []).forEach((at) => {
        const aid = resoudre(at);
        if (aid) { used.add(aid); assigned[m.id].push(aid); placees++; }
        else ignorees++;
      });
    });
  } else {
    // ancien format { assigned: { mId: [ids] } }
    Object.entries(obj.assigned).forEach(([mid, ids]) => {
      if (!assigned[mid]) return;
      ids.forEach((id) => {
        if (ATTACH_BY_ID[id] && !used.has(id)) { used.add(id); assigned[mid].push(id); placees++; }
        else ignorees++;
      });
    });
  }

  activeMachineId = null;
  saveState();
  render();
  alert(`Configuration chargée : ${placees} attache(s) placée(s)` +
        (ignorees ? `, ${ignorees} ignorée(s) (absente(s) du stock actuel).` : "."));
}

/* ---------- Go ---------- */
render();
