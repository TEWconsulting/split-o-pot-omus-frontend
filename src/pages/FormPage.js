import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submit button clicked, sending request...");

  try {
    const response = await fetch("http://localhost:3001/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("Backend response:", response.status);

    if (response.ok) {
      console.log("Email sent successfully, redirecting to Venmo...");



const { name, email, amount } = formData;
const noteText = `Split-O-Pot-omus Entry\nName: ${name}\nEmail: ${email}`;

// Detect mobile vs desktop
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let venmoURL = "";

if (isMobile) {
  // ✅ Mobile users → open Venmo app directly
  venmoURL = `venmo://paycharge?txn=pay&recipients=Todd-Walpole&amount=${encodeURIComponent(
    amount
  )}&note=${encodeURIComponent(noteText)}`;
} else {
  // ✅ Desktop users → open Venmo web profile
   alert(
    "You’re about to open Venmo in your browser.\n\n" +
      "On the Venmo page, click 'Pay or Request' and make sure the recipient is @Todd-Walpole.\n\n" +
      "Your entry info (name, email, amount) is included in the note."
  );
  
  venmoURL = `https://venmo.com/Todd-Walpole?txn=pay&amount=${encodeURIComponent(
    amount
  )}&note=${encodeURIComponent(noteText)}`;
 
}

// Save form data locally for confirmation page
localStorage.setItem("formData", JSON.stringify(formData));

// Open Venmo
window.open(venmoURL, "_blank");	  
	  
	  
      // After 8 seconds, return to confirmation page
      setTimeout(() => {
  navigate("/confirmation", { state: { formData } });
}, 8000);
    } else {
      alert("❌ Error sending confirmation email.");
    }
  } catch (err) {
    console.error("Server error:", err);
    alert("Server error.");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Split-O-Pot-omus Entry</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Amount ($):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit & Pay via Venmo
        </button>
      </form>
    </div>
  );
}

export default FormPage;
