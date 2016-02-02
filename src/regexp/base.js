(function(win) {
    var patch = win.patch;

    patch.some({
        escape:function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
    }, RegExp);
})(this);