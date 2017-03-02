var path = require('path');

/*** IMAGES ***/
var projectDir = path.join(__dirname, '..');
var bruceDir   = path.join(projectDir, "content","images","Bruce");
var falconDir  = path.join(projectDir, "content","images","Falcon");
var ragsDir	   = path.join(projectDir, "content","images","Medieval");
var waifuDir   = path.join(projectDir, "content","images","Waifu");
var sandlerDir = path.join(projectDir, "content","images","Sandler");
var okDir	   = path.join(projectDir, "content","images","OK");
var thumbImg   = path.join(projectDir, "content","images","thumb.jpg");
var panImg	   = path.join(projectDir, "content","images","PanGasm.png");
var dolphinImg = path.join(projectDir, "content","images","dolphin.jpg");

module.exports = {
	bruceDir: bruceDir,
	ragsDir: ragsDir,
	falconDir: falconDir,
	sandlerDir: sandlerDir,
	thumbImg: thumbImg,
	panImg: panImg,
	dolphinImg: dolphinImg,
	waifuDir: waifuDir,
	okDir: okDir
};
