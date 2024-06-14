document.addEventListener("DOMContentLoaded", () => {
  /*============================GET USERID FROM LOCAL STORAGE
  ==============================================*/
  const userId = localStorage.getItem("userId");
  //=============================================Display User Name ============================================
  const callbackForDisplayEmployeeName = (responseStatus, responseData) => {
    const employeeNameHeader = document.getElementById("employeeNameHeader");
    if (responseStatus == 200) {
      employeeNameHeader.innerText = responseData;
    }
  };
  fetchMethod(
    currentUrl + `/api/users/${userId}`,
    callbackForDisplayEmployeeName
  );

  //============================================= Get all today cars ============================================
  const callbackForDisplayAllTodayCars = (responseStatus, responseData) => {
    const todayWashHistoryContainer = document.getElementById(
      "todayWashHistoryContainer"
    );
    if (responseStatus == 200) {
      responseData.forEach((car) => {
        let payStatus;
        let statusColor;
        if (car.time_pay == null) {
          payStatus = "Unpaid";
          statusColor = "text-danger";
        } else {
          payStatus = "Paid";
          statusColor = "text-success";
        }
        const displayCar = document.createElement("div");
        displayCar.className = `washHistoryRecord p-2 d-flex align-items-center justify-content-between`;
        displayCar.innerHTML = `
            <div>
              Carplate: ${car.carplate}<br>
              Car Type: ${car.cartype} <br>
              Pay Status: <span class = ${statusColor}>${payStatus}</span><br>
              Date:  ${car.date}<br>
            </div>
            <div class="d-flex flex-column">
              <button class="btn btn-secondary mb-2" data-car_id = ${car.carid}>View Info</button>
              <a href="#"class="btn btn-success">Confirm Payment</a>
            </div>
            `;

        //Add task under the display container
        todayWashHistoryContainer.appendChild(displayCar);
      });
    }
  };
  //Request for cars to display to dashboard
  fetchMethod(
    currentUrl + "/api/cars/selecttodaycars",
    callbackForDisplayAllTodayCars
  );
});
