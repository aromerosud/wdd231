const params = new URLSearchParams(window.location.search);

const submissionDetails = document.getElementById("submissionDetails");
const submissionTime = document.getElementById("submissionTime");

const formData = {
  fullname: params.get("fullname") || "N/A",
  email: params.get("email") || "N/A",
  phone: params.get("phone") || "N/A",
  reason: params.get("reason") || "N/A",
  contactMethod: params.get("contactMethod") || "N/A",
  message: params.get("message") || "N/A",
  newsletter: params.get("newsletter") ? "Yes" : "No",
  timestamp: new Date().toLocaleString()
};

localStorage.setItem("pawcareLastSubmission", JSON.stringify(formData));

submissionDetails.innerHTML = `
  <li><strong>Name:</strong> ${formData.fullname}</li>
  <li><strong>Email:</strong> ${formData.email}</li>
  <li><strong>Phone:</strong> ${formData.phone}</li>
  <li><strong>Reason:</strong> ${formData.reason}</li>
  <li><strong>Preferred Contact:</strong> ${formData.contactMethod}</li>
  <li><strong>Newsletter:</strong> ${formData.newsletter}</li>
  <li><strong>Message:</strong> ${formData.message}</li>
`;

submissionTime.textContent = `Submitted on: ${formData.timestamp}`;