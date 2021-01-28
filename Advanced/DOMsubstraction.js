function substract(){
    let element1 = Number(document.getElementById('firstNumber').value);
    let element2 = Number(document.getElementById('secondNumber').value);
    let div = document.getElementById('result');
    div.innerText += element1 - element2;
}