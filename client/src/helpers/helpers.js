export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  hours = String(hours).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
};
