# 🚜 Configurateur de pelles

Application web pour **configurer les attaches** de nos pelles hydrauliques par simple **glisser-déposer**.
Démonstrateur d'**amélioration continue** — 100 % statique, aucun serveur requis.

## ▶️ Utiliser l'application

**En ligne (pour le commercial) :** https://cdogss.github.io/configurateur-pelles/

**En local :** ouvrez simplement `index.html` dans un navigateur. Les 4 fichiers suffisent : `index.html`, `styles.css`, `app.js`, `data.js`.

## 👥 Partage sur un dossier réseau

La config est sauvegardée en `localStorage`, **propre à chaque PC** — elle n'est donc pas partagée entre postes. Pour une config commune sur un dossier réseau :

1. Faites votre config, puis cliquez **« 👥 Équipe »** → un fichier `config-partagee.js` est téléchargé.
2. Déposez ce fichier dans le dossier partagé, **à côté de `index.html`** (remplacez l'ancien).
3. À la prochaine ouverture, **tous les PC chargent automatiquement** cette config (indicateur « 👥 Config équipe chargée »).

La config d'équipe s'applique **une fois par version** (repérée par sa date) ; ensuite chacun peut faire ses retouches locales jusqu'au dépôt d'un nouveau `config-partagee.js`. Les boutons **💾 Enregistrer / 📂 Charger** restent disponibles pour des fichiers `.json` individuels.

> Note : une page web ne peut pas écrire de fichier toute seule (sécurité navigateur) ; la mise à jour du fichier partagé est donc un simple copier-coller manuel. Aucun serveur requis.

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

## ✏️ Mettre à jour les données (recommandé : le script Python)

Le plus simple : déposez vos **deux fichiers Excel** à la racine et lancez le générateur.

```bash
python generer_data.py
# ou en précisant les fichiers :
python generer_data.py MonStock.xlsx MesMachines.xlsx
```

Le script relit vos fichiers et réécrit **`data.js`** ; rechargez la page, c'est à jour.

**Modèles à respecter** (dans le dossier `modeles/`, déjà pré-remplis avec vos données) :

- **`Modele_stock.xlsx`** — ligne 1 = les en-têtes (types d'attelage) ; chaque colonne liste ses attaches de haut en bas. Gardez le **même nombre de colonnes et les mêmes en-têtes**.
- **`Modele_machines.xlsx`** — colonnes `Designation`, `Matricule` (obligatoires) et, en option, `Tonnage` et `Type`. Laissés vides, le **tonnage** (ex. `DX380` → 38 t) et le **type** (`LC` → chenilles, `W`/`WR` → pneus) sont **déduits automatiquement**.

> Prérequis : Python 3 + `pip install openpyxl`.

Alternative manuelle : éditer directement **`data.js`** (`STOCK` et `MACHINES`). Aucune compilation nécessaire.

> ℹ️ Matricule `????` de la dernière pelle (`PELLE DX210W-7K`) à compléter.
