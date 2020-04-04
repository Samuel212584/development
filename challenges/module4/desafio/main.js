/** Desafio 1 
 

function checaIdade(idade) {
    return new Promise(function(resolve, reject) {
        if (idade >= 18) {
            setTimeout(() => resolve(), 2000);
        } else {
            setTimeout(() => reject(), 2000);
        }
    });
}

checaIdade(20)
    .then(function() {
        console.log("Maior que 18");
    })
    .catch(function() {
        console.log("Menor que 18");
    });
*/

/** Desafios 2 e 3 */
var inputElement = document.querySelector('[name="user"]');
var buttonElement = document.querySelector('.button');
var listElement = document.querySelector('.list');

buttonElement.onclick = function() {
    var user = inputElement.value;

    listElement.innerHTML = '';
    var itemElement = document.createElement('li');
    var textElement = document.createTextNode('Carregando');
    itemElement.appendChild(textElement);
    listElement.appendChild(itemElement);

    setTimeout(() => {
        axios.get('https://api.github.com/users/'+user+'/repos')
            .then(function(response) {
                var repos = response.data;
                listElement.innerHTML = '';
                for (let i = 0; i < repos.length; i++) {
                    var object = repos[i];
                
                    var itemElement = document.createElement('li');
                    var textElement = document.createTextNode(object.name);
                    itemElement.appendChild(textElement);

                    listElement.appendChild(itemElement);
                    // console.log(textElement);
                }
            })
            .catch(function(error) {    
                alert('Usuario nao existe');
            });
    }, 2000);
    
}
