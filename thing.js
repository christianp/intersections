function choose(choices,total_weight) {
	var n = Math.random()*total_weight;

	var t = 0;
	for(var i=0;i<choices.length;i++) {
		t += choices[i][1];
		if(t>=n) {
			return choices[i][0];
		}
	}
}

function intersection(combo) {
	var strings = combo.map(function(c){return strings_in[c];});

	var s = strings[0];
	for(var i=1;i<combo.length;i++) {
		var c = strings[i];
		console.log(c);
		s = s.filter(function(w){return c.indexOf(w)>=0});
	}
	return s;
}

function describe(n,combo) {
	var a = document.querySelector('#description-'+n+' a');
	var filename = combo[n].replace(/\\/g,'/');
	var url = 'https://github.com/dariusk/corpora/blob/master/data/'+filename;
	a.setAttribute('href',url);
	a.innerText = descriptions[combo[n]];
}

function show() {
	var combo = choose(weights,total_weight);
	var words = intersection(combo);

	describe(0,combo);
	describe(1,combo);
	describe(2,combo);

	var ul = document.getElementById('list');
	ul.innerHTML = '';
	words.forEach(function(word) {
		var li = document.createElement('li');
		li.innerText = word;
		ul.appendChild(li);
	});
}
show();

document.getElementById('go').addEventListener('click',show);
