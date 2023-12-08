// This selects the first text field, Name, as soon as the page is loaded 
document.getElementById("name").focus();

// The other job role text field is only shown if Other is selected in the first Job Role dropdown menu
const other = document.getElementById("other-job-role");
other.style.display = "none";
const dropdown = document.getElementById("title");

dropdown.addEventListener("change", (e) => {
    if (dropdown.value === "other") {
        other.style.display = "block";
    } else {
        other.style.display = "none";
    };
});

/* This will disable the color menu by default, then when either one of the two designs is select
will only show the colors that are available with that design
*/
const colorElement = document.getElementById("color");
const designElement = document.getElementById("design")
const colorOptions = colorElement.options;
colorElement.disabled = true;

designElement.addEventListener("change", (e) => {
    colorElement.disabled = false;
    const selectedTheme = designElement.value;
    colorElement.style.display = "block";
    for (let i = 1; i < colorOptions.length; i++) {
        if (colorOptions[i].getAttribute('data-theme') !== selectedTheme) {
          colorOptions[i].style.display = "none";
        } else {
            colorOptions[i].style.display = "";
        };
    };
    
});

/* This will take the cost attribute that every activity has associated with it, sum it up if the
activity is selected and modify the "Total Cost" element on the page to show the total
*/
const activities = document.getElementById('activities');
const finalTotal = document.getElementById('activities-cost');
let runningTotal = 0;


activities.addEventListener("change", (e) => { 
    if (e.target.checked) {
    runningTotal = runningTotal + parseInt(e.target.getAttribute('data-cost'));
    finalTotal.textContent = `Total Cost: $${runningTotal}`;
    } else {
        runningTotal = runningTotal - parseInt(e.target.getAttribute('data-cost'));
        finalTotal.textContent = `Total Cost: $${runningTotal}`;
    }
});

/* The following handles the payment section and only shows the information/text fields relevant
to the payment method selected by the user
*/

const paymentMethod = document.getElementById('payment');
paymentMethod[1].setAttribute('selected', 'selected');

document.getElementById('paypal').style.display = "none";
document.getElementById('bitcoin').style.display = "none";
let paymentMethodSelected = 'credit-card';

paymentMethod.addEventListener('change', (e) => {
    document.getElementById('paypal').style.display = "none";
    document.getElementById('bitcoin').style.display = "none";
    document.getElementById('credit-card').style.display = "none";
    document.getElementById(e.target.value).style.display = "block";
    paymentMethodSelected = e.target.value;
});



/* This handles form validation and makes sure that the required fields are filled in according to certain parameters
it also handles visual validation errors, it will show a hint and a red x if the field was filled out wrong and a green tick
if the field was filled out correctly
*/

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
const formName = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const ccNum = document.getElementById('cc-num');
const cvvNum = document.getElementById('cvv');
const zipNum = document.getElementById('zip');
const activitiesChecked = document.querySelectorAll('input[type="checkbox"]:checked');
const ccNumRegex = /^\d{13,16}$/;
const zipCodeRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;  
        
        if (formName === '') {
            if (document.getElementById('name').parentElement.classList.contains('valid')) {
                document.getElementById('name').parentElement.classList.remove('valid');
            };
            document.getElementById('name').parentElement.classList.add('not-valid');
            document.getElementById('name').nextElementSibling.style.display = "block";
            e.preventDefault();
        } else {
            document.getElementById('name').parentElement.classList.remove('not-valid');
            document.getElementById('name').parentElement.classList.add('valid');
            document.getElementById('name').nextElementSibling.style.display = "none";
        };

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            if (document.getElementById('email').parentElement.classList.contains('valid')) {
                document.getElementById('email').parentElement.classList.remove('valid');
            };
            document.getElementById('email').parentElement.classList.add('not-valid');
            document.getElementById('email').nextElementSibling.style.display = "block";
            e.preventDefault()
        } else {
            document.getElementById('email').parentElement.classList.add('valid');
            document.getElementById('email').parentElement.classList.remove('not-valid');
            document.getElementById('email').nextElementSibling.style.display = "none";
        };

        if (activitiesChecked.length === 0) {
            if (document.getElementById('activities').classList.contains('valid')) {
                document.getElementById('activities').classList.remove('valid');
            };
            document.getElementById('activities').classList.add('not-valid');
            document.getElementById('activities-hint').style.display = "block";
            e.preventDefault()
        } else {
            if (document.getElementById('activities').classList.contains('not-valid')) {
                document.getElementById('activities').classList.remove('not-valid');
            };
            document.getElementById('activities').classList.add('valid');
            document.getElementById('activities-hint').style.display = "none";
        };

        if (paymentMethodSelected === "credit-card") {
        checkCreditCard(ccNum, ccNumRegex);
        checkCreditCard(cvvNum, cvvRegex);
        checkCreditCard(zipNum, zipCodeRegex);

        };
         
    function checkCreditCard(ccElement, testNum) {
        let ccElementValue = parseInt(ccElement.value.trim());
        if (!testNum.test(ccElementValue)) {
            ccElement.parentElement.classList.remove('valid');
            ccElement.parentElement.classList.add('not-valid');
            ccElement.nextElementSibling.style.display = "block";
            e.preventDefault()
        } else {
            ccElement.parentElement.classList.remove('not-valid');
            ccElement.parentElement.classList.add('valid');
            ccElement.nextElementSibling.style.display = "none";
        };
    };

}); 


/* The following handles the look of the individual activities in the activities section and adds
a visible focus state for accessibility purposes
*/

const allActivities = document.querySelectorAll('input[type="checkbox"]');
allActivities.forEach(item => {
    item.addEventListener('focus', (e) => {
        item.parentElement.classList.add('focus');
    })
});

allActivities.forEach(item => {
    item.addEventListener('blur', (e) => {
        item.parentElement.classList.remove('focus');
    })
});