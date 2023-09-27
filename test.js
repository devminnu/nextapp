// Function to set a cookie
function setCookie(name, value, daysToExpire) {
  // Calculate the expiration date
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  // Create the cookie string
  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;

  // Set the cookie
  document.cookie = cookieString;
}

// Function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
}

// Example usage:
setCookie('username', 'JohnDoe', 7); // Set a cookie named "username" with a value that expires in 7 days
const username = getCookie('username'); // Get the value of the "username" cookie
if (username) {
  console.log(`Welcome back, ${username}!`);
} else {
  console.log('No "username" cookie found.');
}
