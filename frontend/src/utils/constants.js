const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/auth/signup`,
  SIGN_IN: `${API_URL}/api/auth/login`,
  BOOKS: `${API_URL}/api/books`,
  BEST_RATED: `${API_URL}/api/books/bestrating`,
};

export const APP_ROUTES = {
  SIGN_UP: '/Inscription',
  SIGN_IN: '/Connexion',
  ADD_BOOK: '/Ajouter',
  BOOK: '/livre/:id',
  UPDATE_BOOK: 'livre/modifier/:id',
};

// Fonction pour construire les URLs d'images avec l'API actuelle
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';

  // Si l'URL est déjà absolue avec le bon domaine, la retourner telle quelle
  if (imageUrl.includes(API_URL)) {
    return imageUrl;
  }

  // Extraire juste le nom du fichier depuis l'ancienne URL
  const filename = imageUrl.split('/images/')[1] || imageUrl.split('/').pop();

  // Construire la nouvelle URL avec l'API_URL actuel
  return `${API_URL}/images/${filename}`;
};
