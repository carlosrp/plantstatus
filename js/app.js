/**
 * app.js
 */
'use strict';

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBmWsoB6qtm1nLerSf0yY_Jx_3SwphyLTE",
//   authDomain: "plantstat.firebaseapp.com",
//   databaseURL: "https://plantstat.firebaseio.com",
//   storageBucket: "plantstat.appspot.com",
//   messagingSenderId: "363782380167"
// };
// firebase.initializeApp(config);

var typeAttrs = {
  'SWLP-up': { 
  	'nStatus': '3',
  	'imgList': ['images/SWLP-up-grey.svg', 'images/SWLP-up-operation.svg', 'images/SWLP-up-LTP.svg']
  }
};

// Dynamic Element class object
var DynElement = function(tag, name, type, x, y) {
  this.tag = tag;
  this.name = name;
  this.type = type;
  this.x = x;
  this.y = y;
  this.status = 0; // ToDo: initial status to be read from data store
  // TODO: manage errors ---
  this.nStatus = typeAttrs[type].nStatus; // ToDo: will the number of status depends on the type
  this.imgList = typeAttrs[type].imgList;
  // TODO ------------------
  this.imgEl = null;
}
DynElement.prototype.cycleStatus = function() {
  this.status = ++this.status % this.nStatus;
  this.imgEl.setAttribute('src', this.getCurrentImg());
};
DynElement.prototype.getCurrentImg = function(){
  return this.imgList[this.status];
};

// TODO: elements read from Firebase
var listDynElements = [
  {'tag': '000__PO001C', 'name': 'SWLP C', 'type': 'SWLP-up', 'x': '180px', 'y': '50px'},
  {'tag': '000__PO001D', 'name': 'SWLP D', 'type': 'SWLP-up', 'x': '270px', 'y': '50px'}
];

// TODO: ----------------------------

// Collection of JS Objects corresponding to dynamic objects 
var dynElementsCollection = []; // Collection of DynElement

/**
 *
 */
function rotateDynElement(id) {
  console.log('Element', dynElementsCollection[id].tag, 'clicked');
  dynElementsCollection[id].cycleStatus();
};

// Bindings on load.
window.addEventListener('load', function() {

  // First, add background img
  var mainDiv = document.getElementById('plant-stat');
  var bckImg = document.createElement('img');
  bckImg.setAttribute('src', 'images/plant-background.svg');
  mainDiv.appendChild(bckImg);

  // Add dynamic elements
  listDynElements.forEach(function(el, idx) {
  	console.log('Adding element:', el.tag);
  	// -> Create JS object for dyn element
  	var dynEl = new DynElement(el.tag, el.name, el.type, el.x, el.y);
    dynEl.imgEl = document.createElement('img');
  	dynElementsCollection.push( dynEl );
    console.log('Setting initial image src as: ', dynEl.getCurrentImg());
    // -> Add img to DOM
    dynEl.imgEl.setAttribute('class', 'plant-obj');
    dynEl.imgEl.setAttribute('src', dynEl.getCurrentImg());
    dynEl.imgEl.style.left = dynEl.x;
    dynEl.imgEl.style.top = dynEl.y;
    dynEl.imgEl.setAttribute('onclick', 'rotateDynElement(' + idx + ')');
    mainDiv.appendChild(dynEl.imgEl);
  });

}, false);
