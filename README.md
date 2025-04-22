# Truffe Moustache

## Description

Truffe Moustache est une application web dédiée aux personnes souhaitant adopter des animaux de compagnie. Elle propose des ressources, des cours de dressage et des fonctionnalités pour prendre soin de vos compagnons à quatre pattes. Elle inclut également un assistant IA nommé Truffe permettant de trouver son compagnon en fonction de ses critères.

## Fonctionnalités

### Home

- Vue d'ensemble des derniers animaux pouvant être adoptés
- Accès rapide aux différentes sections de l'application

### Niche

- Espace personnalisé pour référencer vos animaux coup de cœur

### Cours de Dressage

- Catalogue de cours pour différents types d'animaux (chiens, chats, rongeurs, reptiles)
- Accès aux détails des cours incluant la description, la durée, le niveau et le type d'animal

## Technologies Utilisées

- **Next.js** - Framework React pour le développement frontend
- **Tailwind CSS** - Pour le style et la mise en page
- **Wit AI** - API de Meta pour construire notre modèle AI NLU
- **Framer Motion** - Pour les animations et transitions
- **JSON** - Pour le stockage des données

## Installation

1. Cloner le dépôt

```bash
git clone https://github.com/DaYkAzZ/truffe-moustache.git
```

2. Installer les dépendances

```bash
cd truffe-moustache
npm i
```

3. Configurer les variables d'environnement

```bash
cd .env
# Éditez le fichier .env et ajoutez votre clé Wit.ai
```

4. Lancer le serveur de développement

```bash
npm run dev
```

5. Ouvrir `http://localhost:3000` dans votre navigateur

## Navigation

L'application dispose d'une barre de navigation en bas de l'écran avec trois sections principales :

- **Accueil** - Représenté par l'icône de pattes
- **Niche** - Représenté par l'icône de maison
- **Cours de Dressage** - Représenté par l'icône de livre/cours

### Consulter les Cours de Dressage

1. Cliquez sur l'icône de cours dans la barre de navigation
2. Parcourez la liste des cours disponibles
3. Cliquez sur un cours pour voir ses détails
4. Utilisez le bouton "Retour" pour revenir à la liste des cours

## Crédits

Développé avec le coeur par DaYkAzZ et LeMattheo, 2025
