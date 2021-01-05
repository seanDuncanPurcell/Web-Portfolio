const text = {};

function tagFilter(text) {
  let textArr = text.split('');
  let firstIndex = textArr.indexOf('<');
  let secondIndex = textArr.indexOf('>');
  while(firstIndex != -1 && secondIndex != -1){
    const charRemove = secondIndex - firstIndex + 1;
    textArr.splice(firstIndex, charRemove);
    firstIndex = textArr.indexOf('<');
    secondIndex = textArr.indexOf('>');
  }
  return textArr.join('');
}

function wordCap(text, num) {
  let textArr = text.split(' ');
  textArr.splice(num);
  return textArr.join(' ');
}

text.htmlTrunk = (htmlString, num = 20) => {;
  let text = tagFilter(htmlString);
  let newtext = wordCap(text, num);
  return newtext;  
}

module.exports = text;