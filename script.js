const BASE_URL = " https://v6.exchangerate-api.com/v6/459e2a76914d24e50a981b2a/latest";
const drop = document.querySelectorAll(".drop select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
let msg = document.querySelector(".msg");

for( let select of drop){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    let res= (amtVal*rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${res} ${toCurr.value}`;
}


const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});


window.addEventListener("load", ()=>{
    updateExchangeRate();
});
