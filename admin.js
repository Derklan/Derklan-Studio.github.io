// ============================================================
//  STUDIO — Système admin devlog
//  Gère l'authentification + le CRUD des articles (localStorage)
// ============================================================

// MODIFIER : Mot de passe admin
// Le mot de passe par défaut est "studio2024"
// Pour changer le mot de passe :
//   1. Ouvre la console du navigateur (F12)
//   2. Tape :
//      crypto.subtle.digest('SHA-256', new TextEncoder().encode('tonNouveauMotDePasse'))
//        .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
//   3. Copie le hash affiché et remplace la valeur ci-dessous
const ADMIN_HASH = '0daab506bc7b67801525e210c0a0325f8296bac8485d75c7d5466425abb7de0a';

// ---- Authentification ----
async function hashPwd(pwd) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pwd));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('');
}

function isLoggedIn() {
  return sessionStorage.getItem('studio_admin') === 'true';
}

function logout() {
  sessionStorage.removeItem('studio_admin');
  location.reload();
}

async function tryLogin(pwd) {
  const h = await hashPwd(pwd);
  if (h === ADMIN_HASH) {
    sessionStorage.setItem('studio_admin', 'true');
    return true;
  }
  return false;
}

// ---- CRUD articles (localStorage) ----
// Les articles sont stockés sous la clé "studio_posts" en JSON
// LIMITE : localStorage = local au navigateur, pas partagé entre visiteurs
function getPosts() {
  try { return JSON.parse(localStorage.getItem('studio_posts') || '[]'); }
  catch { return []; }
}

function savePosts(posts) {
  localStorage.setItem('studio_posts', JSON.stringify(posts));
}

function addPost(post) {
  const posts = getPosts();
  post.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  post.created = new Date().toISOString();
  posts.unshift(post); // plus récent en premier
  savePosts(posts);
  return post;
}

function updatePost(id, data) {
  const posts = getPosts();
  const i = posts.findIndex(p => p.id === id);
  if (i === -1) return null;
  posts[i] = { ...posts[i], ...data, updated: new Date().toISOString() };
  savePosts(posts);
  return posts[i];
}

function deletePost(id) {
  const posts = getPosts().filter(p => p.id !== id);
  savePosts(posts);
}

function getPost(id) {
  return getPosts().find(p => p.id === id) || null;
}

// ---- Rendu des posts sur la page devlog (actualites.html) ----
// Cherche un élément #devlog-posts et y injecte la liste des articles
function renderDevlog() {
  const container = document.getElementById('devlog-posts');
  if (!container) return;

  const posts = getPosts();
  // MODIFIER : Couleurs de thumbnail des articles (cycle entre ces classes CSS)
  const colors = ['t1', 't2', 't3', 't4'];

  if (posts.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--muted);font-family:var(--mono);padding:60px 0">// aucun article pour le moment</p>';
    return;
  }

  container.innerHTML = posts.map((p, i) => {
    const d = new Date(p.created);
    const date = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    const excerpt = p.content ? p.content.replace(/<[^>]*>/g, '').slice(0, 140) + '…' : '';
    return '<a class="post reveal in" href="article.html?id=' + p.id + '">'
      + '<div class="thumb ' + colors[i % 4] + '"></div>'
      + '<div class="post-body"><p class="date mono">' + date + '</p>'
      + '<h3>' + esc(p.title) + '</h3>'
      + '<p>' + esc(excerpt) + '</p></div></a>';
  }).join('');
}

// Échappe le HTML pour éviter les injections
function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// ---- Rendu d'un article unique (article.html) ----
// Lit le paramètre ?id= dans l'URL et affiche l'article correspondant
function renderArticle() {
  const container = document.getElementById('article-content');
  if (!container) return;

  const id = new URLSearchParams(location.search).get('id');
  const post = id ? getPost(id) : null;

  if (!post) {
    container.innerHTML = '<p style="text-align:center;color:var(--muted);padding:80px 0">Article introuvable.</p>';
    return;
  }

  const d = new Date(post.created);
  const date = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  document.title = post.title + ' — STUDIO';
  container.innerHTML =
    '<p class="label">// ' + date + '</p>'
    + '<h1 style="font-family:var(--display);font-weight:700;font-size:clamp(32px,5vw,54px);letter-spacing:-.03em;line-height:1.06;margin-bottom:32px">'
    + esc(post.title) + '</h1>'
    + '<div class="prose">' + post.content + '</div>'
    + '<div style="margin-top:48px;padding-top:28px;border-top:1px solid var(--line)">'
    + '<a class="btn-link" href="actualites.html">← retour au devlog</a></div>';
}

// ---- Auto-initialisation ----
document.addEventListener('DOMContentLoaded', () => {
  renderDevlog();
  renderArticle();
});
