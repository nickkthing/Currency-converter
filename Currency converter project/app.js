// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahemed0/currency-api@1/latest/currencies"
// const BASE_URL = "https://open.er-api.com/v6/latest/USD"
const BASE_URL = "https://api.exchangerate-api.com/v4/latest";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
    }else if (select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
}
select.addEventListener("change",(evt) =>{
    updateFlag(evt.target); // update flag when select changes
});
}

// const updateExchangeRate = async () =>{
//     let amount = document.querySelector(".amount input"); // get the amount entered by the user.
//     let amtVal = amount.value; // get the value of the amount entered by the user.
//     console.log(amtVal); 
//     if(amtVal === "" || amtVal <= 0){
//         // alert("Please enter a valid amount"); // check if the amount is valid or not.
//         amtVal = 1;
//         amount.value = "1";
//     }

//     // console.log(fromCurr.value, toCurr.value); // get the selected currencies.
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL); // fetch the data from the API.
//     let data = await response.json();
//     let rate = data[toCurr.value.toLowerCase()]; // get the rate of the selected currencies.
    
//     let finalAmount = amtVal * rate;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// }

//using gpt- 
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal <= 0) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.rates[toCurr.value];

        if (!rate) {
            msg.innerText = "Exchange rate not available.";
            return;
        }

        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching data.";
    }
};


const updateFlag = (element) => {
    let currCode = element.value; 
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault(); 
    updateExchangeRate(); // update the exchange rate when button is clicked.
});

window.addEventListener("load", () => {
    updateExchangeRate(); 
});