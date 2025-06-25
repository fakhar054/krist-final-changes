import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResponseContext } from "./ResponseContext";
import { toast } from "react-hot-toast";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { setResponse_Context } = useContext(ResponseContext);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // ✅ Register a New User
  const registration = async (first_name, last_name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}api/user/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.status === true) {
        toast.success("User Registered Successfully!");
        router.push("/login");
        return data;
      } else {
        throw new Error(data?.error?.email || "Registration failed.");
      }
    } catch (err) {
      setError(err?.message);
      toast.error(err?.message || "Registration failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login User and Store in Context
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.status === true) {
        setResponse_Context({
          user: data.data.user,
          token: data.data.token,
          user_id: data.data.user.id,
        });

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.user.id);
        toast.success("Login Successful!");
        router.push("/"); // Redirect to the website
        return data;
      } else {
        throw new Error(data?.error.message || "Login failed.");
      }
    } catch (err) {
      setError(err?.message);
      toast.error(err?.message || "Login failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // const [profileData, setProfileData] = useState();
  // ✅ Update User Profile Without Refresh
  const updateProfile = async (formDataToSend) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}api/user/profile/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // ❌ DO NOT add "Content-Type" manually for FormData
        },
        body: formDataToSend,
      });

      const data = await res.json();
      // setProfileData(data.data);
      console.log("updateddd API Response profile: ", data);

      if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      if (data.status === true) {
        toast.success("Profile Updated Successfully!");
        return data.data;
      } else {
        throw new Error(data?.error?.email || "Profile update failed.");
      }
    } catch (err) {
      setError(err?.message);
      toast.error(err?.message || "Profile update failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchDataOrder = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}api/user/dashboard/${userId}`);
      console.log(res, "response order ka");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { registration, login, updateProfile, fetchDataOrder, loading, error };
};

export default useAuth;
