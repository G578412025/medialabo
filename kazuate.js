let kotae = Math.floor(Math.random()*10) + 1;
console.log('答え(デバッグ用) : ' + kotae);

let kaisu = 0;
let fin_flg = false;

const button = document.querySelector('button#submit');
const input = document.querySelector('input#input_num');
const p = document.querySelector('p#result');
const cnt_p = document.querySelector('span#kaisu');
const ans_p = document.querySelector('span#answer')

button.addEventListener('click',hantei);

function hantei(){
    let yoso = input.value;
    let output;

    if(isNaN(yoso)){
        output = "数字を入力してください";
    }else{
        yoso = Number(yoso);
        if(yoso <= 0 || yoso >= 11){
            output = "1〜10で入力してください";
        }else{
            
            kaisu++;
            cnt_p.textContent = kaisu;
            ans_p.textContent = yoso;

            if(fin_flg){
                output = '答えは' + kotae + 'でした.ゲームは終了しています';
            }else{
                if(yoso === kotae){
                    output = '正解です!おめでとう!';
                    fin_flg = true;
                }else if(kaisu === 3){
                    output = 'まちがい.残念でした答えは' + kotae + 'です';
                    fin_flg = true;
                }else if(yoso < kotae){
                    output = 'まちがい. 答えはもっと大きいですよ';
                }else{
                    output = 'まちがい.答えはもっと小さいですよ';
                }
            }
        }
    }
    p.textContent = output;
}