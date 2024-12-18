const pluginJest = require('eslint-plugin-jest');

module.exports = {
  root: true,  // Assurez-vous que ce fichier est la racine de la configuration ESLint

  // Spécifiez le parser et les options de parsing pour ESLint
  parserOptions: {
    ecmaVersion: 'latest',  // Assurez-vous de prendre en charge la dernière version ECMAScript
    sourceType: 'module',   // Permet l'utilisation des modules ES
  },

  // Définissez les environnements globalement
  env: {
    node: true,
    browser: true,
    es2021: true,  // La version d'ECMAScript que vous utilisez
  },

  overrides: [
    {
      // Appliquer ces règles aux fichiers de test spécifiés
      files: ['**/*.spec.js', '**/*.test.js'],
      plugins: { jest: pluginJest },
      languageOptions: {
        globals: pluginJest.environments.globals.globals,
      },
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
    {
      // Pour le reste des fichiers (autres que les fichiers de test)
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      rules: {
        // Ajoutez des règles générales ici, si nécessaire
      },
    },
  ],
};
