const Cours = require('./../metier/Cours');
const DateHeure = require('./../metier/DateHeure');
const Professeur = require('./../metier/Professeur');

module.exports = class ControllerCours {

	constructor() {
		this.ensembleCours = new Map();
	}

	chargerData(data) {
		let num = 1;
		for(let i in data) {
			let tempCours = new Cours();
			let tempProf = new Professeur();
			let event = data[i];

			// Créer le cours avec les informations
			tempCours.nom = event.summary;
			tempCours.salle = event.location;
			let description = event.description.split(/\n/);
			let classe_etudiant = description[2];
			tempCours.classe = classe_etudiant;

			// Créer le professeur
			let nom_prenom_professeur = description[3].split(/ +/);
			tempProf.nom = nom_prenom_professeur[0];
			tempProf.prenom = nom_prenom_professeur[1];
			tempCours.professeur = tempProf;

			// Créer la période			
			tempCours.dDebut = new Date(event.start);
			tempCours.dFin = new Date(event.end);

			this.ensembleCours.set(num,tempCours);
			num++;
		}
	}

	afficher() {
		return this.ensembleCours;
	}

	listeCoursParDate(dDate) {
		let res = new Map();
		this.ensembleCours.forEach( (cours, key) => {
			if (cours.estDateDuCours(dDate)) {
				res.set(key, cours);
			}
		});
		return res;
	}
}