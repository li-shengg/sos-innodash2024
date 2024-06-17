document.addEventListener("DOMContentLoaded", () => {
  // Change tip value
  const confirmTotalPaidInput = document.getElementById(
    "confirmTotalPaidInput"
  );
  const confirmTipsInput = document.getElementById("confirmTipsInput");
  const washCostDisplay = document.getElementById("washCostDisplay");

  confirmTotalPaidInput.addEventListener("input", () => {
    // Convert the values to numbers before performing subtraction
    const totalPaid = parseFloat(confirmTotalPaidInput.value) || 0;
    const washCost = parseFloat(
      washCostDisplay.innerText.replace(/[^0-9.-]+/g, "")
    );

    // Calculate the tip value and set it to the tips input field
    confirmTipsInput.value = totalPaid - washCost;
  });
});
