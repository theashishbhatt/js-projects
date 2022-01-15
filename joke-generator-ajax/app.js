

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('.output').style.display = 'none';
});


document.querySelector('.get-joke').addEventListener('click', generateJokes);

//Function to Generate Jokes

function generateJokes(e) {
  const number = document.querySelector('#number').value;
  console.log(number);
  
  const request = new XMLHttpRequest();

  request.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  request.onload = function(){
    if(this.status === 200){
      const response = JSON.parse(this.responseText);
      

      let output = '';
      if (response.type === 'success'){
        response.value.forEach(joke => {
          output += `<li>${joke.joke}</li>`;
          console.log(output);
          
        });

      }else {
        output += '<li>Something went wrong</li>';
      }

      document.querySelector('.output').style.display = 'block';

      document.querySelector('.output').innerHTML = output;

    }
  }

 

  request.send();

  e.preventDefault();
}