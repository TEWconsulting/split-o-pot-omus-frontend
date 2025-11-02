import { useState } from "react";

export default function FormPage() {
  const [form, setForm] = useState({ name: "", email: "", amount: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    localStorage.setItem("formData", JSON.stringify(form));

    // Venmo pay link (opens app or venmo.com)
    const venmoUsername = "Todd-Walpole"; // without @ for the link
    const amount = encodeURIComponent(form.amount || "0.00");
    const note = encodeURIComponent(`Payment from ${form.name} for Split-O-Pot-omus`);
    // Venmo will typically open the app or web page. There is no guaranteed automatic redirect back.
    const venmoURL = `https://venmo.com/${venmoUsername}?txn=pay&amount=${amount}&note=${note}`;
    // Open in a new tab to allow user to come back
    window.open(venmoURL, "_blank");

    // Also navigate to confirmation where user can click "I've completed payment"
    window.location.href = "/confirmation";
  };

  return (
    <div style={{maxWidth: 520, margin: '40px auto', padding: 20, fontFamily: 'Arial, sans-serif'}}>
      <h2 style={{marginBottom: 16}}>Split-O-Pot-omus — Submit Form</h2>

      <input name="name" placeholder="Name" onChange={handleChange}
             style={{display:'block', width:'100%', padding:8, marginBottom:10}} />

      <input name="email" placeholder="Email" onChange={handleChange}
             style={{display:'block', width:'100%', padding:8, marginBottom:10}} />

      <input name="amount" placeholder="Amount" type="number" onChange={handleChange}
             style={{display:'block', width:'100%', padding:8, marginBottom:14}} />

      <button onClick={handleSubmit} style={{background:'#1f6feb', color:'#fff', padding:'10px 14px', border:'none', borderRadius:6}}>
        Pay with Venmo
      </button>
    </div>
  );
}
