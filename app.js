//Listen for Submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

document.addEventListener('DOMContentLoaded', hideResults);

function hideResults(){
    document.getElementById('results').style.display = 'none';
}

//cal results

function calculateResults(e){
    console.log('fuck yea')
    
    //UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    
    //the rate is converted into monthy rate in decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12; 
    
    //this is converting years into months

    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthy payments

    const x = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2)
        document.getElementById('results').style.display = 'block';

    } else {
        showError('Please Check Your Numbers');

    }

    


    e.preventDefault();

}

// Show Errors

function showError(error){
    //Create a div
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    // Gave a class for styling using bootstrap
    errorDiv.className = 'alert alert-danger';
    // Adding message there
    errorDiv.appendChild(document.createTextNode(error));
    
    // insert above heading
    card.insertBefore(errorDiv, heading)

    //clear error
    setTimeout(clearError, 3000);

}

//clearing error

function clearError(){
    document.querySelector('.alert').remove();
}
