# 🧠 Clarify - Guide de Démarrage Rapide

**Bienvenue dans le projet !**  
Ce guide va t'aider à configurer et démarrer le projet rapidement.

---

## 🚀 Lancer le projet

### **ÉTAPE 1 : Installer Node.js**
Si vous n'avez jamais utilisé React :  

    1. Va sur [https://nodejs.org](https://nodejs.org)  
    2. Télécharge la version **LTS** (gros bouton bleu)  
    3. Installe-le (suivant > suivant > terminer)  
    4. Redémarre ton ordinateur  

    ✅ **Vérifie l’installation :**  
    Ouvre un terminal et tape :  
    ```bash
    node --version
    npm --version

### **ÉTAPE 2 : Installer et lancer le frontend
 .Aller dans le dossier frontend du projet : 
```bash 
    cd frontend
    npm start
    npm install recharts
    npm install sass
    npm install sass framer-motion
    npm install axios
    npm run dev

## ETAPE 1 : Installer Node.js

Si vous n'avez jamais installe Node.js :

1. Aller sur https://nodejs.org
2. Telecharger la version LTS (Long Term Support) - c'est le gros bouton vert
3. Lancer l'installateur et cliquer "Next" jusqu'a la fin
4. Redemarrer l'ordinateur

Verifier que l'installation a marche :
Ouvrir le terminal (touche Windows, taper "cmd", appuyer Entree) et taper :

```
node --version
npm --version
```

Si vous voyez deux numeros de version (ex: v20.0.0 et 10.0.0), c'est bon.

---

## ETAPE 2 : Installer MongoDB

MongoDB est la base de donnees ou seront sauvegardes les utilisateurs et les resultats.

1. Aller sur https://www.mongodb.com/try/download/community
2. Choisir : Version "7.0", Platform "Windows", Package "msi"
3. Telecharger et lancer l'installateur
4. Choisir "Complete" quand il demande le type d'installation
5. IMPORTANT : cocher "Install MongoDB as a Service" pendant l'installation
   (cela fait demarrer MongoDB automatiquement quand Windows demarre)
6. Laisser les autres options par defaut et finir l'installation

Verifier que MongoDB tourne :
Ouvrir le terminal et taper :

```
mongosh
```

Si vous voyez un message avec "Connecting to: mongodb://127.0.0.1:27017" et une ligne
qui commence par ">", MongoDB fonctionne. Taper "exit" pour quitter.

Si ca ne marche pas, c'est que le service n'est pas demarre. Dans le terminal :

```
net start MongoDB
```

---

## ETAPE 3 : Installer les dependances du backend

Ouvrir un terminal dans le dossier "backend" :
- Aller dans le dossier du projet avec l'explorateur de fichiers
- Cliquer sur la barre d'adresse en haut, taper "cmd" et appuyer Entree
- Un terminal s'ouvre directement dans ce dossier

Ou bien, depuis n'importe quel terminal :

```
cd chemin\vers\le\projet\backend
```

Puis installer les dependances :

```
npm install
```

Cette commande lit le fichier package.json et installe automatiquement :
- express    : le framework web pour creer notre serveur
- mongoose   : la librairie pour parler a MongoDB depuis Node.js
- cors       : permet au frontend de communiquer avec le backend
- dotenv     : permet de lire le fichier .env
- nodemon    : redемarre automatiquement le serveur quand on modifie un fichier

---

## ETAPE 4 : Installer les dependances du frontend

Ouvrir un DEUXIEME terminal dans le dossier "frontend" :

```
cd chemin\vers\le\projet\frontend
npm install
```

Cette commande installe React, Vite, react-router-dom, recharts, et tout le reste.

---

## ETAPE 5 : Verifier le fichier .env du backend

Le fichier backend/.env contient la configuration du serveur.
Il doit contenir exactement ces deux lignes :

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/clarify_db
```

- PORT=5000 : le backend sera accessible sur le port 5000
- MONGO_URI : l'adresse de votre MongoDB local
  "clarify_db" est le nom de la base de donnees. Elle sera creee automatiquement
  par MongoDB la premiere fois qu'on y enregistre quelque chose.

---

## ETAPE 6 : Demarrer l'application

Il faut demarrer DEUX terminaux en meme temps, un pour le backend et un pour le frontend.

### Terminal 1 : Demarrer le backend

```
cd chemin\vers\le\projet\backend
npm run dev
```

Vous devez voir :
```
Serveur demarre sur le port 5000
Connecte a MongoDB avec succes !
```

Si vous voyez "Erreur de connexion MongoDB", c'est que MongoDB n'est pas demarre.
Executer : net start MongoDB   dans un autre terminal, puis relancer npm run dev.

### Terminal 2 : Demarrer le frontend

```
cd chemin\vers\le\projet\frontend
npm run dev
```

Vous devez voir :
```
  VITE v5.x.x  ready in xxx ms

  Local:   http://localhost:5173/
```

Ouvrir le navigateur et aller sur : http://localhost:5173

L'application est lancee !

---

## Comment le frontend et le backend communiquent

C'est la partie la plus importante a comprendre. Voici comment ca fonctionne.

### Le probleme de base

Le frontend tourne sur http://localhost:5173
Le backend tourne sur http://localhost:5000

Ce sont deux adresses differentes (ports differents).
Par defaut, les navigateurs bloquent les requetes entre deux adresses differentes.
C'est une regle de securite appelee "Same-Origin Policy".

### La solution : le Proxy de Vite

Dans le fichier frontend/vite.config.js, il y a cette configuration :

```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

Cela dit a Vite :
"Si le frontend fait une requete vers une URL qui commence par /api,
redirige-la automatiquement vers http://localhost:5000."

Exemple concret :
- Le frontend fait fetch('/api/users/register')
- Vite intercepte et transforme en http://localhost:5000/api/users/register
- Le backend recoit la requete et repond
- Le navigateur ne voit jamais deux adresses differentes -> pas de blocage

C'est pourquoi dans Register.jsx et Result.jsx, les URLs commencent par /api
et non par http://localhost:5000/api.

### Le trajet complet d'une requete

Voici ce qui se passe quand l'utilisateur clique "Suivant" dans Register.jsx :

1. Register.jsx fait fetch('/api/users/register') avec {nom, telephone} en body
2. Vite (le proxy) redirige vers http://localhost:5000/api/users/register
3. Dans server.js, la ligne app.use('/api/users', userRoutes) intercepte la requete
4. user.routes.js voit que c'est un POST vers /register et appelle registerUser()
5. user.controller.js cree un new User({nom, telephone}) et fait .save()
6. Mongoose envoie la donnee a MongoDB qui la stocke dans la collection "users"
7. Le controller renvoie {message: "Utilisateur enregistre avec succes !"}
8. Register.jsx recoit la reponse et affiche le message de confirmation

### Le trajet des resultats du quiz

Quand l'utilisateur finit le quiz et arrive sur la page Result :

1. Question.jsx sauvegarde les scores dans localStorage
2. Result.jsx lit localStorage et appelle saveResultatsInMongoDB()
3. Cette fonction fait fetch('/api/resultats/save') avec tous les scores et le profil
4. Le backend cree un document ResultatQuiz et le sauvegarde dans MongoDB
5. La collection "resultatquizs" dans MongoDB contient maintenant ce bilan

### Voir les donnees dans MongoDB

Pour verifier que les donnees sont bien enregistrees, ouvrir un terminal et taper :

```
mongosh
use clarify_db
db.users.find()
db.resultatquizs.find()
```

Vous verrez tous les utilisateurs et tous les resultats de quiz enregistres.

---

## Structure des donnees dans MongoDB

### Collection "users" (creee par User.model.js)

Chaque document ressemble a ca :
```json
{
  "_id": "...",
  "nom": "Marie Dupont",
  "telephone": "0612345678",
  "createdAt": "2026-03-26T...",
  "updatedAt": "2026-03-26T..."
}
```

### Collection "resultatquizs" (creee par ResultatQuiz.model.js)

Chaque document ressemble a ca :
```json
{
  "_id": "...",
  "pseudo": "Marie",
  "age": 22,
  "sexe": "F",
  "situation": "Etudiant",
  "sommeil": "7-8h",
  "sport": "1-2 fois",
  "ecrans": "3-6h",
  "scores": {
    "mental": 5,
    "physique": 3,
    "emotion": 7,
    "social": 4
  },
  "date": "26/03/2026",
  "createdAt": "2026-03-26T...",
  "updatedAt": "2026-03-26T..."
}
```

---

## Les routes de l'API

Voici toutes les routes disponibles dans le backend :

| Methode | URL                     | Ce que ca fait                              |
|---------|-------------------------|---------------------------------------------|
| GET     | /                       | Verifie que le backend tourne               |
| POST    | /api/users/register     | Cree un nouvel utilisateur dans MongoDB      |
| POST    | /api/resultats/save     | Sauvegarde les resultats du quiz             |
| GET     | /api/resultats          | Recupere tous les resultats                  |

Vous pouvez tester ces routes dans le navigateur ou avec un outil comme Postman.

---

## Problemes courants et solutions

### "Cannot find module 'mongoose'"
Le npm install du backend n'a pas ete fait, ou a echoue.
Solution : aller dans le dossier backend et relancer npm install

### "Erreur de connexion MongoDB"
MongoDB n'est pas demarre.
Solution : ouvrir un terminal et taper : net start MongoDB

### La page s'affiche mais les donnees ne se sauvegardent pas
Le backend n'est pas demarre.
Solution : ouvrir un terminal dans backend/ et lancer npm run dev

### "npm run dev" ne trouve pas la commande
Node.js n'est pas installe ou pas dans le PATH.
Solution : reinstaller Node.js depuis nodejs.org et redemarrer l'ordinateur

### Le port 5000 est deja utilise
Un autre programme utilise le port 5000.
Solution : changer PORT=5001 dans backend/.env
ET mettre 'http://localhost:5001' dans frontend/vite.config.js

---

## Recapitulatif des commandes a retenir

```
# Installer les dependances (a faire UNE seule fois)
cd backend   ->  npm install
cd frontend  ->  npm install

# Demarrer MongoDB si ce n'est pas automatique
net start MongoDB

# Lancer l'application (a faire a chaque fois)
Terminal 1 :  cd backend   ->  npm run dev
Terminal 2 :  cd frontend  ->  npm run dev

# Ouvrir dans le navigateur
http://localhost:5173
```
