# 🚜 Configurateur de pelles

Application web pour **configurer les attaches** de nos pelles hydrauliques par simple **glisser-déposer**.
Démonstrateur d'**amélioration continue** — 100 % statique, aucun serveur requis.

## ▶️ Utiliser l'application

**En ligne (pour le commercial) :** https://cdogss.github.io/configurateur-pelles/

**En local :** ouvrez simplement `index.html` dans un navigateur.

## 🧩 Fonctionnement

- **En haut — les attaches en stock**, rangées en colonnes par type d'attelage (`DIAM 65`, `DIAM 80`, `DIAM 90`, `DIAM 100`, `S50`, `S60`, `S70`, `Dx100`). Données issues de `Lesstocks.xlsx`.
- **En bas — les 8 machines**. Chaque pelle est dessinée en **LEGO**, sa **taille varie selon le tonnage** (16,5 t → 38 t) et son train de roulement reflète le modèle (🚜 chenilles / 🛞 pneus).
- **Glissez** une attache sur une pelle : elle s'ajoute à ses *Détails*.
- Une pelle reste **rouge** tant qu'elle n'a **aucune attache**, puis passe au **vert**.
- Une attache **relâchée ailleurs que sur une pelle** revient à sa colonne d'origine.
- Le **✕** sur une attache affectée la renvoie dans le stock.
- **↺ Réinitialiser** remet tout à zéro · **⤓ Exporter** imprime / exporte en PDF la configuration.
- La configuration est **sauvegardée automatiquement** dans le navigateur.

## 📁 Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `styles.css` | Mise en forme |
| `data.js` | Données : stock d'attaches + les 8 machines |
| `app.js` | Rendu, glisser-déposer, pelle LEGO SVG, sauvegarde |
| `Lesstocks.xlsx` | Fichier source du stock |

## ✏️ Mettre à jour les données

Tout est dans **`data.js`** : modifiez `STOCK` (attaches par colonne) ou `MACHINES` (désignation, matricule, tonnage, type). Aucune compilation nécessaire.

> ℹ️ Matricule `????` de la dernière pelle (`PELLE DX210W-7K`) à compléter.
