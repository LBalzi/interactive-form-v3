document.getElementById("name").focus();

const other = document.getElementById("other-job-role");
other.style.display = "none";
const dropdown = document.getElementById("title");

dropdown.addEventListener("change", (e) => {
    if (dropdown.value === "other") {
        other.style.display = "block";
    };
});
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
    console.log(runningTotal);
});




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




const activitiesChecked = document.querySelectorAll('input[type="checkbox"]:checked');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
      };
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const activitiesChecked = document.querySelectorAll('input[type="checkbox"]:checked');
        const ccNum = parseInt(document.getElementById('cc-num').value.trim());
        const cvvNum = parseInt(document.getElementById('cvv').value.trim());
        const zipNum = parseInt(document.getElementById('zip').value.trim());
        
        if (name === '') {
            document.getElementById('name').parentElement.classList.add('not-valid');
            document.getElementById('name').parentElement.classList.remove('valid');
            document.getElementById('name').nextElementSibling.style.display = "block";
            return false
        } else {
            document.getElementById('name').parentElement.classList.remove('not-valid');
            document.getElementById('name').parentElement.classList.add('valid');
            document.getElementById('name').nextElementSibling.style.display = "none";
        };

        emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email').parentElement.classList.add('not-valid');
            document.getElementById('email').parentElement.classList.remove('valid');
            document.getElementById('email').nextElementSibling.style.display = "block";
            return false
        } else {
            document.getElementById('email').parentElement.classList.remove('not-valid');
            document.getElementById('email').parentElement.classList.add('valid');
            document.getElementById('email').nextElementSibling.style.display = "none";
        }

        if (activitiesChecked.length === 0) {
            alert('you must select at least one activity');
            return false
        };
        const ccNumRegex = /^\d{13,16}$/;
        const zipCodeRegex = /^\d{5}$/;
        const cvvRegex = /^\d{3}$/;
        if (paymentMethodSelected === "credit-card") {
            if (!ccNumRegex.test(ccNum) || !zipCodeRegex.test(zipNum) || !cvvRegex.test(cvvNum)) {
                alert("Enter a valid credit card number, zip code and CVV");
                return false;
            };
        };
        return true;
    };
}); 

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