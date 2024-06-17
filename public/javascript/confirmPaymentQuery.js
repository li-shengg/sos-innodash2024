document.addEventListener("DOMContentLoaded", () => {
  //Get car ID from the URL
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const carId = urlParams.get("car_id");
  //Display Car Details
  const callbackForDisplayCarDetails = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      const carTypeToCostMap = {
        salooncar: 12,
        mpv_suv_minivan: 13,
        largevan: 17,
        minibus: 22,
        taxi_saloon: 5,
        taxi_suv: 8,
      };

      const carPlateDisplay = document.getElementById("carPlateDisplay");
      const carTypeDisplay = document.getElementById("carTypeDisplay");
      const washCostDisplay = document.getElementById("washCostDisplay");
      carPlateDisplay.innerHTML = responseData.carplate;
      carTypeDisplay.innerHTML = responseData.cartype;
      // Get the wash cost based on the car type
      const carTypeKey = responseData.cartype.replace(/\s+/g, "").toLowerCase(); // Make sure the car type matches the keys in carTypeToCostMap
      washCostDisplay.innerHTML =
        "$" + carTypeToCostMap[carTypeKey] || "Unknown"; // Default to 'Unknown' if the car type is not found
    }
  };
  fetchMethod(currentUrl + `/api/cars/${carId}`, callbackForDisplayCarDetails);

  // Load all employee name
  const callbackForDisplayEmployeeNames = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      const confirmTipsToInput = document.getElementById("confirmTipsToInput");
      responseData.forEach((employee) => {
        const employeeSelect = document.createElement("option");
        employeeSelect.setAttribute("value", employee.name);
        employeeSelect.innerHTML = employee.name;
        confirmTipsToInput.appendChild(employeeSelect);
      });
    }
  };
  fetchMethod(
    currentUrl + `/api/users/getall`,
    callbackForDisplayEmployeeNames
  );

  // Update payment
  const callbackForUpdatePayment = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      //Redirect to dashboard
      window.location.href = "dashboard.html";
    }
  };

  document
    .getElementById("confirmPaymentForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const data = {
        totalpaid: document.getElementById("confirmTotalPaidInput").value,
        tips: document.getElementById("confirmTipsInput").value,
        tips_for: document.getElementById("confirmTipsToInput").value,
      };

      fetchMethod(
        currentUrl + `/api/cars/updatepaymentstatus/${carId}`,
        callbackForUpdatePayment,
        "PUT",
        data
      );
    });
});
