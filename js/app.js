/**
 * app.js
 */

/**
 * Application model
 */
var model = {
  /**
   * Plant dynamic objects
   */
  objList: [
    {
      'tag': '000__PO001C',
      'type': 'SWLP-up',
      'coords': {
        'x': 180,
        'y': 50
      },
      'status': 0, // ToDO: Should be initialised last saved status
      'img': ['images/SWLP-up-grey.svg',
              'images/SWLP-up-operation.svg',
              'images/SWLP-up-LTP.svg']
    },
    {
      'tag': '000__PO001D',
      'type': 'SWLP-up',
      'coords': {
        'x': 270,
        'y': 50
      },
      'status': 0, // ToDO: Should be initialised last saved status
      'img': ['images/SWLP-up-grey.svg',
              'images/SWLP-up-operation.svg',
              'images/SWLP-up-LTP.svg']
    }
  ],
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
    /**
     * Add dynamic elements
     */
    console.log('List:', model.objList);
    for( var obj of model.objList) {
      console.log('Object:', obj);
      viewModel.drawImage( obg.tag, obj.img[obj.status], obj.coords.x, obj.coords.y);
    }
  }
};

/**
 * Application ViewModel
 */
var viewModel = {
  staticPlantImg: 'images/plant-background.svg',
  /**
   * viewModel initialisation function; called from Octopus initialisation.
   */
  init: function() {
    /**
     * Load Plant Static image
     */
    viewModel.drawImage( 'static-plant',viewModel.staticPlantImg, 0, 0);
  },
  drawImage: function(htmlId, imgName, x, y) {
    console.log('Drawing', imgName, 'in ', x, y);
    var canvas = document.getElementById('plant-stat-canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    im.id = htmlId;
    img.addEventListener('load', function() {
      ctx.drawImage(img, x, y);
    }, false);
    img.src = imgName;
  }
};

ko.applyBindings(viewModel);
octopus.init();
