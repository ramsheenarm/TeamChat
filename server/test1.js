var S = 'We test coders. Give us a try?';

var findLargest = function(sentence) {
  var words = S
  .split(/[?!.]/)
  .filter(function(text) {
    return text.length > 0;
  })
  .map(function(text) {
    return text.trim().split(' ');  
  })
  .map(function(textArray) {
    return textArray.filter(function(word) {
      if (!word.match(/ +/g)) {
        return word;
      }
    })
  })
  .map(function(splitText){
    return splitText.length;
  })
  

  
  return Math.max.apply(null, words);
};

let i= findLargest(S);
console.log(i);