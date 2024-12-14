import { jwtDecode } from "jwt-decode";

// Get logged-in user's data from the token
export const isTokenValid = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return false;
  
    try {
      const { exp } = jwtDecode(token); // jwtDecode should already be imported
      return exp * 1000 > Date.now(); // Compare expiry with current time
    } catch (error) {
      return false; // Invalid token
    }
};

export const getLoggedInUser = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    return jwtDecode(token); // Decode the token and return the user data
  } catch (error) {
    return null; // If token is invalid or decoding fails
  }
};

// Log out the user
export const logoutUser = () => {
    localStorage.removeItem("userToken");
  };

