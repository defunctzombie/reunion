#!/usr/bin/env node

// builtin
var path = require('path');
var fs = require('fs');

// vendor
var required = require('required');
var merge = require('merge');

var arg = require('optimist')
    .usage('Usage: reunion [options] /path/to/file.js')
    .describe('ns', 'global variable to export module into')
    ;

var client_dir = __dirname + '/../client';
var argv = arg.argv;

if (argv.help) {
    arg.showHelp();
    return process.exit();
}

var file = argv._.shift();
var namespace = argv.ns;

if (!file) {
    console.error('Error: no js file specified\n');
    arg.showHelp();
    return process.exit(-1);
}

if (file[0] !== '/') {
    file = path.normalize(path.join(process.cwd(), file));
}

var base = path.dirname(file);

// return flattened dependencies
function flatten(deps) {
    var flat = {};

    deps.forEach(function(dep) {
        var reqs = {};

        dep.deps.forEach(function(dep) {
            reqs[dep.id] = dep.filename;
        });

        // bring in all the child dependencies
        merge(flat, flatten(dep.deps));
        flat[dep.filename] = reqs;
    });

    return flat;
};

required(file, function(err, deps) {
    if (err) {
        return exit(err);
    }

    var flat = flatten(deps);

    // full name -> alias
    var ids = {};

    deps.forEach(function(dep) {
        ids[dep.filename] = dep.id;
    });

    // list of dependencies to render
    var final = [];

    // from -> to objects
    var aliases = [];

    Object.keys(flat).forEach(function(fullname) {
        final.push(fullname);

        var deps = flat[fullname];
        Object.keys(deps).forEach(function(id) {
            var filename = deps[id];
            var curr = ids[filename];

            if (!curr) {
                ids[filename] = id;
                return;
            }

            if (curr === id) {
                return;
            }

            aliases.push({
                from: curr,
                to: id
            });
        });
    });

    // main file
    ids[file] = '__main__';
    final.push(file);

    var out = process.stdout;

    // main closure
    if (namespace) {
        out.write(namespace + ' = ');
    }
    out.write('(function(window) {\n');
    out.write('var global = window;\n');

    out.write(fs.readFileSync(client_dir + '/require.js', 'utf-8'));

    final.forEach(function(filename) {
        var id = ids[filename];

        var src = fs.readFileSync(filename, 'utf-8');

        out.write('require.m[\'' + id + '\'] = function(module, exports) {\n');
        out.write(src);
        out.write('};\n');
    });

    // write out aliases last, since they reference previous modules
    aliases.forEach(function(alias) {
        out.write('require.m[\''+ alias.from + '\'] = require.m[\'' + alias.to + '\'];\n');
    });

    out.write('return require(\'__main__\');\n');

    // close main closure
    out.write('})(window);\n');
});

function exit(err) {
    if (err) {
        console.error(err);
        return process.exit(-1);
    }

    process.exit(0);
}


