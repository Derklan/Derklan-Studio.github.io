# Guide de Déploiement pour GitHub Pages

Ce document explique les corrections apportées à votre projet Jekyll et fournit les étapes nécessaires pour le déployer correctement sur GitHub Pages.

## 1. Problématique Initiale

Votre projet, bien que fonctionnel en local, rencontrait des problèmes de chargement des styles (CSS) et de navigation (liens 404) une fois déployé sur GitHub Pages. Cela est dû à la manière dont GitHub Pages gère les chemins d'accès pour les projets hébergés dans un sous-répertoire (par exemple, `votre-pseudo.github.io/nom-du-repo/`). Les chemins absolus (`/assets/css/styles.css`) ne fonctionnaient pas car ils pointaient vers la racine du domaine (`votre-pseudo.github.io`) au lieu de la racine du projet (`votre-pseudo.github.io/nom-du-repo/`).

## 2. Corrections Effectuées

Pour résoudre ces problèmes, les modifications suivantes ont été appliquées à votre projet :

### 2.1 Utilisation de `site.baseurl`

Tous les chemins d'accès aux ressources (CSS, JavaScript, images) et aux liens internes ont été mis à jour pour utiliser la variable `{{ site.baseurl }}` de Jekyll. Cette variable est automatiquement remplie par GitHub Pages avec le nom de votre dépôt si votre site est un "Project Site".

*   **Fichiers modifiés :**
    *   `_layouts/default.html` : Les liens vers `styles.css`, `app.js` et `admin.js` ont été corrigés.
    *   `_includes/header.html` : Tous les liens de navigation (`/jeux`, `/studio`, etc.) ont été mis à jour.
    *   `_includes/footer.html` : Tous les liens de navigation dans le pied de page ont été mis à jour.
    *   `index.html`, `jeu.html`, `studio.html`, `fondateurs.html`, `actualites.html`, `presse.html`, `article.html`, `contact.html`, `admin.html` : Les liens internes spécifiques à ces pages ont également été corrigés.

### 2.2 Ajout du fichier `.nojekyll`

Un fichier vide nommé `.nojekyll` a été ajouté à la racine de votre projet. Ce fichier indique à GitHub Pages de ne pas traiter votre site avec Jekyll. Cela est utile si vous avez déjà configuré votre projet pour être un site statique pur ou si vous utilisez une version de Jekyll qui n'est pas celle par défaut de GitHub Pages, ou si vous rencontrez des problèmes avec la façon dont Jekyll traite certains fichiers ou dossiers.

## 3. Instructions de Déploiement sur GitHub Pages

Pour déployer votre projet corrigé sur GitHub Pages, suivez ces étapes :

1.  **Mettre à jour `_config.yml` :**
    *   Ouvrez le fichier `_config.yml` à la racine de votre projet.
    *   Assurez-vous que la ligne `baseurl:` est configurée correctement. Si votre dépôt est nommé `studio` et que votre URL GitHub Pages est `https://votre-pseudo.github.io/studio`, alors `baseurl` doit être défini comme suit :
        ```yaml
        baseurl: "/studio" # Remplacez "/studio" par le nom de votre dépôt
        ```
    *   Si votre site est un "User Site" (c'est-à-dire `https://votre-pseudo.github.io` sans sous-répertoire), alors `baseurl` doit être vide :
        ```yaml
        baseurl: "" 
        ```

2.  **Pousser les modifications sur GitHub :**
    *   Assurez-vous que toutes les modifications (y compris le fichier `.nojekyll` et les corrections de liens) sont bien ajoutées, commitées et poussées vers la branche `main` (ou `gh-pages`) de votre dépôt GitHub.

    ```bash
    git add .
    git commit -m "Fix: Corrected paths for GitHub Pages deployment and added .nojekyll"
    git push origin main # ou gh-pages
    ```

3.  **Vérifier les paramètres GitHub Pages :**
    *   Allez sur votre dépôt GitHub.
    *   Cliquez sur l'onglet **Settings** (Paramètres).
    *   Dans le menu latéral, cliquez sur **Pages**.
    *   Assurez-vous que la source de déploiement est configurée sur la bonne branche (généralement `main` ou `gh-pages`) et le bon dossier (généralement `/ (root)`).

4.  **Attendre le déploiement :**
    *   GitHub Pages prend quelques minutes pour déployer les modifications. Vous pouvez vérifier le statut du déploiement dans l'onglet **Actions** de votre dépôt.

## 4. Vérification

Une fois le déploiement terminé, visitez l'URL de votre site GitHub Pages. Tous les styles devraient être appliqués et la navigation entre les pages devrait fonctionner sans erreur 404.

Si vous rencontrez toujours des problèmes, vérifiez la console de votre navigateur (F12) pour des erreurs 404 ou des problèmes de chargement de ressources. Les messages d'erreur vous aideront à identifier les chemins qui posent encore problème.
