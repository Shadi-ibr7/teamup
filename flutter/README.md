# TeamUp! Backend

Backend Node.js pour l'application mobile Flutter TeamUp! utilisant Firebase (Auth, Firestore, FCM).

## Prérequis
- Node.js >= 16
- Un projet Firebase avec un compte de service (serviceAccountKey)

## Installation
```bash
npm install
```

## Démarrage en développement
```bash
npm run dev
```

## Variables d'environnement (.env)
```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
PORT=3000
```

## Structure du projet
```
.
├── config/
│   └── firebase.js
├── controllers/
├── middleware/
├── routes/
├── services/
├── index.js
├── package.json
└── README.md
```

## Exemple de route de test
```http
GET /status
```
Réponse : `{ "status": "API TeamUp! OK" }`

## Packages utilisés
- express
- firebase-admin
- dotenv
- cors
- helmet
- nodemon (dev)

## À venir
- Authentification, gestion des événements, chat, notifications, etc.
