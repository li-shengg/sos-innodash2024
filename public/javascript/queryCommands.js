//=====================================================================================
// FETCH METHOD
// This function uses the fetch API to make a request to the server.
//=====================================================================================

function fetchMethod(url, callback, method = "GET", data = null, token = null) {
    //Headers for verification
    const headers = {};
  
    //If data is required, put data into the header
    if (data) {
      headers["Content-Type"] = "application/json";
    }
  
    //If token is requred to fatch, put token into the header
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
  
    //Options to send the necessary data to the server
    let options = {
      method: method.toUpperCase(),
      headers: headers,
    };
  
    if (method.toUpperCase() !== "GET" && data != null) {
      options.body = JSON.stringify(data);
    }
  
    //Fetch from the server (Send request to the endpoints)
    fetch(url, options)
    .then((response) => {
      if (response.status == 204) {
        callback(response.status, {});
      } else {
        response
          .json()
          .then((responseData) => callback(response.status, responseData));
      }
    })
    .catch((error) => console.error(`Error from ${method} ${url}:`, error));
  }
  