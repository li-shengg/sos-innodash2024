document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("usernameRegisterInput").value;
    const password = document.getElementById("passwordRegisterInput").value;
    const confirmPassword = document.getElementById(
      "confirmPasswordRegisterInput"
    ).value;

    //Check if password matches
    if (password == confirmPassword) {
      //If password matches
      const data = {
        name: name,
        password: password,
      };

      //Callback
      const callbackForRegisterUser = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          //If token is provided
          if (responseData.token) {
            //Store token in local storage
            localStorage.setItem("token", responseData.token);
            //Store user id into local storage
            localStorage.setItem("userId", responseData.userId);
            warningCard.classList.add("d-none");
            //Forward to all tasks page
            window.location.href = "dashboard.html";
          }
        } else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };

      //Query the backened to register user
      fetchMethod(
        currentUrl + "/api/register",
        callbackForRegisterUser,
        "POST",
        data,
        null
      );
    } else {
      //else log in failed
      warningCard.classList.remove("d-none");
      warningText.innerText = "Password does not match";
    }
  });
});
