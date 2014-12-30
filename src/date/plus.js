(function(win) {
    var patch = win.patch;

    patch.some({
        getDaysInMonth:function(year, month) {
            return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },
        compare:function(date1, date2) {
            if(isNaN(date1) || isNaN(date2))
                throw new TypeError(date1 + "-" + date2);

            if(date1 instanceof Date && date2 instanceof Date) {
                if(date1 < date2) {
                    return -1;
                }
                else if(date1 > date2) {
                    return 1;
                }else {
                    return 0;
                }
            }else {
                throw new TypeError(date1 + "-" + date2);
            }
        },
        equal:function(date1, date2) {
            return !(Date.compare(date1, date2));
        },
        today:function() {
            return new Date().clearTime();
        },
        isLeapYear:function(year) {
            return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
        }
    }, Date);

    patches({
        clearTime:function() {
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
            this.setMilliseconds(0);
            return this;
        },
        clone:function() {
            return new Date(this.getTime());
        },
        compareTo:function(target) {
            return Date.compare(this, target);
        },
        isEqual:function(target) {
            return Date.equal(this, target);
        },
        isAfter:function(target) {
            return Date.compare(this, target) > 0;
        },
        isBefore:function(target) {
            return Date.compare(this, target) < 0;
        },
        getWeek:function() {
            var a, b, c, d, e, f, g, n, s, w;
            var $y, $m, $d;

            $y = (!$y) ? this.getFullYear() : $y;
            $m = (!$m) ? this.getMonth() + 1 : $m;
            $d = (!$d) ? this.getDate() : $d;

            if ($m <= 2) {
                a = $y - 1;
                b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                s = b - c;
                e = 0;
                f = $d - 1 + (31 * ($m - 1));
            } else {
                a = $y;
                b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                s = b - c;
                e = s + 1;
                f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
            }

            g = (a + b) % 7;
            d = (f + g - e) % 7;
            n = (f + 3 - d) | 0;

            if (n < 0) {
                w = 53 - ((g - s) / 5 | 0);
            } else if (n > 364 + s) {
                w = 1;
            } else {
                w = (n / 7 | 0) + 1;
            }

            $y = $m = $d = null;

            return w;
        },
        addSeconds:function(value) {
            this.setSeconds(this.getSeconds() + value);
            return this;
        },
        addMinutes:function(value) {
            return this.addSeconds(value * 60);
        },
        addHours:function(value) {
            return this.addMinutes(value * 60);
        },
        addDays:function(value) {
            return this.addHours(value * 24);
        },
        addWeeks:function(value) {
            return this.addDays(value * 7);
        },
        addMonths:function(value) {
            var n = this.getDate();
            this.setDate(1);
            this.setMonth(this.getMonth() + value * 1);
            this.setDate(Math.min(n, Date.getDaysInMonth(this.getFullYear(), this.getMonth())));
            return this;
        },
        addYears:function(value) {
            return this.addMonths(value * 12);
        },
        add:function(config) {
            if (typeof config == "number") {
                return this;
            }

            var x = config;

            if (x.seconds) {
                this.addSeconds(x.seconds);
            }
            if (x.minutes) {
                this.addMinutes(x.minutes);
            }
            if (x.hours) {
                this.addHours(x.hours);
            }
            if (x.weeks) {
                this.addWeeks(x.weeks);
            }
            if (x.months) {
                this.addMonths(x.months);
            }
            if (x.years) {
                this.addYears(x.years);
            }
            if (x.days) {
                this.addDays(x.days);
            }
            return this;
        }
    }, Date.prototype);
})(this);