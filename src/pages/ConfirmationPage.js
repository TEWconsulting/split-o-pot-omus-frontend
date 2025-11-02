import { useEffect, useState } from "react";
import axios from "axios";

export default function ConfirmationPage() {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState("Waiting for form data...");

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:3001";

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData"));
    if (data) {
      setForm(data);
      setStatus("Click the button below after you've completed payment.");
    } else {
      setStatus("No form data found. Please go back and submit the form first.");
    }
  }, []);

  const confirmAndSend = async () => {
    if (!form) return;
    setStatus("Sending confirmation email...");
    try {
      await axios.post(`${apiBase}/send-email`, form);
      setStatus("Confirmation email sent! Check your inbox.");
      // Optionally clear localStorage
      localStorage.removeItem("formData");
    } catch (err) {
      console.error(err);
      setStatus("Error sending email. See console for details.");
    }
  };

  return (
    <div style={{maxWidth: 640, margin: '40px auto', padding: 20, fontFamily: 'Arial, sans-serif', textAlign:'center'}}>
      <h2>Thank you — Split-O-Pot-omus</h2>
      {form ? (
        <>
          <p>Thanks {form.name}, the amount: ${form.amount}</p>
          <p style={{marginTop:6}}>If you completed the Venmo payment, click the button below to finalize and send the confirmation email.</p>
          <div style={{marginTop:16}}>
            <button onClick={confirmAndSend} style={{background:'#16a34a', color:'#fff', padding:'10px 14px', border:'none', borderRadius:6}}>
              I've completed payment — show confirmation
            </button>
          </div>
        </>
      ) : null}
      <p style={{marginTop:20}}>{status}</p>
    </div>
  );
}
