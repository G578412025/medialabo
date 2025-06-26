const b = document.querySelector('button#print');
const p = document.querySelector('p#message');
const input = document.querySelector('input');
let shimei,aisatsu;

b.addEventListener('click', greeting);

function greeting() {
    shimei = input.value;
    aisatsu  = "こんにちは," + shimei + "さん";
    p.textContent = aisatsu;
}