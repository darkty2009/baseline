(function() {
    patch((function() {
        var _Set = function() {
            this.__source__ = [];
            this.size = 0;
        };

        patches({
            'delete':function(key) {
                var index = this.__source__findIndex(function(item) {
                    return item === key;
                });
                if(index >= 0) {
                    this.__source__.splice(index, 1);
                }
                this.size = this.__source__.length;
                return this;
            },
            clear:function() {
                this.__source__ = [];
                this.size = 0;
                return this;
            },
            entries:function() {
                return Iterator(this);
            },
            forEach:function(func, argv) {
                this.__source__.forEach(func, argv);
                return this;
            },
            has:function(key) {
                return this.__source__.findIndex(function(item) {
                    return item === key;
                }) >= 0;
            },
            add:function(value) {
                this.__source__.push(value);
                return this;
            },
            values:function() {
                var ite = Iterator(this);
                ite.current = 0;
                ite.next = function _iterator_() {
                    var value = this.iterator[this.current++];
                    if(this.current > this.length) {
                        throw new Error("stop iterate");
                    }
                    return {
                        value:value,
                        done:this.current >= this.length
                    };
                };
                return ite;
            }
        }, _Set.prototype);

        return _Set;
    })(), window, 'Set');

    patches({
        codePointAt:function(position) {
            'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            var size = string.length;

            var index = position ? Number(position) : 0;
            if (index != index) { // better `isNaN`
                index = 0;
            }
            if (index < 0 || index >= size) {
                return undefined;
            }

            var first = string.charCodeAt(index);
            var second;
            if ( first >= 0xD800 && first <= 0xDBFF && size > index + 1 ) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
            }
            return first;
        },
        contains:function() {
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        },
        endsWith:(function() {
            'use strict';
            var toString = {}.toString;
            return function endsWith(search) {
                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                if (search && toString.call(search) == '[object RegExp]') {
                    throw TypeError();
                }
                var stringLength = string.length;
                var searchString = String(search);
                var searchLength = searchString.length;
                var pos = stringLength;
                if (arguments.length > 1) {
                    var position = arguments[1];
                    if (position !== undefined) {
                        // `ToInteger`
                        pos = position ? Number(position) : 0;
                        if (pos != pos) { // better `isNaN`
                            pos = 0;
                        }
                    }
                }
                var end = Math.min(Math.max(pos, 0), stringLength);
                var start = end - searchLength;
                if (start < 0) {
                    return false;
                }
                var index = -1;
                while (++index < searchLength) {
                    if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                        return false;
                    }
                }
                return true;
            };
        })(),
        repeat:function(count) {
            if(typeof count != 'number') {
                throw new TypeError();
            }
            if(!isFinite(count) || count < 0) {
                throw new RangeError();
            }
            count = count | 0;

            var result = "";
            for(var i=0;i<count;i++) {
                result += this.toString();
            }
            return result;
        },
        startsWith:function(search) {
            var toString = {}.toString;
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            if (search && toString.call(search) == '[object RegExp]') {
                throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            var pos = position ? Number(position) : 0;
            if (pos != pos) {
                pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            if (searchLength + start > stringLength) {
                return false;
            }
            var index = -1;
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                    return false;
                }
            }
            return true;
        },
        trim:function() {
            return this.trimLeft().trimRight();
        },
        trimLeft:function() {
            return this.replace(/^\s+/g, '');
        },
        trimRight:function() {
            return this.replace(/\s+$/g, '');
        }
    }, String.prototype);

    patches({
        fromCodePoint: (function() {
            var stringFromCharCode = String.fromCharCode;
            var floor = Math.floor;
            return function fromCodePoint() {
                var MAX_SIZE = 0x4000;
                var codeUnits = [];
                var highSurrogate;
                var lowSurrogate;
                var index = -1;
                var length = arguments.length;
                if (!length) {
                    return '';
                }
                var result = '';
                while (++index < length) {
                    var codePoint = Number(arguments[index]);
                    if (
                        !isFinite(codePoint) ||
                            codePoint < 0 ||
                            codePoint > 0x10FFFF ||
                            floor(codePoint) != codePoint
                        ) {
                        throw RangeError('Invalid code point: ' + codePoint);
                    }
                    if (codePoint <= 0xFFFF) {
                        codeUnits.push(codePoint);
                    } else {
                        codePoint -= 0x10000;
                        highSurrogate = (codePoint >> 10) + 0xD800;
                        lowSurrogate = (codePoint % 0x400) + 0xDC00;
                        codeUnits.push(highSurrogate, lowSurrogate);
                    }
                    if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                        result += stringFromCharCode.apply(null, codeUnits);
                        codeUnits.length = 0;
                    }
                }
                return result;
            };
        })()
    }, String);
})();