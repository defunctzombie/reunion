var require = function(name) {
    var fn = require.m[name];
    if (fn.mod) {
        return fn.mod.exports;
    }

    var mod = fn.mod = { exports: {} };
    fn(mod, mod.exports);
    return mod.exports;
};

require.m = {};
