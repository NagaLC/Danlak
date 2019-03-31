const Cours = require('./../metier/Cours');
const DateHeure = require('./../metier/DateHeure');
const Professeur = require('./../metier/Professeur');
const libDate = require('./../lib/LibDate');

module.exports = class ControllerCours {

	constructor() {
		this.ensembleCours = []
	}

	chargerData(data) {
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

			this.ensembleCours.push(tempCours);
		}
	}

	afficher() {
		return this.ensembleCours;
	}

	trieFusionSelonJourDeLaSemaine(t1, t2) {  
	  var i = 0, j = 0, k = 0;  
	  var n = t1.length, m = t2.length;  
	  var t = new Array(n+m);  
	  
	  while (i < n && j < m) {  
	    if (t1[i].dhDebut.order < t2[j].dhDebut.order) {  
	      t[k] = t1[i];  
	      i++;  
	    } else {  
	      t[k] = t2[j];  
	      j++;  
	    }  
	    k++;  
	  }  
	  while (i < n) {  
	    t[k] = t1[i];  
	    i++;  
	    k++;  
	  }  
	  while (j < m) {  
	    t[k] = t2[j];  
	    j++;  
	    k++;  
	  }  
	  return t;  
	} 

	trierParSemaine(t) {  
	  var n = t.length;  
	  var t1, t2;  
	  
	  if (n == 0 || n == 1) {  
	    return t;  
	  } else {  
	    t1 = this.trierParSemaine(t.slice(0,n/2));  
	    t2 = this.trierParSemaine(t.slice(n/2));  
	    return this.trieFusionSelonJourDeLaSemaine (t1,t2);  
	  }  
	}  

	listeCoursParDate(dDate) {
		console.log(this.afficher());
		if (dDate === undefined) {
			dDate=libDate.today();
		}
		let res = [];
		let index = 0;
		this.ensembleCours.forEach( (cours, key) => {
			if (cours.estDateDuCours(dDate)) {
				res[index] = cours;
				index++;
			}
		});
		return res;
	}

	listeCoursParSemaine(week) {
		if (week === undefined) {
			week = libDate.week();
		}
		let res = [];
		let index = 0;
		this.ensembleCours.forEach( (cours, key) => {
			for (var i = 0; i < week.length; i++) {
				if (cours.estDateDuCours(week[i])) {
					res[index] = cours;
					index++;
				}
			}			
		});
		return this.trierParSemaine(res);
	}
}