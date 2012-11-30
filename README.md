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
* Using reunion today!

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

## examples ##

Take a look at the following projects which I have updated to use reunion. Look at how much easier the code is to read, follow, and maintain!

* [jquery-qrcode](https://github.com/shtylman/jquery-qrcode)
* [bintrees](https://github.com/shtylman/js_bintrees)

More examples as I make them :)

## advanced ##

Users making more extensive use of npm modules for their client side development should check out the following projects:

* [script](https://github.com/shtylman/script)
* [browserify](https://github.com/substack/browserify)
* [component](https://github.com/component/component)

