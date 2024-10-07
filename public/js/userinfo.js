console.log('i happen')
fetch('../api/user')
      .then(response => response.json())
      .then(data => {
        const userInfoDiv = document.getElementById('user-info');
        console.log(data)
        if (data.username) {
          userInfoDiv.innerHTML = `Welcome, ${data.username}!`;
        } else {
          userInfoDiv.innerHTML = '<a href="./login">Login</a>';
        }
      })
      .catch(e=>console.log(e));