# 📩 Instagram Bot

Un bot Instagram développé en **Node.js** qui transforme les messages privés reçus en **commandes** à la manière d'un bot discord par exemple.

Le principe est simple :

1. Quand le compte dont les identifiants sont fournis reçoit un message
2. Le bot interprète le message comme une commande
3. Il exécute l’action correspondante et répond automatiquement

---

## 🚀 Fonctionnement

- 💬 Les messages privés sont analysés comme des commandes
- 🤖 Le bot répond automatiquement selon la commande reçue
- ⚙️ Système facilement extensible avec de nouvelles commandes

---

## 🧠 Exemple de fonctionnement

Utilisateur envoie : !ping
Le bot répond : pong

Ou l'utilisateur envoie : !say Bienvenue sur mon github ! 
Le bot répond un message vocal dans lequel est dit le texte demandé

---

## 📦 Installation

```
git clone https://github.com/alexlgrs/instagramBot.git
cd instagramBot
npm install
```

Puis mettre les identifiants du compte à automatiser dans params.js sous cette forme : 

```js
module.exports = {
    username: "ton_nom_utilisateur",
    password: "ton_mot_de_passe_secret"
}
```
