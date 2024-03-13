const ageForm = document.querySelector('.bd-form');
const currentDate = new Date();

function styleError(form){
    form.classList.add('error');
}

function removeStyleError(form, errMsgs = false){
    if(errMsgs){
        errMsgs.forEach(e => {e.innerText = '';});
    }
    form.classList.remove('error');
}

function isEmptyInput(inputs, errMsgs){
    let err = false;
    for(let i = 0; i < inputs.length; i++){
        if (!inputs[i]){
            errMsgs[i].innerText = "This field is required";
            err = true;
        }
    }
    return err;
}

function validateDate(inputs, errMsgs){
    year = inputs[0];
    yearErr = errMsgs[0];
    month = inputs[1];
    monthErr = errMsgs[1];
    day = inputs[2];
    dayErr = errMsgs[2];
    let err = false;

    const date = new Date(year, month - 1, day);
    if (!(date.getFullYear() == year
    && date.getMonth() + 1 == month
    && date.getDate() == day)){
        dayErr.innerText = "Must be a valid date";
        err = true;
    }

    if(year == currentDate.getFullYear()){
        if(month > currentDate.getMonth() + 1){
            monthErr.innerText = "Must be in the past";
            err = true;
        }
        else if(month == currentDate.getMonth() + 1)
            if(day > currentDate.getDate()){
            dayErr.innerText = "Must be in the past";
            err = true;
            }
    }

    if(day > 31 || day <= 0){
        dayErr.innerText = "Must be a valid day";
        err = true;
        }
    if (month > 12 || month <= 0){
        monthErr.innerText = "Must be a valid month";
        err = true;
        }
    if (year > currentDate.getFullYear() || year <= 0){
        yearErr.innerText = "Must be in the past";
        err = true;
        }

    return err;
}

function calculateAge(birthDate){
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)){
        years--;
        months = 12 + months;
    }

    if (days < 0){
        months--;
        let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days = lastDayOfMonth - (birthDate.getDate() - currentDate.getDate());
    }

    return { years: years, months: months, days: days };
}

function displayAge(age){
    const years = document.getElementById('years');
    const months = document.getElementById('months');
    const days = document.getElementById('days');

    years.innerText = age.years;
    months.innerText = age.months;
    days.innerText = age.days;
}

ageForm.addEventListener('submit', (e) => {
    const bDay = document.getElementById('day').value;
    const bMonth = document.getElementById('month').value;
    const bYear = document.getElementById('year').value;
    const inputs = [bYear, bMonth, bDay];
    
    const bdErrMsg = document.getElementById('d-error');
    const bmErrMsg = document.getElementById('m-error');
    const byErrMsg = document.getElementById('y-error');
    const errMsgs = [byErrMsg, bmErrMsg, bdErrMsg];
    
    e.preventDefault();
    removeStyleError(ageForm, errMsgs);

    err = isEmptyInput(inputs, errMsgs) || validateDate(inputs, errMsgs);
    if (err) styleError(ageForm);
    else {
        const birthDate = new Date(bYear, bMonth - 1, bDay);
        displayAge(calculateAge(birthDate));
    }
});