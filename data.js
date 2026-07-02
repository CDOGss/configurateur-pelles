/* =============================================================
   DONNÉES — extraites de Lesstocks.xlsx et de la liste des pelles
   -------------------------------------------------------------
   STOCK : les attaches en stock, rangées par colonne (type
   d'attelage). Chaque en-tête = un type. Ordre conservé fidèle
   au fichier Excel d'origine.
   ============================================================= */

// En-têtes des colonnes (types d'attelage) dans l'ordre du fichier
const COLONNES = [
  { id: "DIAM65",  titre: "DIAM 65"  },
  { id: "DIAM80",  titre: "DIAM 80"  },
  { id: "DIAM90",  titre: "DIAM 90"  },
  { id: "DIAM100", titre: "DIAM 100" },
  { id: "S50",     titre: "S50"      },
  { id: "S60",     titre: "S60"      },
  { id: "S70",     titre: "S70"      },
  { id: "Dx100",   titre: "Dx100"    },
];

// Attaches par colonne — recopiées telles quelles depuis Lesstocks.xlsx
const STOCK = {
  DIAM65: [
    "Curage 1800 165", "Curage 1800 165", "Curage 1800 140", "Curage 1800 140",
    "Fouille 1100 165", "Platine HB15", "Platine HB15", "Platine HB15",
    "Fouille 600 140", "Fourche Palette", "Fouille 600 140", "Fouille 1000 140",
    "Fouille 1000 140", "Fouille 1100 165", "Fouille 600 165", "Fouille 500 165",
    "Fouille 600 165", "Fouille 1100 165", "Fouille 1000 140", "Attache UA43 165",
    "Attache UA33 140", "Attache UA33 140", "BRH HB15", "BRH HB15",
  ],
  DIAM80: [
    "Curage 2000", "Fouille 600", "Curage 2000", "Fouille 1200", "Fouille 600",
    "Curage 2000", "Platine HB22", "Platine HB22", "Fouille 600", "BRH HB22",
    "BRH HB22", "BRH HB22 plus vieux au soleil",
  ],
  DIAM90: [
    "Fouille 700 300", "Attache UA62", "Attache UA62", "BRH HB32", "BRH HB32",
  ],
  DIAM100: [
    "Fouille 1500 380", "Fouille 1500 380",
  ],
  S50: [
    "Fouille 900",
  ],
  S60: [
    "Fourche Palette", "Fouille Arden 1100", "Fouille Arden 500", "Curage Arden 1800",
    "Attache QCS60", "Attache QCS60",
  ],
  S70: [
    "Fouille Arden 600", "Fouille 900", "Curage Arden 2200",
  ],
  Dx100: [
    "Petit dx100", "Petit dx100", "Petit dx100", "Moyen dx100", "Moyen dx100",
    "Moyen dx100", "Curage dx100", "Curage dx100", "Curage dx100",
    "Platine hb08", "Platine hb08", "Platine hb08", "Attache UA23",
    "Attache UA23", "Attache UA23",
  ],
};

/* =============================================================
   MACHINES — les 8 pelles (Désignation + Matricule).
   tonnage : déduit du modèle (DX380 ≈ 38 t, etc.) → pilote la
             taille de la pelle LEGO.
   type    : "chenilles" (LC) ou "pneus" (W/WR) → dessine des
             chenilles ou des roues.
   ============================================================= */
const MACHINES = [
  { id: "m1", designation: "PELLE A CHENILLES DX380LC-7K", matricule: "28362", tonnage: 38,   type: "chenilles" },
  { id: "m2", designation: "PELLE A CHENILLE DX230LC-9",   matricule: "28425", tonnage: 23,   type: "chenilles" },
  { id: "m3", designation: "PELLE A PNEU DX165WR-7K",      matricule: "28502", tonnage: 16.5, type: "pneus"     },
  { id: "m4", designation: "PELLE A PNEUS DX210W-7K",      matricule: "28584", tonnage: 21,   type: "pneus"     },
  { id: "m5", designation: "PELLE DX210W-7K MONOBLOC",     matricule: "28622", tonnage: 21,   type: "pneus"     },
  { id: "m6", designation: "PELLE DX230LC-9",              matricule: "28679", tonnage: 23,   type: "chenilles" },
  { id: "m7", designation: "PELLE DX360LC-9",              matricule: "28680", tonnage: 36,   type: "chenilles" },
  { id: "m8", designation: "PELLE DX210W-7K",              matricule: "????",  tonnage: 21,   type: "pneus"     },
];
