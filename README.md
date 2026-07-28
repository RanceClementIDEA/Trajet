# 道程 — Itinéraire Citroën Saxo

Comparateur d'itinéraires en une page : coût complet (carburant, péage, usure), seuil de rentabilité, carte interactive, feuille de route avec pauses, checklist mécanique.

Tout tient dans `index.html` : Leaflet y est intégré, la page fonctionne hors ligne. Seuls la carte de fond, la météo et le calcul d'un nouveau trajet demandent une connexion.

---

## Mise en ligne sur GitHub Pages

1. Créez un dépôt, par exemple `itineraire`.
2. Déposez ces fichiers **à la racine** du dépôt :

```
index.html
manifest.json
sw.js
favicon.svg
favicon.ico
favicon-16.png
favicon-32.png
apple-touch-icon.png
icon-192.png
icon-512.png
icon-512-maskable.png
```

3. Dans le dépôt : **Settings → Pages → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`. Enregistrez.
4. Une minute plus tard, le site est à `https://<votre-compte>.github.io/itineraire/`.

Les chemins sont tous relatifs : le site fonctionne aussi bien à la racine d'un domaine que dans un sous-dossier.

---

## Ajouter l'icône à l'écran d'accueil

**iPhone / iPad — Safari uniquement.** Ouvrez l'adresse dans Safari (pas Chrome), touchez le bouton Partager, puis **Sur l'écran d'accueil**. L'icône du sceau vermillon apparaît, et l'app s'ouvre en plein écran, sans barre d'adresse.

**Android — Chrome.** Menu ⋮ → **Ajouter à l'écran d'accueil** ou **Installer l'application**. L'icône masquable s'adapte à la forme utilisée par votre lanceur.

**Ordinateur — Chrome ou Edge.** Une icône d'installation apparaît dans la barre d'adresse.

> L'icône ne fonctionne **que servie en HTTPS** : ouvrir le fichier `index.html` directement depuis le disque ne suffit pas pour l'écran d'accueil. C'est la raison d'être de GitHub Pages ici.

Pour changer le nom affiché sous l'icône, modifiez `apple-mobile-web-app-title` dans `index.html` (iOS) et `short_name` dans `manifest.json` (Android).

---

## Le logo

Un sceau carré vermillon — la couleur du hanko — avec le caractère 道 (*michi*, la voie, la route) réservé en blanc cassé, sur fond de papier chaud. C'est la même palette que l'interface : `#b3452e` sur `#f2efe7`.

Le tracé du caractère est vectorisé dans `favicon.svg` : aucune police n'est nécessaire pour l'afficher. `icon-512-maskable.png` reprend le même dessin avec une marge élargie, pour survivre au masquage circulaire de certains lanceurs Android.

| Fichier | Usage |
|---|---|
| `favicon.svg` | Onglet du navigateur, toutes tailles |
| `favicon.ico`, `favicon-16/32.png` | Navigateurs anciens |
| `apple-touch-icon.png` (180 px) | Écran d'accueil iOS |
| `icon-192.png`, `icon-512.png` | Écran d'accueil Android, installation |
| `icon-512-maskable.png` | Lanceurs Android à icônes adaptatives |
| `logo.png` (1024 px) | Réseaux sociaux, impression, README |

---

## Mise à jour

Remplacez `index.html` et poussez. Le `sw.js` sert la version en cache puis récupère la nouvelle en arrière-plan : la mise à jour apparaît au chargement suivant. Pour forcer un rafraîchissement immédiat chez tous les visiteurs, incrémentez le numéro de cache en tête de `sw.js` (`itineraire-v1` → `itineraire-v2`).

---

## Vie privée

Aucun compte, aucun cookie, aucune mesure d'audience. Le domicile et vos réglages sont enregistrés dans le stockage local de votre navigateur — ils ne quittent jamais l'appareil, et le bouton « Oublier » les efface. Ils sont aussi repris dans l'adresse de la page, ce qui permet de transférer la configuration vers un autre téléphone en copiant le lien. Si le navigateur refuse le stockage local (navigation privée sur Safari, par exemple), la page le signale et le lien prend le relais. Trois services externes sont appelés, et uniquement si vous les sollicitez : OpenStreetMap pour le fond de carte, Nominatim pour les adresses, Open-Meteo pour la météo.
