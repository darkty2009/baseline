/**
 * JavaScript Baseline API
 */
(function(win) {
	window.bs_patch = (function() {
        var lessIE8 = '\v'=='v';
		if(Object.defineProperty && !lessIE8) {
			return function(impl, obj, method) {
                if(method && typeof obj[method] == "undefined") {
                    Object.defineProperty(obj, method, {
                        enumerable: false,
                        configurable: true,
                        writable: false,
                        value: impl
                    });
                }
			};
		}else {
			return function(impl, obj, method) {
				if(method && typeof obj[method] == "undefined") {
					obj[method] = impl;
				}
			};
		}
	})();
	var patch = window.bs_patch;
	
	window.bs_patches = function(impl, obj) {
		for(var key in impl) {
			if(impl !== window && impl.hasOwnProperty(key)) {
				patch(impl[key], obj, key);
			}
		}
	}
	var patches = window.bs_patches;
	
	patch(function() {
		return Array.prototype.slice.call(arguments);
	}, Array, "of");
	
	patches({
		entries:function() {
			return Iterator(this);
		},
		fill:function(value) {
		    var O = Object(this);
		    var len = parseInt(O.length);
		    var start = arguments[1];
		    var relativeStart = parseInt(start) || 0;
		    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
		    var end = arguments[2];
		    var relativeEnd = end === undefined ? len  : (parseInt(end) || 0);
		    var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
		    for (; k < final; k++) {
		        O[k] = value;
		    }
		    return O;
		},
		find:function(filter, context) {
			var index = this.findIndex(filter, context);
			if(index >= 0) {
				return this[index];
			}else {
				return undefined;
			}
		},
		findIndex:function(filter, context) {
			if(typeof filter != 'function') {
				throw new TypeError('filter must be a function'); 
			}
			var list = Object(this);
			var len = list.length >>> 0;
			var value;
			for(var i=0;i<len;i++) {
				if(i in list) {
					value = list[i];
					if(filter.call(context, value, i, list)) {
						return i;
					}
				}
			}
			return -1;
		},
		keys:function() {
			var ite = Iterator(this);
			ite.next = function() {
				var value = this.iterator[this.current++];
				if(this.current > this.length) {
					throw new Error("stop iterate");
				}
				return {
					value:value[0],
					done:this.current >= this.length
				};
			};
			return ite;
		}
	}, Array.prototype);

    // Date
    patches({
        now:function() {
            return new Date().getTime();
        },
        parse:(function() {
            var REGEX_ISO_8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
            var superParse = Date.parse;
            var localOffset = -(new Date().getTimezoneOffset());
            var localHours = Math.floor(localOffset / 60);
            var localMinutes = localOffset % 60;

            return function(v) {
                var matches = REGEX_ISO_8601.exec(v);
                if(matches) {
                    return Date.UTC(
                        matches[1],
                        (matches[2] || 1) - 1,
                        matches[3] || 1,
                        matches[4] - (matches[8] ? matches[9] ? matches[9] + matches[10] : 0 : localHours) || 0,
                        matches[5] - (matches[8] ? matches[9] ? matches[9] + matches[11] : 0 : localMinutes) || 0,
                        matches[6] || 0,
                        ((matches[7] || 0) + '00').substr(0, 3)
                    );
                }

                return superParse.apply(this, arguments);
            };
        })()
    }, Date);

    // Function
    patch(function(oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    }, Function.prototype, 'bind');
	
	// Iterator
	patch(function(argv) {
		var _Iterator = function() {
			this.length = 0;
			this.current = 0;
			
			this.source = arguments[0] || [];
			this.iterator = [];
			for(var key in this.source) {
				if(this.source.hasOwnProperty(key))
					this.iterator.push([key, this.source[key]]);
			}
			
			this.length = this.iterator.length;
			
			this.next = function() {
				var value = this.iterator[this.current];
				if(this.current >= this.length) {
					throw new Error("stop iterate");
				}
				return [this.current++, value];
				// return {
					// value:value,
					// done:this.current >= this.length
				// };
			};
		};

		return new _Iterator(argv);
	}, window, "Iterator");

    // JSON
    patch({}, window, 'JSON');
    patches({
        parse:function(json) {
            return eval("1," + json);
        },
        stringify:(function() {
            var ARRAY_STR = '[object Array]';
            var OBJECT_STR = '[object Object]';
            var STRING_STR = '[object String]';

            function arrayParser(json) {
                var result = '[';
                for(var i=0;i<json.length;i++) {
                    var type = Object.prototype.toString.call(json[i]);
                    if(type == ARRAY_STR) {
                        result += arrayParser(json[i]);
                    }
                    else if(type == OBJECT_STR) {
                        result += objectParser(json[i]);
                    }
                    else if(type == STRING_STR) {
                        result += '"'+json[i]+'"';
                    }
                    else {
                        result += json[i];
                    }
                    if(i < (json.length-1)) {
                        result += ',';
                    }
                }
                result += ']';
                return result;
            }

            function objectParser(json) {
                var result = '{';
                for(var key in json) {
                    if(json.hasOwnProperty(key)) {
                        result += '"'+key+'":';
                        var type = Object.prototype.toString.call(json[key]);
                        if(type == ARRAY_STR) {
                            result += arrayParser(json[key]);
                        }
                        else if(type == OBJECT_STR) {
                            result += objectParser(json[key]);
                        }
                        else if(type == STRING_STR) {
                            result += '"'+json[key]+'"';
                        }
                        else {
                            result += json[key];
                        }
                        result += ',';
                    }
                }
                result = (result.length > 1 ? result.substring(0, result.length - 1) : result) + '}';
                return result;
            }

            return function(json) {
                var result = '';
                var type = Object.prototype.toString.call(json);
                if(type == ARRAY_STR) {
                    return arrayParser(json);
                }
                if(type == OBJECT_STR) {
                    return objectParser(json);
                }
                if(type == STRING_STR) {
                    return '"'+json+'"';
                }
                return result += json, result;
            }
        })()
    }, window.JSON);
	
	patch((function() {
        // Plan One: use two hashmaps to store id-value and id-key
        // Plan Two: use array to simulate map, but performance
        var _Map = function() {
			this.__source__ = [];
            this.size = 0;
		};

        patches({
            'delete':function(key) {
                var index = this.__source__findIndex(function(item) {
                   return item[0] === key;
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
            get:function(key) {
                var index = this.__source__.findIndex(function(item) {
                    return item[0] === key;
                });
                return index>=0 ? this.__source__[index][1] : undefined;
            },
            has:function(key) {
                return this.__source__.findIndex(function(item) {
                    return item[0] === key;
                }) >= 0;
            },
            keys:function() {
                var ite = Iterator(this);
                ite.current = 0;
                ite.next = function _iterator_() {
                    var value = this.iterator[this.current++];
                    if(this.current > this.length) {
                        throw new Error("stop iterate");
                    }
                    return {
                        value:value[0],
                        done:this.current >= this.length
                    };
                };
                return ite;
            },
            set:function(key, value) {
                var pair = [key, value];
                var index = this.__source__.findIndex(function(item) {
                    return item[0] === key;
                });
                if(index >= 0) {
                    this.__source__[index] = pair;
                }else {
                    this.__source__.push(pair);
                }
                this.size = this.__source__.length;
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
                        value:value[1],
                        done:this.current >= this.length
                    };
                };
                return ite;
            }
        }, _Map.prototype);

		return _Map;
	})(), window, "Map");
	
	patches({
		acosh:function(x) {
            return Math.log(x + Math.sqrt(x * x - 1));
		},
		asinh:function(x) {
            return Math.log(x + Math.sqrt(x * x + 1));
		},
		atanh:function(x) {
            return Math.log((1+x)/(1-x)) / 2;
		},
		cbrt:function(x) {
            var y = Math.pow(Math.abs(x), 1/3);
            return x < 0 ? -y : y;
		},
		clz32:function(value) {
            var value = Number(value) >>> 0;
            return value ? 32 - value.toString(2).length : 32;
		},
		cosh:function(x) {
            return (Math.exp(x) + Math.exp(-x)) / 2;
		},
		expm1:function(x) {
            return Math.exp(x) - 1;
		},
		fround:function(x) {
            var f32 = new Float32Array(1);
            return f32[0] = x, f32[0];
		},
		hypot:function() {
            var y = 0;
            var length = arguments.length;

            for (var i = 0; i < length; i++) {
                y += arguments[i] * arguments[i];
            }
            return Math.sqrt(y);
		},
        imul:function(a, b) {
            var ah  = (a >>> 16) & 0xffff;
            var al = a & 0xffff;
            var bh  = (b >>> 16) & 0xffff;
            var bl = b & 0xffff;
            return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
        },
		log10:function(x) {
            return Math.log(x) / Math.LN10;
		},
		log1p:function(x) {
            return Math.log(1 + x);
		},
		log2:function(x) {
            return Math.log(x) / Math.LN2;
		},
		sign:function(x) {
            x = x*1;
            if( +x === x ) {
                return (x === 0) ? x : (x > 0) ? 1 : -1;
            }
            return NaN;
		},
		sinh:function(x) {
            return (Math.exp(x) - Math.exp(-x)) / 2;
		},
		tanh:function(x) {
            if(x == Infinity)
                return 1;
            return  (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
		},
		trunc:function(x) {
            return x < 0 ? Math.ceil(x) : Math.floor(x);
		}
		
	}, Math);

    patches({
        EPSILON:2.220446049250313e-16,
        MAX_VALUE:1.7976931348623157e+308,
        MIN_VALUE:5e-324,
        MAX_SAFE_VALUE:9007199254740992,
        MIN_SAFE_VALUE:-9007199254740992,
        NEGATIVE_INFINITY:-Infinity,
        POSITIVE_INFINITY:Infinity,
        "NaN":NaN,
        isFinite:function(val) {
            if(typeof val == 'number') {
                return window.isFinite(val);
            }
            return false;
        },
        isInteger:function isInteger (val) {
            return typeof val === "number" && isFinite(val) && val > Number.MIN_SAFE_VALUE && val < Number.MAX_SAFE_VALUE && Math.floor(val) === val;
        },
        isNaN:isNaN,
        parseFloat:parseFloat,
        parseInt:parseInt,
        toInteger:function(val) {
            return val | 0;
        }
    }, Number);

	patches({
		watch:function(key, handler) {
			var oldVal = this[key], newVal = oldVal,
                getter = function() {
                    return newVal;
                },
                setter = function(val) {
                    oldval = newVal;
                    return newVal = handler.call(this, key, oldVal, val);
                };

            // key is writable
            if(delete this[key] && Object.defineProperty) {
                Object.defineProperty(this, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
		},
		unwatch:function(key) {
			if(Object.defineProperty) {
                var val = this[key];
                delete this[key];
                this[key] = val;
            }
		}
	}, Object.prototype);
	
	patches({
		setPrototypeOf:function(obj, proto) {
			obj.__proto__ = proto;
			return obj;
		},
		is:function(v1, v2) {
			if (v1 === 0 && v2 === 0) {
				return 1 / v1 === 1 / v2;
			}
			if (v1 !== v1) {
				return v2 !== v2;
			}
			return v1 === v2;
		}
	}, Object);
	
	patch((function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty, 
			hasDontEnumBug = !({toString : null}).propertyIsEnumerable('toString'), 
			dontEnums = [
				'toString', 
				'toLocaleString', 
				'valueOf', 
				'hasOwnProperty', 
				'isPrototypeOf', 
				'propertyIsEnumerable', 
				'constructor'
			], 
			dontEnumsLength = dontEnums.length;

		return function(obj) {
			if ( typeof obj !== 'object' && ( typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [], prop, i;

			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for ( i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	})(), Object, 'keys');
	
	patch((function() {
        var _Proxy;
        _Proxy = function () {

        };
		
		return _Proxy;
	})(), window, 'Proxy');
	
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

    patch((function() {
        var _Promise = function(handler) {
            var queue = [];

            function next(i, val) {
                setTimeout(function() {
                    while (queue.length) {
                        var arr = queue.shift()
                        if (typeof arr[i] === 'function') {
                            try {
                                var chain = arr[i](val)
                            } catch (e) {
                                return reject(e)
                            }
                            if (chain && typeof chain.then === 'function') {
                                return chain.then(resolve, reject)
                            } else {
                                return _Promise.resolve(chain).then(resolve, reject)
                            }
                        }
                    }
                }, 1);
            }

            function resolve(value) {
                next(0, value);
            }

            function reject(message) {
                next(1, message);
            }

            handler(resolve, reject);

            this.then = function(resolve, reject) {
                queue.push([resolve, reject]);
                return this;
            };
            this.chain = this.then;

            this.catch = function(reject) {
                return this.then(undefined, reject);
            };
        };

        _Promise.deferred = function() {
            var result = [];
            result.promise = new Promise(function(resolve, reject) {
                result.resolve = resolve;
                result.reject = reject;
            });
            return result;
        };

        _Promise.resolve = _Promise.cast = function(value) {
            return new Promise(function(resolve) {
                resolve(value)
            });
        };
        
        _Promise.reject = function(message) {
        	return new Promise(function(resolve, reject) {
        		reject(message);
        	});
        };

        _Promise.all = function(values) {
            var defer = _Promise.deferred();
            var len = values.length;
            var result = [];
            
            function resolve(value, i) {
            	result[i] = value;
                len--;

                if(len == 0) {
                    defer.resolve(result);
                }
            }
            
            function reject(message) {
            	defer.reject(message);
            }

            values.forEach(function(item, i) {
            	if(!(item instanceof _Promise)) {
            		resolve(item, i);
            		return;
            	}
            	
                item.then(function(value) {
                    resolve(value, i);
                }, function(message) {
                    reject(message);
                });
            });

            return defer.promise;
        };

        _Promise.race = function(values) {
            var defer = _Promise.deferred();
            var first = true;
            
            function resolve(value, i) {
            	if(first) {
                    defer.resolve(value);
                    first = false;
                }
            }
            
            function reject(message) {
            	if(first) {
                    defer.reject(message);
                    first = false;
                }
            }

            values.forEach(function(item, i) {
            	if(!(item instanceof _Promise)) {
            		resolve(item, i);
            		return;
            	}
            	
                item.then(function(value) {
                    resolve(value, i);
                }, function(message) {
                    reject(message);
                });
            });

            return defer.promise;
        };

        return _Promise;
    })(), window, 'Promise');
})(window);