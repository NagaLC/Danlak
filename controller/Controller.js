const Cours = require('./../metier/Cours');
const DateHeure = require('./../metier/DateHeure');
const libDate = require('./../lib/LibDate');

function filtrerDescription(array, value) {
	let exclure = "(Export";
	for( let k = 0; k < array.length; k++){ 
		if ( array[k] === value || array[k].startsWith(exclure)) {
			array.splice(k, 1); 
			k--;
		}
	}
}

module.exports = class ControllerCours {

	constructor() {
		this.ensembleCours = [];
	}

	chargerData(data) {
		this.ensembleCours = [];
		for(let n in data) {
			let evenement = new Cours();
			let event = data[n];

			if(event.summary !== undefined) evenement.nom = event.summary;
			if(event.location !== undefined) evenement.salle = event.location;
			if(event.description !== undefined) {
				let description = event.description.split(/\n/);
				filtrerDescription(description, '');
				for (let i = 0; i < description.length; i++) {
					evenement.description += description[i] + "\n";
				}
			}
			if(event.start !== undefined) evenement.dDebut = new Date(event.start);
			if(event.end !== undefined) evenement.dFin = new Date(event.end);
			
			this.ensembleCours.push(evenement);
		}
		this.ensembleCours = this.trierParDateHeure(this.ensembleCours);
	}

	afficher() {
		return this.ensembleCours;
	}

	trieFusionSelonDateHeure(t1, t2) {
		let i = 0, j = 0, k = 0;  
		let n = t1.length, m = t2.length;  
		let t = new Array(n+m);  

		while (i < n && j < m) {  
		if (t1[i].dhDebut.inferieur(t2[j].dhDebut)) {  
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

	trieFusionSelonJourDeLaSemaine(t1, t2) {  
	  let i = 0, j = 0, k = 0;  
	  let n = t1.length, m = t2.length;  
	  let t = new Array(n+m);  
	  
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
		let taille = t.length;  
		let t1, t2;  

		if (taille == 0 || taille == 1) {  
			return t;  
		} 
		else {  
			t1 = this.trierParSemaine(t.slice(0,taille/2));  
			t2 = this.trierParSemaine(t.slice(taille/2));  
			return this.trieFusionSelonJourDeLaSemaine (t1,t2);  
		}  
	} 

	trierParDateHeure(t) {
		let taille = t.length;  
		let t1, t2;  

		if (taille == 0 || taille == 1) {  
			return t;  
		} 
		else {  
			t1 = this.trierParDateHeure(t.slice(0,taille/2));  
			t2 = this.trierParDateHeure(t.slice(taille/2));  
			return this.trieFusionSelonDateHeure (t1,t2);  
		}  
	}

	listeCoursParDate(dDate) {
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
		return this.trierParDateHeure(res);
	}

	listeCoursParSemaine(week) {
		if (week === undefined) {
			week = libDate.week();
		}
		let res = [];
		let index = 0;
		this.ensembleCours.forEach( (cours, key) => {
			for (let i = 0; i < week.length; i++) {
				if (cours.estDateDuCours(week[i])) {
					res[index] = cours;
					index++;
				}
			}			
		});
		return this.trierParDateHeure(res);
	}

	premierCours(date, n, limit) {
		if (date === undefined) {
			date = libDate.today();
		}
		if (limit === undefined) {
			limit = 7;
		}
		if (n == limit) return undefined;
		let array = this.listeCoursParDate(date);
		if (array.length <= 0) return this.premierCours(libDate.tomorrow(date),n+1);
		return array[0];
	}

	prochainCours(date) {
		if (date === undefined) {
			date = libDate.today();
		}
		this.ensembleCours.forEach( (cours, key) => {
			if(cours.estHeureDuCours(date)) {
				return cours;
			}				
		});
		return this.premierCours(date, 1);
	}
};