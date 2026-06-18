// ============================================================
//  STUDIO — Composants partagés (header + footer)
//  
//  MODIFIER ICI = toutes les pages se mettent à jour.
//  Chaque page doit juste avoir :
//    <div id="header"></div>   (en haut du body)
//    <div id="footer"></div>   (en bas, avant les scripts)
//    <body data-page="nom">    (pour marquer le lien actif)
// ============================================================


// ======================== NAVIGATION ========================
// MODIFIER : Logo, nom du studio, liens de navigation

(function() {

  var page = document.body.getAttribute('data-page') || '';

  var header = document.getElementById('header');
  if (header) {
    header.innerHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <div class="brand">
          <!-- MODIFIER : Logo — remplace ce <span> par <img src="/Ressources/Logo/derklan_logo_transparent.png" class="logo-mark" alt="Logo"> -->
          <img src="Ressources/Logo/derklan_logo_dark.png" class="logo-mark" alt="Logo">
          <!-- MODIFIER : Nom du studio -->
          <a href="index.html"><b>DERKLAN-STUDIO</b></a>
        </div>
        <div class="nav-links">
          <a href="jeux.html" ${page === 'jeux' ? 'class="active"' : ''}>NOS JEUX</a>
          <a href="studio.html" ${page === 'studio' ? 'class="active"' : ''}> LE STUDIO</a>
          <a href="actualites.html" ${page === 'actualites' ? 'class="active"' : ''}>LES DEVLOG</a>
        </div>
        <!-- MODIFIER : Lien du bouton CTA -->
        <a class="nav-cta" href="contact.html">CONTACT</a>
      </div>
    </nav>
  `;
}


// ======================== FOOTER ========================
// MODIFIER : Logo, nom, description, liens, emails

var footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <div class="brand">
            <!-- MODIFIER : Logo footer (même que nav) -->
            <img src="Ressources/Logo/derklan_logo_dark.png" class="logo-mark" alt="Logo">
            <!-- MODIFIER : Nom du studio -->
            <b>DERKLAN-STUDIO</b>
          </div>
          <!-- MODIFIER : Description courte -->
          <p class="blurb">Studio de jeux indépendant. Créé par des passionnés. </p>
        </div>
        <div class="footer-cols">

          <!-- MODIFIER : Colonne 1 — pages du site -->
          <div class="footer-col">
            <h5>// DERKLAN-STUDIO</h5>
            <a href="jeux.html">Jeux</a>
            <a href="studio.html">Le studio</a>
            <a href="fondateurs.html">Fondateurs</a>
            <a href="actualites.html">Devlog</a>
          </div>

          <!-- MODIFIER : Colonne 2 — réseaux sociaux (remplace les #) -->
          <div class="footer-col">
            <h5>// SUIVRE</h5>
            <p>Bientôt</p>
            <!--<a href="#">Steam</a>
            <a href="#">itch.io</a>
            <a href="#">Discord</a>
            <a href="#">YouTube</a>-->
          </div>

          <!-- MODIFIER : Colonne 3 — contact -->
          <div class="footer-col">
            <h5>// CONTACT</h5>
            <p>Bientôt</p>
          </div>

        </div>
      </div>
      <!-- MODIFIER : Nom du studio dans le copyright -->
      <div class="copyright">©  2026 DERKLAN-STUDIO - tous droits réservés.</div>
    </footer>
  `;
}


// ======================== INIT ========================
})();