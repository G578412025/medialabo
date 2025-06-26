const b = document.querySelector('button#print');
const p = document.querySelector('p#message');
const input = document.querySelector('input');
let shimei;

b.addEventListener('click', greeting);

function greeting() {
    shimei = input.value;
    let aisatsu  = "こんにちは," + shimei + "さん";
    p.textContent = aisatsu;
}