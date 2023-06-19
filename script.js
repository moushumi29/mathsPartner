const wrapper = document.querySelector('.wrapper'),
selectBtn = wrapper.querySelector('.select-btn'),
options = wrapper.querySelector('.options'),
searchInput = wrapper.querySelector('input');
const divstretch = document.getElementById('stretch');

let operations = ['Simplify', 'Factor', 'Derive', 'Integrate', "Find 0's", 
'Find Tangent', 'Area Under Curve', 'Cosine', 'Sine', 'Tangent', 'Inverse Cosine', 
'Inverse Sine','Inverse Tangent', 'Absolute Value', 'Logarithm'];

let clickCount = 0, selectCount = 0;

selectBtn.addEventListener('click', function(){
  clickCount++;
  if(clickCount%2 === 1){
    divstretch.classList.add('container-stretch');
  }else{
    divstretch.classList.remove('container-stretch');
  }
  
})
// options.addEventListener('click', function(){
//   selectCount++;
//   if(selectCount%2 === 0){
//     divstretch.classList.add('container-stretch');
//   }else{
//     divstretch.classList.add('container-stretch');
//   }
// })
function addOperation(selectedOperation){
  options.innerHTML = "";
  operations.forEach(operation=>{
    let isSelected = operation == selectedOperation ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}">${operation}</li>`;
    options.insertAdjacentHTML("beforeend", li);
    
  });
}
addOperation();

function updateName(selectedLi){
  searchInput.value = "";
  result = selectedLi.innerText;
  addOperation(selectedLi.innerText);
  selectBtn.firstElementChild.innerText = selectedLi.innerText;
  wrapper.classList.remove("active");
  return result;
}
let result;
searchInput.addEventListener('keyup', ()=>{
  let arr = [];
  let searchedWord = searchInput.value.toLowerCase();
  arr = operations.filter(data=>{
    return data.toLowerCase().includes(searchedWord);
  }).map(data=>{
    let isSelected = data == selectBtn.firstElementChild.innerText?"selected":"";
    return `<lionclick="updateName(this) class = "${isSelected}">${data}</li>`;
  }).join("");
 options.innerHTML = arr;

})

selectBtn.addEventListener('click', ()=>{
  wrapper.classList.toggle("active");
})


//main part - fetching result
const mathForm = document.getElementById('mathForm'),
expressionVal = mathForm.querySelector('#expressionInput');


mathForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const expressionValue = expressionVal.value;
  const operationValue = result.toLowerCase();
  
  console.log('Expression:', expressionValue);
  console.log('Operation:', operationValue);
  callApi(expressionValue, operationValue);
});
  function displayResult(data){
    divstretch.classList.add('container-stretch');
    const displayDiv = document.getElementById('solutionContainer');
    const para1 = document.createElement('p');
    const span1 = document.createElement('span');
    span1.textContent = result;
    const span2 = document.createElement('span');
    span2.textContent = ' : ';
    const span3 = document.createElement('span');
    span3.textContent = expressionVal.value;
    para1.append(span1, span2, span3);
    const para2 = document.createElement('p');
    para2.textContent = data.result;
    displayDiv.append(para1, para2);
    
  }
 function callApi(expressionValue, operationValue ){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let operation = operationValue;
  let expression = expressionValue;
  console.log(expression+" "+operation);
  console.log("fetching");
  let url = `https://newton.now.sh/api/v2/${operation}/${expression}`;
  let encodedUrl = encodeURI(url);
  console.log(encodedUrl);
  fetch(encodedUrl, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log("string");
      let data =JSON.parse(result);
      displayResult(data);
      var input2 = data.result;
      document.querySelector(".inputBox2").innerHTML = input2;
      
    console.log(data.result);
    })
    .catch(error => console.log('error', error));
  }

 

