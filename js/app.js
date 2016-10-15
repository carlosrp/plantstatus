/**
 * app.js
 */

/**
 * Application model
 */
var model = {
  objStatus: ['Normal', 'In Operation', 'LTP'],
  /**
   * Model initiaisation
   */
  init: function() {

  },
  /**
   * Move object (id) to next status
   */
  rotateObjStatus: function(id) {
    if( id < model.objList.length ) {

    }
  }
};

/**
 * Application octopus (controller)
 */
var octopus = {
  /**
   * Octopus initialisation
   */
  init: function() {
    model.init();
    viewModel.init();
    // /**
    //  * Add dynamic elements
    //  */
    // console.log('List:', model.objList);
    // for( var obj of model.objList) {
    //   console.log('Object:', obj);
    //   viewModel.drawImage( obg.tag, obj.img[obj.status], obj.coords.x, obj.coords.y);
    // }
  }
};

/**
 * Application ViewModel
 */
var viewModel = {
  staticPlantImg: ko.observable(),
  /**
   * Plant dynamic objects
   */
  objList: ko.observableArray(),
  /**
   * viewModel initialisation function; called from Octopus initialisation.
   */
  init: function() {
    /**
     * Load Plant Static image
     */
    viewModel.staticPlantImg('images/plant-background.svg');
    //viewModel.drawImage( 'static-plant',viewModel.staticPlantImg, 0, 0);
    // Sample dynamic objects
    // ToDO: should be loaded from model, I guess
    viewModel.addPlantObj({
      'tag': '000__PO001C',
      'type': 'SWLP-up',
      'x': '180px',
      'y': '50px',
      'status': 0, // ToDO: Should be initialised last saved status
      'img': 'images/SWLP-up-grey.svg',
      'imgList': ['images/SWLP-up-grey.svg',
                  'images/SWLP-up-operation.svg',
                  'images/SWLP-up-LTP.svg']
    });
    viewModel.addPlantObj({
      'tag': '000__PO001D',
      'type': 'SWLP-up',
      'x': '270px',
      'y': '50px',
      'status': 0, // ToDO: Should be initialised last saved status
      'img': 'images/SWLP-up-grey.svg',
      'imgList': ['images/SWLP-up-grey.svg',
                  'images/SWLP-up-operation.svg',
                  'images/SWLP-up-LTP.svg']
    });
  },
  addPlantObj: function(obj) {
    // First add object to observable array
    viewModel.objList.push(obj);
    // Set object position
    var img = document.getElementById(obj.tag);
    img.style.left = obj.x;
    img.style.top = obj.y;
  },
  objClicked: function(obj) {
    console.log('Some object clicked', obj);
    var img = document.getElementById( obj.tag );
    obj.status = ++obj.status % 3;
    img.src = obj.imgList[obj.status];
  }
  // drawImage: function(htmlId, imgName, x, y) {
  //   console.log('Drawing', imgName, 'in ', x, y);
  //   var canvas = document.getElementById('plant-stat-canvas');
  //   var ctx = canvas.getContext('2d');
  //   var img = new Image();
  //   im.id = htmlId;
  //   img.addEventListener('load', function() {
  //     ctx.drawImage(img, x, y);
  //   }, false);
  //   img.src = imgName;
  // }
};

ko.applyBindings(viewModel);
octopus.init();
