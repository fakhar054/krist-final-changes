"use client";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("Base Url is: ", baseUrl);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      setLoading(true);
      const response = await fetch(`${baseUrl}api/front/contactmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // console.log(data, "contact uss....")
      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to send message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <Header2 />
        <div className=" mb-5" style={{ paddingTop: "146px" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1>Contact Us</h1>
                <p>
                  Have a question, concern, or need help with your order? We're
                  here to assist you! Whether it’s product information, shipping
                  inquiries, or return policies, feel free to reach out to us
                  anytime. Our customer support team will get back to you as
                  soon as possible.
                </p>
                <p>
                  You can reach us through the contact form below, email, or our
                  social media channels. We value your feedback and are always
                  looking for ways to improve your shopping experience. Your
                  satisfaction is our top priority.
                </p>
              </div>
              <div className="col-lg-6">
                <div className=" bg-white shadow-lg rounded-lg  p-8">
                  {/* <h2 className="text-2xl font-semibold mb-4">Contact Us</h2> */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                      <label className="block text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-800"
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Send Message...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer2 />
      </section>
    </>
  );
}
