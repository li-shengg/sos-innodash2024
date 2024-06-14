document.addEventListener("DOMContentLoaded", ()=>{
    const callbackForAddNewCar = (responseStatus, responseData) => {
        if(responseStatus == 201){
            //Redirect to dashboard
            window.location.href = 'dashboard.html'
        }
    }

    const addNewCarForm = document.getElementById('addNewCarForm')
    addNewCarForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        const data = {
            cartype: document.getElementById('confirmCarTypeInput').value,
            carplate: document.getElementById('confirmCarPlateInput').value
        }

        fetchMethod(currentUrl + '/api/cars/addcar', callbackForAddNewCar, "POST", data);
    })
})