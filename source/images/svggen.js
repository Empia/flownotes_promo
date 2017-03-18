var SVGSpriter				= require('svg-sprite'),
mkdirp						= require('mkdirp'),
path						= require('path'),
fs							= require('fs'),
spriter       = new SVGSpriter({
dest: 'out',
mode: { 
view: false,
defs: true,
symbol: {
symbol: true,
example: true
},
stack: true,

css: {
    render: {
       css: true
    }, example: true
  }
}
})


// Add SVG source files — the manual way ...
spriter.add('./flonotes_logo.svg', null, fs.readFileSync('./flonotes_logo.svg', {encoding: 'utf-8'}));
//spriter.add('assets/svg-2.svg', null, fs.readFileSync('assets/svg-2.svg', {encoding: 'utf-8'}));
	/* ... */

// Compile the sprite
spriter.compile(function(error, result) {
	/* Write `result` files to disk (or do whatever with them ...) */
	for (var mode in result) {
		for (var resource in result[mode]) {
			mkdirp.sync(path.dirname(result[mode][resource].path));
			fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
		}
	}
});
