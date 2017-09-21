var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,b,e){if(c){b=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];d in b||(b[d]={});b=b[d]}a=a[a.length-1];e=b[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})}};$jscomp.polyfill("Object.is",function(a){return a?a:function(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,b){var c=this;c instanceof String&&(c=String(c));var d=c.length;for(b=b||0;b<d;b++)if(c[b]==a||Object.is(c[b],a))return!0;return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,b){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,b||0)}},"es6","es3");
$jscomp.polyfill("String.prototype.endsWith",function(a){return a?a:function(a,b){var c=$jscomp.checkStringArgs(this,a,"endsWith");a+="";void 0===b&&(b=c.length);b=Math.max(0,Math.min(b|0,c.length));for(var d=a.length;0<d&&0<b;)if(c[--b]!=a[--d])return!1;return 0>=d}},"es6","es3");
var nrmlAdjs=["normal","adjective",["adjectives","colors","numbers"]],nrmlNouns=["normal","noun",["animals","food","nature"]],nrmlTtl=["normal","title",["titles"]],verbs=["normal","verb",["verbs"]],categories=[nrmlAdjs,nrmlNouns,nrmlTtl,verbs],data=[],loader=[],Category=function(a,c,b){this.content=[];this.genre=c;this.grammar=b;this.name=a};data.push(new Category("custom","custom","custom"));
for(var i=0;i<categories.length;i++)for(var j=0;j<categories[i][2].length;j++)data.push(new Category(categories[i][2][j],categories[i][0],categories[i][1]));
function readTextFile(a,c){var b=new XMLHttpRequest;b.open("GET",a,!1);b.onreadystatechange=function(){if(4===b.readyState&&(200===b.status||0===b.status)){c.content=b.responseText.split("\n");var a=document.createElement("div"),d=document.createElement("input"),h=document.createElement("label"),n=document.createElement("i");d.type="checkbox";d.id=c.name;h.htmlFor=c.name;h.setAttribute("onclick","change(this)");n.className="fa fa-toggle-on";a.className="cat";a.style.display="none";h.appendChild(n);
h.appendChild(document.createTextNode(" "+c.name.charAt(0).toUpperCase()+c.name.slice(1)));a.appendChild(d).checked=!0;a.appendChild(h);document.getElementById("selections").appendChild(a)}};b.send(null)}function change(a){a.textContent.includes("Grammar")&&document.getElementById("grammar").disabled||(a=a.childNodes[0],a.classList.contains("fa-toggle-off")?a.className="fa fa-toggle-on":a.className="fa fa-toggle-off")}
function custCheck(a){var c=document.getElementById("c-only"),b=document.getElementById("c-plus"),e=document.getElementById("grammar");e.checked=!1;e.disabled=!0;e.nextElementSibling.childNodes[0].className="fa fa-toggle-off";switch(a){case "c-only":b.checked&&(change(b.nextElementSibling),b.checked=!1);c.checked||(e.disabled=!1);break;case "c-plus":c.checked&&(change(c.nextElementSibling),c.checked=!1),b.checked||(e.disabled=!1)}}
function goCaps(a,c,b,e){c&&(a=a.charAt(0).toUpperCase()+a.slice(1));b&&(a=a.toUpperCase());if(e){c="";for(var d in a)c=Math.floor(2*Math.random())?c+a[d].toUpperCase():c+a[d];a=c}return a}function goLeet(a,c){var b=a;a.endsWith("ed")&&(b=a.slice(0,-2)+"d");a.endsWith("er")&&(b=a.slice(0,-2)+"xor");"verb"===c.grammar&&(b+="age");return b=b.replace(/a/g,"4").replace(/e/g,"3").replace(/f/g,"ph").replace(/i/g,"1").replace(/t/g,"7").replace(/o/g,"0").replace(/s/g,"5").replace(/ate/g,"8")}
function harvest(){for(var a in data)"custom"!==data[a].name&&readTextFile("https://raw.githubusercontent.com/mdawsondev/alias-generator/master/src/data/"+data[a].name+".txt",data[a])}function list(a){a=a.childNodes[0];for(var c=document.getElementsByClassName("cat"),b=0;b<c.length;b+=1)c[b].style.display="none"!==c[b].style.display?"none":"initial";a.classList.contains("fa-plus")?a.className="fa fa-minus":a.className="fa fa-plus"}
function swap(a){for(var c=document.getElementsByClassName("gencontent"),b=0;b<c.length;b++)c[b].style.display="none";document.getElementById("gen"+a).style.display="flex"}
function begin(){var a=document.getElementById("count").value,c=document.getElementById("c-only"),b=document.getElementById("c-plus"),e=document.getElementById("caps"),d=document.getElementById("caps-random"),h=document.getElementById("caps-only"),n=document.getElementById("grammar"),q=document.getElementById("leet"),r=document.getElementById("norepeats"),l="",g=data[0],f=[];if(c.checked||b.checked)g.content=document.getElementById("c-list").value.split(", "),f.push(g);if(!c.checked)for(b.checked||
(g.content=[]),c=0;c<data.length;c++)document.getElementById(data[c].name).checked&&f.push(data[c]);c=!1;b=0;0===f[0].content.length&&f.shift();for(g=0;g<f.length;g++)"title"===f[g].grammar&&(b=g,c=!0);g=[];for(var m=0;m<a;m++){var p=Math.floor(Math.random()*f.length),k=f[p].content[Math.floor(Math.random()*f[p].content.length)];if(r.checked)if(0>g.indexOf(k))g.push(k);else continue;if(n.checked&&(c&&0===m&&(k=f[b].content[Math.floor(Math.random()*f[b].content.length)]),m===a-1&&"noun"!==f[p].grammar)){--m;
continue}q.checked&&(k=goLeet(k,f[p]));if(e.checked||h.checked||d.checked)k=goCaps(k,e.checked,h.checked,d.checked);l+=k}0===l.length&&(l="Select a Word Count!");for(a=0;a<document.getElementsByClassName("alias0").length;a++)document.getElementsByClassName("alias0")[a].innerHTML=l;document.getElementById("alias1").innerHTML=l;loader.unshift(l);4<loader.length&&loader.pop();loader[1]&&(document.getElementById("alias2").innerHTML=loader[1]);loader[2]&&(document.getElementById("alias3").innerHTML=loader[2]);
loader[3]&&(document.getElementById("alias4").innerHTML=loader[3])}window.onload=function(){harvest()};