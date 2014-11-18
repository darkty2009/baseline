patches({
    toCamelCase:function() {
        var result = this.trim().replace(/(\-|_|\s)+(.)?/g, function(match, sep, c) {
            return c ? c.toUpperCase() : '';
        });
    },
    isEmpty:function() {
        return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
    },
    repeat:function(count) {
        return new this.constructor(new Array(count + 1).join(this.toString()));
    },
    parse:function(pairsDelimeter, pairDelimeter) {
        var pairs = this.split(pairsDelimeter);
        var result = {};
        pairs.forEach(function(pair) {
            var query = pair.split(pairDelimeter);
            result[query[0]] = query[1];
        });
        return result;
    },
    byteslength:function() {
        var matches = this.match(/[^\x00-\xff]/g);
        return this.length + (!matches ? 0 : matches.length);
    },
    lines:function() {
        return this.replaceAll('\r\n', '\n').s.split('\n');
    },
    truncate:function(length, suffix) {
        var str = this;

        length = ~~length;
        suffix = suffix || '...';

        if (str.length <= length) return new this.constructor(str);

        var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
            template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

        if (template.slice(template.length-2).match(/\w\w/))
            template = template.replace(/\s*\S+$/, '');
        else
            template = template.slice(0, template.length-1).trimRight();

        return (template+suffix).length > str.length ? str : str.slice(0, template.length)+suffix;
    },
    pad:function(len, fix, type) {
        fix = fix || ' ';
        type = type || 'left';
        var result = this.toString();
        if(this.length > len) {
            return result;
        }
        len = len - this.length;
        var left = new Array((type == 'left' ? len : (type == 'right' ? 0 : Math.ceil(len / 2))) + 1).join(fix);
        var right = new Array((type == 'left' ? 0 : (type == 'right' ? len : Math.floor(len/ 2))) + 1).join(fix);
        return left + result + right;
    },
    lpad:function(len, fix) {
        return this.pad(len, fix, 'left');
    },
    rpad:function(len, fix) {
        return this.pad(len, fix, 'right');
    },
    lrpad:function(len, fix) {
        return this.pad(len, fix, 'center');
    },
    strip:function() {
        var result = this.toString();
        for(var i = 0;i<arguments.length;i++) {
            result = result.split(arguments[i]).join('');
        }
        return result;
    },
    wrapHTML:function(tag, opt) {
        var result = this.toString();
        var el = tag ? tag : 'span';
        var attrs = '';
        if(typeof opt == 'object') {
            for(var key in opt) {
                if(opt.hasOwnProperty(key)) {
                    attrs += ' ' + key + '="' + opt[key].escapeHTML() + '"';
                }
            }
        }
        result = '<' + el + ' ' + attrs + '>' + result + '</' + el + '>';
        return result;
    },
    escapeHTML:function() {
        var escapeChar = {
            '<':"lt",
            '>':"gt",
            '"':"quot",
            "'":"apos",
            '&':"amp"
        };
        return this.replace(/[&<>'"]/g, function(match) {
            return '&' + escapeChar[match] + ';';
        });
    }

}, String.prototype);
