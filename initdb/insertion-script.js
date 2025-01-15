console.info("Chargement de la base de données...");

// établissement de la connexion avec la base de données en local
// ce script est exécuté sur le conteneur en lui même !
db = connect('mongodb://127.0.0.1:27017/films');

// utilisation du module fs pour la lecture du fichier contenant les informations Json
// plus d'informations sur fs : https://welovedevs.com/fr/articles/how-to-use-node-fs/
const fs = require('fs');

console.info("Lecture du fichier contenant les données d'initilisation de la base de données.");
console.log("Chargement de la collection 'countries'");
// __dirname correspond au dossier du module courant (soit le dossier dans lequel ce script démarre)
// buffer contient le contenu du fichier 
let buffer = fs.readFileSync(`${__dirname}/films.json`);

// on parse le buffer pour récupérer un contenu Json exploitable
// ce Json ne fait pas figurer l'instanciation des types complexes tels que ObjectId ou IsoDate
const rawData = JSON.parse(buffer);
// Utilisation de la désérialisation EJSON (extensible Json) pour récupérer les types complexe
const films = EJSON.deserialize(rawData)

console.log("Chargement de la collection 'movies'");
db.films.insertMany(films);
