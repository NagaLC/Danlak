const friday = 5;
const monday = 1;
const saturday = 6;
const sunday = 0;

module.exports = class LibDate {
	
	static dateColor(day_order) {

		if (day_order < 0 || day_order > 8) {
			day_order = 0;
		}

		let color = [
		  'RANDOM',
		  'AQUA',
		  'GREEN',
		  'GOLD',
		  'PURPLE',
		  'LUMINOUS_VIVID_PINK',
		  'ORANGE',
		  'RED'
		];

		return color[day_order];

	}

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
		let months = this.daysOfMonths();

		let day = today.getDate();
		let month = today.getMonth();
		let year = today.getFullYear();

		let howManyDays = months[month];

		if (day >= howManyDays) {
			day = 1;

			if (month >= 11) {
				month = 0;
				year++;
			} else {
				month++;
			}

		} else {
			day++;
		}
		let tomorrow = new Date(Date.UTC(year, month, day));
		return tomorrow;
	}

	static yesterday (dDate) {
		let today = dDate;
		if (dDate === undefined) {
			today = new Date();
		}
		let months = this.daysOfMonths();

		let day = today.getDate();
		let month = today.getMonth();
		let year = today.getFullYear();

		let howManyDays = months[month];

		if (day <= 1) {
			if (month <= 0) {
				month = 12;
				year--;
			} else {
				month--;
			}
			day = months[month];
		} else {
			day--;
		}
		let yesterday = new Date(Date.UTC(year, month, day));
		return yesterday;
	}

	static giveMe(year, month, day) {
		return new Date(year, month-1, day);
	}

	static week(dDate) {
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