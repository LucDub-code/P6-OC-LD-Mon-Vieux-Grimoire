# Mon Vieux Grimoire - Site de notation de livres

Application web permettant aux utilisateurs de partager et noter leurs lectures.

## Technologies utilisées

- **Frontend** : React
- **Backend** : Express, Node.js, MongoDB

## Installation et démarrage

### Frontend (React)

Installez les dépendances du projet React avec `npm install` dans le dossier frontend, puis lancez l'application web avec `npm start`.

### Backend (Express/Node.js)

Installez le backend avec `npm install` dans le dossier backend, puis lancez le serveur avec `node server.js` ou `nodemon server` si vous avez nodemon installé.

#### Configuration des variables d'environnement

Créez un fichier `.env` dans le dossier backend avec les variables suivantes :

```
PORT=<port_utilisé>
MONGODB_URI=<srv_mongodb>
TOKEN_SECRET=<clé_privée>
```

**Note** : Remplacez les valeurs entre chevrons par vos propres configurations.
