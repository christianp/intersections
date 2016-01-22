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

function intersection(combo,ands) {
	var strings = combo.map(function(c){return strings_in[c];});

	var s = strings[0];
	var c;
	var filter_functions = {
		'and': function(s,c) {return s.filter(function(w){return c.indexOf(w)>=0})},
		'or': function(s,c) {return s.concat(c.filter(function(w){return s.indexOf(w)==-1}))},
		'not': function(s,c) {return s.filter(function(w){return c.indexOf(w)==-1})}
	};
	for(var i=1;i<combo.length;i++) {
		c = strings[i];
		s = filter_functions[ands[i-1]](s,c);
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

var and_options = ['and','not'];
var and_labels = {
	'and': 'and in',
	'not': 'and not in'
};
var ands = ['and','and'];

function make_and_toggle(n) {
	var toggle = document.getElementById('and-'+n);
	function set_toggle(i) {
		ands[n] = and_options[i];
		toggle.innerText = and_labels[ands[n]];
		toggle.setAttribute('data-option',ands[n]);
	}
	toggle.addEventListener('click',function() {
		var i = and_options.indexOf(toggle.getAttribute('data-option'));
		i = (i+1)%and_options.length;
		set_toggle(i);
		show_intersection();
	});
	set_toggle(0);
}
make_and_toggle(0);
make_and_toggle(1);

var combo;

function pick_combo() {
	combo = choose(weights,total_weight);

	describe(0,combo);
	describe(1,combo);
	describe(2,combo);
	show_intersection();
}
function show_intersection() {
	var words = intersection(combo,ands);
	var ul = document.getElementById('list');
	ul.innerHTML = '';
	words.forEach(function(word) {
		var li = document.createElement('li');
		li.innerText = word;
		ul.appendChild(li);
	});
}
pick_combo();

document.getElementById('go').addEventListener('click',pick_combo);
