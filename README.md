# reunion #

Bring your javascript files together. In a peaceful way.

**STOP**

* Writing massive, single file jquery plugins
* Writing the same (function(window) { })(window); closure around everything
* Worrying about supporting all those other loaders and strange systems
* Thinking that there is no other way!

**START**

* Using multiple files for your javascript projects
* Realizing that your source files don't have to be your distributed files
* Use simple common.js require syntax since you wanted a single file anyway
* Making it easier to maintain your javascript code.
* No setup required. No package.json required
* Saying **NO** to poor client side organization in *your* repos and start using reunion today!

## install ##

Node users:
```shell
npm install reunion -g
```
Ruby folks:
```shell
gem install reunion
```

## cli ##

Using reunion is the simplest thing you will do. ever.

```shell
reunion /path/to/your/client/lib.js > /path/to/your/client/dist/lib.js
```

That's it! Reunion will output to stdout your lib.js as well as include any local "dependencies" found through your "require" calls.

## commonjs requires in 2 seconds ##

Basic Premise: Files are modules. `module.exports` exposes what you want to share.

foo.js (main project file)
```javascript
// set local variable bar to the "module" bar.js (no extension needed)
// this variable can be called anything (usually similar to the string modulename for sanity)
var bar = require('./bar');

// we can now access anything in bar we exported
bar.say();
bar.my_constant;

// by default, the module.exports is an empty object {}
// you can override it with any other valid js type (object, function, string, etc...)
module.exports = function() {
    return bar.say() + bar.my_constant;
};

// since we don't export this, this variable is private to the file (our "module")
var private;
```

bar.js (lives next to foo.js)
```javascript
// if your require a directory
// the resolver will look for an index.js file and load that as the "module"
var baz = require('./foobar');

// this is the same thing as above
var baz = require('./foobar/index');

module.exports.say = function() {
    ...
};

module.exports.my_constant = 42;
```

index.js (in a folder called `foobar` next to foo.js)
```javascript
var Cat = function() {};

Cat.prototype = ...

module.exports = Cat;
```

## examples ##

Take a look at the following projects which I have ported to use reunion. Look at how much easier the code is to read, follow, and maintain!

* [jquery-qrcode](https://github.com/shtylman/jquery-qrcode)
* [bintrees](https://github.com/shtylman/js_bintrees)

Try porting over some of your small projects/client side libs! Super simple. If you want help porting, just ask :)

## makefile magic ##

Add the following snippets of code to your `makefile` to build your distribution files.

```makefile
# `make dist` to package for distribution, deps do the rest
dist: dist/awesome_lib.min.js

# assuming your main source file lives at `awesome_lib.js` in the project root
dist/awesome_lib.js: awesome_lib.js
    reunion --ns awesome_lib $< > $@

# minification courtesy of googlz
dist/awesome_lib.min.js: dist/awesome_lib.js
    url --data-urlencode "js_code@$<" \
        -d "output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
        http://closure-compiler.appspot.com/compile > $@
```

## advanced ##

Users making more extensive use of npm modules for their client side development should check out the following projects:

* [script](https://github.com/shtylman/node-script)
* [browserify](https://github.com/substack/browserify)
* [component](https://github.com/component/component)

