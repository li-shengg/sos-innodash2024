
document.addEventListener("DOMContentLoaded", ()=>{
    const predictedCarPlate = localStorage.getItem('predictedCarPlate')
    const predictedCarType = localStorage.getItem('predictedCarType')
    const confirmCarPlateInput = document.getElementById('confirmCarPlateInput')
    const confirmCarTypeInput = document.getElementById('confirmCarTypeInput')
    const confirmWashCostInput = document.getElementById('confirmWashCostInput')
    confirmCarPlateInput.value = predictedCarPlate
    const carMapping = {
        "Saloon Car": ["SaloonCar", 12],
        "MPV/SUV/Mini Van": ["MPV_SUV_Minivan", 13],
        "Large Van": ["LargeVan", 17],
        "Minibus": ["Minibus", 22],
        "Taxi (Saloon)": ["Taxi_Saloon", 5],
        "Taxi (Maxi cab/SUV)": ["Taxi_SUV", 8]
    };
    const options = confirmCarTypeInput.options;
    const selectedValue = carMapping[predictedCarType][0];
    confirmWashCostInput.value = carMapping[predictedCarType][1]
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === selectedValue) {
            confirmCarTypeInput.selectedIndex = i;
            break;
        }
    }
})