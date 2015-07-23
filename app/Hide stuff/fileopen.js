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


// tjhe html

<div>
	<h1>SVG goes Here
		<h1>
			<input type="file" id="files" name="files[]" multiple/>
			<output id="list"></output>
			<canvas id="placeSvgHere" />
</div>

<script>
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
</script>