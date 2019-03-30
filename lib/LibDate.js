const friday = 5;
const monday = 1;
const saturday = 6;
const sunday = 0;

module.exports = class LibDate {
	
	static daysOfMonths (an) {
		if (an === undefined) {
			an = new Date().getFullYear();
		}
		let fab = 28;
		if (this.isBissextile(an)) {
			fab = 29;
		}
		return [31,fab,31,30,31,30,31,31,30,31,30,31];
	}

	static isBissextile(annee) {
		return ( annee % 400 == 0 || (annee % 4 == 0 && annee % 100 != 0) );
	}

	static today () {
		return new Date();
	}

	static tomorrow (dDate) {
		let today = dDate;
		if (dDate === undefined) {
			today = new Date();
		}
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
		let tomorrow = new Date(Date.UTC(current_year, current_month, current_day));
		return tomorrow;
	}

	static yesterday (dDate) {
		let today = dDate;
		if (dDate === undefined) {
			today = new Date();
		}
		let months = this.daysOfMonths();

		let current_day = today.getDate();
		let current_month = today.getMonth();
		let current_year = today.getFullYear();

		let howManyDays = months[current_month];

		if (current_day <= 1) {
			if (current_month <= 0) {
				current_month = 12;
				current_year--;
			} else {
				current_month--;
			}
			current_day = months[current_month];
		} else {
			current_day--;
		}
		let yesterday = new Date(Date.UTC(current_year, current_month, current_day));
		return yesterday;
	}

	static giveMe(year, month, day) {
		return new Date(year, month-1, day);
	}

	static week(dDate) {
		// week without sun. & sat.
		let today = dDate;
		if (dDate === undefined) {
			today = new Date();
		}
		let current = today.getDay();
		var days = [];

		days[current] = today;

		for (var i = current+1; i <= saturday; i++) {
			days[i] = this.tomorrow(days[i-1]);
		}
		
		for (var i = current-1; i >= sunday; i--) {
			days[i] = this.yesterday(days[i+1]);
		}

		return days;
	}
}