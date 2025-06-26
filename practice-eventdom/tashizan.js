const input_num1 = document.querySelector('input#left');
const input_num2 = document.querySelector('input#right');
const span = document.querySelector('span#answer');
const button = document.querySelector('button#calc');
let ans,num1,num2;

button.addEventListener('click',sum);

function sum(){
    num1 = input_num1.value;
    num2 = input_num2.value;

    if(!isNaN(num1) && !isNaN(num2)){
        num1 = Number(num1);
        num2 = Number(num2);
        ans = num1 + num2;
    }else{
        ans = "数字を入力してください！";
    }

    span.textContent = ans;
}