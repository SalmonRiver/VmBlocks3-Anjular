'use strict';

/**
 * @ngdoc function
 * @name vmBlocks3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vmBlocks3App
 */



function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			f.size, ' bytes, last modified: ',
			f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
			'</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

	getSvg(files);
}


var getSvg = function (files) {
	
	var theFile =  files[0];

	console.log(theFile.name);
	console.log(theFile.type);

	var textType = /text.*/;

	var imageType = /image.*/;
	

	if (theFile.type.match(imageType)) {
		var reader = new FileReader();

		reader.onload = function (e) {
			console.log(reader.results);
			
          
			//fileDisplayArea.innerText = reader.result;
		}

		reader.readAsText(theFile);
	} else {
		console.log("File not supported!");
	}
}

angular.module('vmBlocks3App')
	.controller('SvgCtrl', function ($scope) {
		// dummies values before we hook up to  a web service
		//$scope.RawSvg = getSvg();



	});
  