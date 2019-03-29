module.exports = class LibDate {
	
	static daysOfMonths (an) {
		if (an === undefined) {
			an = new Date().getFullYear();
		}
		let fev = 28;
		if (this.isBissextile(an)) {
			fev = 29;
		}
		return [31,fev,31,30,31,30,31,31,30,31,30,31];
	}

	static isBissextile(annee) {
		return ( annee % 400 == 0 || (annee % 4 == 0 && annee % 100 != 0) );
	}

	static today () {
		return new Date();
	}

	static tomorrow () {
		let today = new Date();
		let month = this.daysOfMonths();

		let current_day = today.getDate();
		let current_month = today.getMonth();
		let current_year = today.getFullYear();

		let howManyDays = month[current_month];

		if (current_day >= howManyDays) {
			current_day = 1;

			if (current_month >= 11) {
				current_month = 0;
				current_year++;
			} else {
				current_month++;
			}

		} else {
			current_day++;
		}

		return new Date(current_year, current_month, current_day);
	}
}