document.addEventListener('DOMContentLoaded', ()=>{
    //Update Wash Cost BAsed on Car Type
    const confirmCarTypeInput = document.getElementById('confirmCarTypeInput')
    const confirmWashCostInput = document.getElementById('confirmWashCostInput')

    const carTypeToCostMap = {
        'salooncar': 12,
        'mpv_suv_minivan': 13,
        'largevan': 17,
        'minibus': 22,
        'taxi_saloon': 5,
        'taxi_suv': 8
    };


    confirmCarTypeInput.addEventListener('input', () => {
        const carType = confirmCarTypeInput.value.toLowerCase();
        const washCost = carTypeToCostMap[carType] || 0;
        confirmWashCostInput.value = washCost;
    });
})