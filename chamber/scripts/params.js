const myInfo = new URLSearchParams(window.location.search);

document.querySelector('#results').innerHTML = `
  <p><strong>First Name:</strong> ${myInfo.get('fname')}</p>
  <p><strong>Last Name:</strong> ${myInfo.get('lname')}</p>
  <p><strong>Email:</strong> ${myInfo.get('email')}</p>
  <p><strong>Mobile Phone:</strong> ${myInfo.get('phone')}</p>
  <p><strong>Business Name:</strong> ${myInfo.get('organization')}</p>
  <p><strong>Submitted On:</strong> ${myInfo.get('timestamp')}</p>
`;