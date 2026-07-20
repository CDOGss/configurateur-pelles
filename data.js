/* =============================================================
   data.js — GÉNÉRÉ AUTOMATIQUEMENT par generer_data.py
   Ne pas éditer à la main : relancez le script pour mettre à jour.
   ============================================================= */

// En-têtes des colonnes (types d'attelage), dans l'ordre du fichier
const COLONNES = [
  {
    "id": "DIAM65",
    "titre": "DIAM 65",
    "couleur": "#2f80ed"
  },
  {
    "id": "DIAM80",
    "titre": "DIAM 80",
    "couleur": "#9b51e0"
  },
  {
    "id": "DIAM90",
    "titre": "DIAM 90",
    "couleur": "#eb5757"
  },
  {
    "id": "DIAM100",
    "titre": "DIAM 100",
    "couleur": "#e2892b"
  },
  {
    "id": "S50",
    "titre": "S50",
    "couleur": "#17a398"
  },
  {
    "id": "S60",
    "titre": "S60",
    "couleur": "#2d9cdb"
  },
  {
    "id": "S70",
    "titre": "S70",
    "couleur": "#6a994e"
  },
  {
    "id": "Dx100",
    "titre": "Dx100",
    "couleur": "#7a6ff0"
  }
];

// Attaches en stock, par colonne
const STOCK = {
  "DIAM65": [
    "Curage 1800 165",
    "Curage 1800 165",
    "Curage 1800 140",
    "Curage 1800 140",
    "Fouille 1100 165",
    "Platine HB15",
    "Platine HB15",
    "Platine HB15",
    "Platine HB15",
    "Fouille 600 140",
    "Fourche Palette",
    "Fouille 600 140",
    "Fouille 1000 140",
    "Fouille 1000 140",
    "Fouille 1100 165",
    "Fouille 600 165",
    "Fouille 500 165",
    "Fouille 600 165",
    "Fouille 1100 165",
    "Fouille 1000 140",
    "Attache UA43 165",
    "Attache UA33 140",
    "Attache UA33 140",
    "BRH HB15",
    "BRH HB15"
  ],
  "DIAM80": [
    "Curage 2000",
    "Fouille 600",
    "Curage 2000",
    "Fouille 1200",
    "Fouille 600",
    "Curage 2000",
    "Platine HB22",
    "Platine HB22",
    "Fouille 600",
    "BRH HB22",
    "BRH HB22",
    "BRH HB22 plus vieux au soleil",
    "BRH HB22 emballé plus vieux au soleil",
    "Arrivage attache UA 53 210",
    "Arrivage attache UA 53 210",
    "Arrivage attache UA 53 210",
    "Arrivage fouille 1200",
    "Arrivage fouille 1200",
    "Arrivage fouille 1200",
    "Arrivage squelette 1200",
    "Arrivage platine HB22",
    "Arrivage platine HB22",
    "Arrivage platine HB22",
    "Arrivage fouille 1200",
    "Arrivage Curage 2000",
    "Arrivage Fouille 600",
    "Arrivage attache UA53"
  ],
  "DIAM90": [
    "Fouille 700 300",
    "Attache UA62",
    "Attache UA62",
    "BRH HB32",
    "BRH HB32",
    "Arrivage fouille 1400 300",
    "Arrivage attache UA63 350",
    "Arrivage attache UA63 350",
    "Arrivage attache UA63 350",
    "Arrivage fouille 1500 350",
    "Arrivage fouille 1500 350",
    "Arrivage fouille 1500 350",
    "Arrivage platine HB32",
    "Arrivage platine HB32",
    "Arrivage platine HB32",
    "Arrivage attache UA63 360",
    "Arrivage fouille 1500 360",
    "Arrivage platine libre"
  ],
  "DIAM100": [
    "Fouille 1500 380",
    "Fouille 1500 380"
  ],
  "S50": [
    "Fouille 900"
  ],
  "S60": [
    "Fourche Palette",
    "Fouille Arden 1100",
    "Fouille Arden 500",
    "Curage Arden 1800",
    "Attache QCS60",
    "Tilt X18"
  ],
  "S70": [
    "Fouille Arden 600",
    "Fouille 900",
    "Curage Arden 2200",
    "Adaptateur a souder platine",
    "Attache QC70",
    "Attache QC70",
    "Tilt X26"
  ],
  "Dx100": [
    "Petit dx100",
    "Petit dx100",
    "Petit dx100",
    "Moyen dx100",
    "Moyen dx100",
    "Moyen dx100",
    "Curage dx100",
    "Curage dx100",
    "Curage dx100",
    "Platine hb08",
    "Platine hb08",
    "Platine hb08",
    "Attache UA23",
    "Attache UA23",
    "Attache UA23",
    "Arrivage Petit dx100",
    "Arrivage Petit dx100",
    "Arrivage Petit dx100",
    "Arrivage Petit dx100",
    "Arrivage Moyen dx100",
    "Arrivage Moyen dx100",
    "Arrivage Moyen dx100",
    "Arrivage Moyen dx100",
    "Arrivage Curage dx100",
    "Arrivage Curage dx100",
    "Arrivage Curage dx100",
    "Arrivage Curage dx100",
    "Arrivage Platine hb08",
    "Arrivage Platine hb08",
    "Arrivage Platine hb08",
    "Arrivage Platine hb08",
    "Arrivage Attache UA23",
    "Arrivage Attache UA23",
    "Arrivage Attache UA23",
    "Arrivage Attache UA23"
  ]
};

// Les machines (id, désignation, matricule, tonnage, type)
const MACHINES = [
  {
    "id": "m1",
    "designation": "PELLE A CHENILLES DX380LC-7K",
    "matricule": "28362",
    "tonnage": 38,
    "type": "chenilles"
  },
  {
    "id": "m2",
    "designation": "PELLE A CHENILLE DX230LC-9",
    "matricule": "28425",
    "tonnage": 23,
    "type": "chenilles"
  },
  {
    "id": "m3",
    "designation": "PELLE A PNEU DX165WR-7K",
    "matricule": "28502",
    "tonnage": 16.5,
    "type": "pneus"
  },
  {
    "id": "m4",
    "designation": "PELLE A PNEUS DX210W-7K",
    "matricule": "28584",
    "tonnage": 21,
    "type": "pneus"
  },
  {
    "id": "m5",
    "designation": "PELLE DX210W-7K MONOBLOC",
    "matricule": "28622",
    "tonnage": 21,
    "type": "pneus"
  },
  {
    "id": "m6",
    "designation": "PELLE DX230LC-9",
    "matricule": "28679",
    "tonnage": 23,
    "type": "chenilles"
  },
  {
    "id": "m7",
    "designation": "PELLE DX360LC-9",
    "matricule": "28680",
    "tonnage": 36,
    "type": "chenilles"
  },
  {
    "id": "m8",
    "designation": "PELLE DX210W-7K",
    "matricule": "????",
    "tonnage": 21,
    "type": "pneus"
  }
];
