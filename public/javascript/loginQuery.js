document.addEventListener("DOMContentLoaded", () => {
  //=========================================LOG IN=======================================
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  
  const callbackForLoginUser = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    console.log(responseData)
    //If successfully loggin
    if (responseStatus == 200) {
      //Check if token exists
      if (responseData.token) {
        //Store the token in the local storage
        localStorage.setItem("token", responseData.token);
        // Store logged in user id into local storage
        localStorage.setItem("userId", responseData.userId);
        console.log(responseData)

        //Redirect to actual game page
        window.location.href = "dashboard.html";

        warningCard.classList.add("d-none");
      }
    }else{
      //else log in failed
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //Password
    const password = document.getElementById("passwordLoginInput").value;
    //Usernmae
    const username = document.getElementById("usernameLoginInput").value;

    const data = {
        username:username,
        password:password
    };

    fetchMethod(currentUrl + '/api/login', callbackForLoginUser, "POST", data);
  });
});
