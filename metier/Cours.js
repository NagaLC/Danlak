const DateHeure = require('./DateHeure.js');
const Professeur = require('./Professeur.js');

module.exports = class Cours {

	constructor(nom, salle, classe, dDebut, dFin, professeur) {
		if (nom === undefined) this.nom = "";
		else this.nom = nom;
		if (salle === undefined) this.salle = "";
		else this.salle = salle;
		if (classe === undefined) this.classe = "";
		else this.classe = classe;
		if (dDebut === undefined) this.dhDebut = new DateHeure();
		else {
			this.dhDebut = this.convertirDateHeure(dDebut);
		}
		if (dFin === undefined) this.dhFin = new DateHeure();
		else {
			this.dhFin = this.convertirDateHeure(dFin);
		}
		if (professeur === undefined) this.professeur = new Professeur();
		else this.professeur = professeur;
		this.calculerNombreHeure();
	}

	set nom(nom) {
		this._nom = nom.charAt(0).toUpperCase() + nom.slice(1);
	}
	get nom() {
		return this._nom;
	}

	set salle(salle) {
		this._salle = salle;
	}
	get salle() {
		return this._salle;
	}

	set classe(classe) {
		this._classe = classe;
	}
	get classe() {
		return this._classe;
	}

	set dDebut(dDebut) {
		this._dDebut = dDebut;
		this.dhDebut = this.convertirDateHeure(dDebut);
		this.calculerNombreHeure();
	}
	get dDebut() {
		//let res = new DateHeure(this._dhDebut.jour, this._dhDebut.mois, this._dhDebut.an, this._dhDebut.heure, this._dhDebut.heure, this._dhDebut.minute, this._dhDebut.seconde);
		return this._dDebut;
	}

	set dFin(dFin) {
		this._dFin = dFin;
		this.dhFin = this.convertirDateHeure(dFin);
		this.calculerNombreHeure();
	}
	get dFin() {
		//let res = new DateHeure(this._dhFin.jour, this._dhFin.mois, this._dhFin.an, this._dhFin.heure, this._dhFin.heure, this._dhFin.minute, this._dhFin.seconde);
		return this._dFin;
	}

	set professeur(professeur) {
		this._professeur = professeur;
	}
	get professeur() {
		let res = new Professeur(this._professeur.nom, this._professeur.prenom);
		return res;
	}

	calculerNombreHeure() {
		if (this._dDebut === undefined && this._dFin === undefined) {
			this.nombreHeures = 0;
		} else {
			// (millisecFin - millisecDeb) / (1000*60*60)
			this.nombreHeures = Math.abs(this._dFin - this._dDebut) / 3600000;
		}
	}

	convertirDateHeure(dDate) {
		let dhRes = new DateHeure();
		dhRes.jour = dDate.getDate();
		dhRes.mois = dDate.getMonth()+1;
		dhRes.an = dDate.getFullYear();
		dhRes.heure = dDate.getHours();
		dhRes.minute = dDate.getMinutes();
		dhRes.seconde = dDate.getSeconds();
		if (dDate.getDay() == 0) dhRes.order = 7;
		else dhRes.order = dDate.getDay();
		return dhRes;
	}

	estDateDuCours(dDate) {
		let dhDate = this.convertirDateHeure(dDate);
		return dhDate.equals(this.dhDebut);
	}

	afficherDate() {
	    let jours = ["404","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
	    let j = this.dhDebut.jour;
	    let m = this.dhDebut.mois;
	    let a = this.dhDebut.an;
	    return jours[this.dhDebut.order] +", "+j+"/"+m+"/"+a;
	}

	afficherHeureMinute() {
	    let deb = this.dhDebut.heure+":"+this.dhDebut.minute;
	    let fin = this.dhFin.heure+":"+this.dhFin.minute;
	    return deb + " - " + fin;
	}
};