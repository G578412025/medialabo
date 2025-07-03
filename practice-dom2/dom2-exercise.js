//////////////// ここは書き換えてはいけない！ 

let campus = {
	address: "八王子市館町",
	buildingD: ["D101", "D102", "D103", "D201", "D202", "D203", "D204", "D205"],
	lon: 35.624869704425,
	lat: 139.28201056633
};

let gakka = [
	{name: "機械システム工学科", ename: "Department of Mechanical Systems Engineering"},
	{name: "電子システム工学科", ename: "Department of Electronics and Computer Systems"},
	{name: "情報工学科", ename: "Department of Computer Science"},
	{name: "デザイン学科", ename: "Department of Design"}
];

//////////////// ここから下にプログラムを書きたそう!
const btn_show = document.querySelector('button#show');
btn_show.addEventListener('click',show);

function show(){
	let  p = document.createElement('p');
	p.textContent = campus.address;
	const addr = document.querySelector("h2#addr");
	addr.insertAdjacentElement('afterend',p);

	let ul = document.createElement('ul');
	const dept = document.querySelector('h2#dept');
	for(let row of gakka){
		let li = document.createElement('li');
		li.textContent = row.name;
		ul.insertAdjacentElement('beforeend',li);
	}
	dept.insertAdjacentElement('afterend',ul);
}