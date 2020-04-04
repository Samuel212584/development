axios.get('https://api.github.com/users/samuel-neves/repos')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
