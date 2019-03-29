module.exports = class Professeur {
	constructor(nom, prenom) {
		if (nom === undefined) this.nom = "";
		else this.nom = nom;
		if (prenom === undefined) this.prenom = "";
		else this.prenom = prenom;
	}

	set nom(nom) {
		this._nom = nom.toUpperCase();
	}
	get nom() {
		return this._nom;
	}

	set prenom(prenom) {
		this._prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();
	}
	get prenom() {
		return this._prenom;
	}

	afficher() {
		return this.nom + " " + this.prenom;
	}
}