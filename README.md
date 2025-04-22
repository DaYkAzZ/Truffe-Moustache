# Truffe Moustache

## Description

Truffe Moustache est une application web dédiée aux propriétaires d'animaux de compagnie. Elle propose des ressources, des cours de dressage et des fonctionnalités pour prendre soin de vos compagnons à quatre pattes.

## Fonctionnalités

### Accueil

- Vue d'ensemble des dernières actualités et ressources
- Accès rapide aux différentes sections de l'application

### Niche

- Espace personnalisé pour stocker les informations de vos animaux
- Suivi des activités et des soins pour chaque animal

### Cours de Dressage

- Catalogue de cours pour différents types d'animaux (chiens, chats, rongeurs, reptiles)
- Accès aux détails des cours incluant la description, la durée, le niveau et le type d'animal
- Interface interactive pour suivre les cours de dressage

## Technologies Utilisées

- **Next.js** - Framework React pour le développement frontend
- **Tailwind CSS** - Pour le style et la mise en page
- **Framer Motion** - Pour les animations et transitions
- **JSON** - Pour le stockage des données

## Structure du Projet

```
truffe-moustache/
├── public/
│   ├── images/
│   │   ├── brand/
│   │   └── icons/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navigation/
│   │   │   └── ui/
│   │   │       └── dressage/
│   │   ├── context/
│   │   ├── data/
│   │   │   └── dressage.json
│   │   └── pages/
│   │       ├── (CoursDressage)/
│   │       │   ├── Cours/
│   │       │   └── DressageGlobal/
│   │       ├── Home/
│   │       └── Niche/
│   └── globals.css
├── package.json
└── README.md
```

## Installation

1. Cloner le dépôt

```bash
git clone https://github.com/DaYkAzZ/truffe-moustache.git
```

2. Installer les dépendances

```bash
cd truffe-moustache
npm install
```

3. Configurer les variables d'environnement

```bash
cp .env.example .env
# Éditez le fichier .env et ajoutez votre clé Wit.ai
```

4. Lancer le serveur de développement

```bash
npm run dev
```

5. Ouvrir `http://localhost:3000` dans votre navigateur

## Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com/) si ce n'est pas déjà fait

2. Installez le CLI Vercel (optionnel)

```bash
npm i -g vercel
```

3. Déployez votre application

```bash
vercel
# ou utilisez le déploiement via GitHub en connectant votre répertoire à Vercel
```

4. Configurez la variable d'environnement `WIT_AI_TOKEN` dans les paramètres du projet Vercel
   - Allez dans le tableau de bord Vercel > Votre projet > Settings > Environment Variables
   - Ajoutez la variable `WIT_AI_TOKEN` avec votre clé Wit.ai
   - Cliquez sur "Save" puis redéployez si nécessaire

5. Votre application est déployée et l'API Wit.ai fonctionne correctement!

## Utilisation

### Navigation

L'application dispose d'une barre de navigation en bas de l'écran avec trois sections principales :

- **Accueil** - Représenté par l'icône de pattes
- **Niche** - Représenté par l'icône de maison
- **Cours de Dressage** - Représenté par l'icône de livre/cours

### Consulter les Cours de Dressage

1. Cliquez sur l'icône de cours dans la barre de navigation
2. Parcourez la liste des cours disponibles
3. Cliquez sur un cours pour voir ses détails
4. Utilisez le bouton "Retour" pour revenir à la liste des cours

## License

Ce projet est sous licence [MIT](LICENSE).
