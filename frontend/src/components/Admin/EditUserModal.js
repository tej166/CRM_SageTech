import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserModal = ({ userId, onClose }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    mobile: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, userData);
      alert("User updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  return (
    <form className="user-form" onSubmit={handleFormSubmit}>
      <div className="user-form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="user-form-group">
        <label htmlFor="designation">Designation</label>
        <input
          id="designation"
          type="text"
          name="designation"
          value={userData.designation}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="user-form-group">
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          type="text"
          name="mobile"
          value={userData.mobile}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={userData.role}
          onChange={handleInputChange}
        >
          <option value="subuser">Subuser</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="user-form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={userData.status}
          onChange={handleInputChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="user-form-group full-width">
        <button className="edit-btn" type="submit">
          Save Changes
        </button>
        <button className="close-btn" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserModal;
