"use client";

import { useState } from "react";


export default function LeadCaptureForm(){
  const [loading, setLoading] = useState(false)
  const handleForm = async event => {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData(event.target)
    console.log(formData);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject)
    const jsonData = JSON.stringify(dataObject);
    console.log(jsonData);
    const options = {
      method: "POST", // HTTP POST
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    }
    console.log(options);

    // fetch
    const response = await fetch("/api/leads", options)
    const responseData = await response.json();
    console.log("responseData: ", responseData);
    setLoading(false)
  }

  const btnLable = loading ? "Loading" : "Join List"
  return <form className="space-x-3" onSubmit={handleForm}>
    <input type="text" required name="email" placeholder="Yout Email" />
    <button disabled={loading} className="bg-green-500 hover:bg-green-700 text-white px-3 rounded" type="submit" >Join list</button>
  </form>
}
