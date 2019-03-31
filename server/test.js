function solution(A){
if(A.length < 1){
    return 0;
  }
  if((A.substring().includes(".") || A.substring().includes("?") || A.substring().includes("!")) && A.length === 1 ){
    return 0;
  }
  var maxWord = 0;
  var count = 0;
  var splits = A.split(".","?","!");
  
  
  for(var i = 0; i < splits.length; i++){
      console.log("i");
    if(splits[i].substring().includes(" ")){ 
         count++;
    }
      if(count > maxWord){
        maxWord = count;
      }
  }
  return maxWord;
}
A="Forget  CVs..Save time . x x";
let maxcount = solution(A);
console.log(maxcount);