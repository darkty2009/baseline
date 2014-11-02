(function() {
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
})();