const wrapper = document.querySelector('.wrapper'),
selectBtn = wrapper.querySelector('.select-btn'),
options = wrapper.querySelector('.options'),
searchInput = wrapper.querySelector('input');
const divstretch = document.getElementById('stretch')



let operations = ['Simplify', 'Factor', 'Derive', 'Integrate', "Find 0's", 
'Find Tangent', 'Area Under Curve', 'Cosine', 'Sine', 'Tangent', 'Inverse Cosine', 
'Inverse Sine','Inverse Tangent', 'Absolute Value', 'Logarithm'];

function addOperation(selectedOperation){
  options.innerHTML = "";
  operations.forEach(operation=>{
    let isSelected = operation == selectedOperation ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}">${operation}</li>`;
    options.insertAdjacentHTML("beforeend", li);
    
  });
}
addOperation();
let result;
function updateName(selectedLi){
  searchInput.value = "";
  result = selectedLi.innerText;
  addOperation(selectedLi.innerText);
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;
  return result;
}

searchInput.addEventListener('keyup', ()=>{
  let arr = [];
  let searchedWord = searchInput.value.toLowerCase();
  arr = operations.filter(data=>{
    return data.toLowerCase().includes(searchedWord);
  }).map(data=>{
    let isSelected = data == selectBtn.firstElementChild.innerText ? "selected":"";
    return `<lionclick="updateName(this)" class = "${isSelected}">${data}</li>`;
  }).join("");
 options.innerHTML = arr;

})
selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

// const icon = document.getElementById('icon');
// const ulList = document.querySelector('.navbar-menu');
// icon.addEventListener('click', ()=>{
//   ulList.toggleAttribute('.show');
// })


//main part - fetching result
const mathForm = document.getElementById('mathForm'),
expressionVal = mathForm.querySelector('#expressionInput');
let a = JSON.parse(localStorage.getItem("counter"));
let arr = JSON.parse(localStorage.getItem("problems"));
if (a == null) {
    a = 0;
}
if (arr == null) {
    arr = [];
}

mathForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const expressionValue = expressionVal.value;
  const operationValue = result.toLowerCase();
  
  console.log('Expression:', expressionValue);
  console.log('Operation:', operationValue);
  callApi(expressionValue, operationValue);
 });


  function displayResult(data){
    // divstretch.classList.add('container-stretch');
    const displayDiv = document.getElementById('solutionContainer');
    const para1 = document.createElement('p');
    const span1 = document.createElement('span');
    span1.textContent = result;
    const span2 = document.createElement('span');
    span2.textContent = ' : ';
    const span3 = document.createElement('span');
    span3.textContent = expressionVal.value;
    para1.appendChild(span1);
    para1.appendChild(span2);
    para1.appendChild(span3);
    const para2 = document.createElement('p');
    para2.textContent = data.result;
    displayDiv.appendChild(para1);
    displayDiv.appendChild(para2);
    setTimeout(()=>{
      window.location.reload();
    }, 5000)
    
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
      a++;
      data.id = a;
      arr.push(data);
      localStorage.setItem("problems", JSON.stringify(arr));
      localStorage.setItem("counter", JSON.stringify(a));
    console.log(data.result);
    })
    .catch(error => console.log('error', error));
  }

  //Saved Solution Part

  let historyContainer = document.querySelector("#savedList");

  let historyArr = JSON.parse(localStorage.getItem("problems"));

  if (historyArr == null) {
      historyArr = [];
  }

  createHistoryData(historyArr);

  function createHistoryData(arr) {
      arr.forEach(el => {
          let li = document.createElement("li");
          li.setAttribute("id", el.id);
          historyContainer.append(li);
          // let date = new Date();

          li.innerHTML = `
                  <span>Operation: ${el.operation.toUpperCase()} </span><br>
                  <span>Expression: ${el.expression} </span><br>
                  <span>Solution: ${el.result} </span><br>
                  <span><button class="delete-btn">Delete</button></span>`
      });
  }


  let delete_buttons = document.querySelectorAll(".delete-btn");
  delete_buttons.forEach((el) => {
      el.addEventListener('click', (e) => {
          let id1 = e.target.parentNode.parentNode.getAttribute("id")
          e.target.parentNode.parentNode.remove();
          let newArray = historyArr.filter((element) => {
              console.log(element)
              if (element.id == id1) {
                  return false;
              } else {
                  return true;
              }
          })
          localStorage.setItem("problems", JSON.stringify(newArray))
          window.location.reload();
      })
  })

 

