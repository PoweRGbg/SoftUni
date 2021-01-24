function solve() {
  //TODO
  let textInput = document.getElementById('input').value.split('.');
  textInput = textInput.filter(sentence => sentence.length > 0);

  let html = '';
  if(textInput.length < 3){
    html = `<p>${textInput.join('.')}.</p>}`;
  } else {
    for (let index = 0; index < textInput.length; index++) {
      const sentence = textInput[index];
      if((index % 3)+1 == 1){
        //new paragraph
        html += '<p>';
      }
      html += sentence +".";
      if(index % 3 == 2 ){
        html += '</p>'; // close paragraph after every 3 sentences
      }
    }
    // html += '</p>';
  }
  document.getElementById('output').innerHTML += html;
}