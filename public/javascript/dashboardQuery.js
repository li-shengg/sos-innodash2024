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
        const displayCar = document.createElement("div");
        displayCar.className = `washHistoryRecord p-2 d-flex align-items-center justify-content-between`;
        if (car.time_pay == null) {
          displayCar.innerHTML = `
            <div>
              Carplate: ${car.carplate}<br>
              Car Type: ${car.cartype} <br>
              Pay Status: <span class = text-danger>Unpaid</span><br>
              Date:  ${car.date}<br>
            </div>
            <div class="d-flex flex-column">
              <button class="viewCarDetailsButton btn btn-secondary mb-2" data-bs-toggle="modal" data-bs-target="#carDetailsModal" data-car_id = ${car.carid}>View Info</button>
              <a href="confirmPayment.html?car_id=${car.carid}"class="btn btn-success">Confirm Payment</a>
            </div>
            `;
        } else {
          displayCar.innerHTML = `
          <div>
            Carplate: ${car.carplate}<br>
            Car Type: ${car.cartype} <br>
            Pay Status: <span class = text-success>Paid</span><br>
            Date:  ${car.date}<br>
          </div>
          <div class="d-flex flex-column">
            <button class="viewCarDetailsButton btn btn-secondary mb-2" data-bs-toggle="modal" data-bs-target="#carDetailsModal" data-car_id = ${car.carid}>View Info</button>
          </div>
          `;
        }
        todayWashHistoryContainer.appendChild(displayCar);
      });
    }
  };
  //Request for cars to display to dashboard
  fetchMethod(
    currentUrl + "/api/cars/selecttodaycars",
    callbackForDisplayAllTodayCars
  );

  //============================================= Get allcar history ============================================
  const callbackForDisplayAllCars = (responseStatus, responseData) => {
    const allWashHistoryContainer = document.getElementById(
      "allWashHistoryContainer"
    );

    if (responseStatus == 200) {
      responseData.forEach((car) => {
        const displayCar = document.createElement("div");
        displayCar.className = `washHistoryRecord p-2 d-flex align-items-center justify-content-between`;
        if (car.time_pay == null) {
          displayCar.innerHTML = `
            <div>
              Carplate: ${car.carplate}<br>
              Car Type: ${car.cartype} <br>
              Pay Status: <span class = text-danger>Unpaid</span><br>
              Date:  ${car.date}<br>
            </div>
            <div class="d-flex flex-column">
              <button class="viewCarDetailsButton btn btn-secondary mb-2" data-bs-toggle="modal" data-bs-target="#carDetailsModal" data-car_id = ${car.carid}>View Info</button>
              <a href="confirmPayment.html?car_id=${car.carid}"class="btn btn-success">Confirm Payment</a>
            </div>
            `;
        } else {
          displayCar.innerHTML = `
          <div>
            Carplate: ${car.carplate}<br>
            Car Type: ${car.cartype} <br>
            Pay Status: <span class = text-success>Paid</span><br>
            Date:  ${car.date}<br>
          </div>
          <div class="d-flex flex-column">
            <button class="viewCarDetailsButton btn btn-secondary mb-2" data-bs-toggle="modal" data-bs-target="#carDetailsModal" data-car_id = ${car.carid}>View Info</button>
          </div>
          `;
        }
        allWashHistoryContainer.appendChild(displayCar);
      });
    }
  };

  fetchMethod(
    currentUrl + "/api/cars/selectallcars",
    callbackForDisplayAllCars
  );

  //============================================= Display car details ============================================
  const callbackForDisplayCarDetails = (responseStatus, responseData) =>{
    const carDetailsModalLabel = document.getElementById('carDetailsModalLabel')
    const carDetailsModalBody = document.getElementById('carDetailsModalBody')
    const carDetailsModalConfirmPaymentButton = document.getElementById('carDetailsModalConfirmPaymentButton')
    if(responseStatus == 200){
      carDetailsModalLabel.innerHTML = responseData.carplate

      if(responseData.time_pay == null){
        carDetailsModalBody.innerHTML = `
         Pay Status: <span class = text-danger>Unpaid</span><br>
         Carplate: ${responseData.carplate}<br>
         Car Type: ${responseData.cartype} <br>
         Date:  ${responseData.date}<br>
         Time Wash: ${responseData.time_wash} <br>
        `
        carDetailsModalConfirmPaymentButton.classList.remove('d-none')
      }else{
        carDetailsModalBody.innerHTML = `
         Pay Status: <span class = text-success>Paid</span><br>
         Carplate: ${responseData.carplate}<br>
         Car Type: ${responseData.cartype} <br>
         Date:  ${responseData.date}<br>
         Time Wash: ${responseData.time_wash} <br>
         Time Pay: ${responseData.time_pay} <br>
         Wash Cost: ${responseData.total_paid - responseData.tips} <br>
         Total Paid: ${responseData.total_paid} <br>
         Tips: ${responseData.tips} <br>
         Tips For: ${responseData.tips_for} <br>
        `
        carDetailsModalConfirmPaymentButton.classList.add('d-none')
      }
    }
  }

  document.querySelectorAll('.washHistoryContainer').forEach(container => {
    container.addEventListener('click', (event) => {
      const target = event.target;
  
      if (target.classList.contains('viewCarDetailsButton')) {
        const carId = target.dataset.car_id;
        document.getElementById('carDetailsModalConfirmPaymentButton').href = `confirmPayment.html?car_id=${carId}`
        fetchMethod(
          currentUrl + `/api/cars/${carId}`,
          callbackForDisplayCarDetails
        );
      }
    });
  });
});
