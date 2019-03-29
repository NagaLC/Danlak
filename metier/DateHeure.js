module.exports = class DateHeure {
	constructor(j, m, a, h, min, sec) {
		if (j === undefined) this.jour = 0;
		else this.jour = j;
		if (m === undefined) this.mois = 0;
		else this.mois = m;
		if (a === undefined) this.an = 0;
		else this.an = a;
		if (h === undefined) this.heure = 0;
		else this.heure = h;
		if (min === undefined) this.minute = 0;
		else this.minute = min;
		if (sec === undefined) this.seconde = 0;
		else this.seconde = sec;
	}

	set jour(j) {
		this._jour = j;
	}
	get jour() {
		return this._jour;
	}

	set mois(mois) {
		this._mois = mois;
	}
	get mois() {
		return this._mois;
	}

	set an(an) {
		this._an = an;
	}
	get an() {
		return this._an;
	}

	set heure(heure) {
		this._heure = heure;
	}
	get heure() {
		return this._heure;
	}

	set minute(minute) {
		this._minute = minute;
	}
	get minute() {
		return this._minute;
	}

	set seconde(seconde) {
		this._seconde = seconde;
	}
	get seconde() {
		return this._seconde;
	}

	equals(dhDate, level) {
		// level 1 compare 01/01/2000
		// level 2 compare 01/01/2000 12h
		if (level === undefined) {
			level = 1
		}

		switch (level) {
			case 2:
				return true;
			default:
				return ( this._jour===dhDate.jour && this._mois===dhDate.mois && this._an===dhDate.an ); 
		}
	}
}