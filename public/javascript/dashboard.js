document.addEventListener("DOMContentLoaded", () => {
  //===============================Get Date=====================================
  function formatDate(date) {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  }
  const dateDisplay = document.getElementById('dashboardDateDisplay');
  if (dateDisplay) {
      const date = new Date(); // Use current date
      // const date = new Date('2024-06-12'); // Uncomment to use a specific date
      dateDisplay.innerText = formatDate(date);
  }
});
