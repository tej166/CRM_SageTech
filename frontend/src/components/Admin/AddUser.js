import React, { useState, useEffect } from "react";
import axios from "axios";

const AddUser = ({ onClose }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    mobile: "",
    password: "",
    role: "subuser",
    supervisor: "",
    status: "active",
  });

  const [supervisors, setSupervisors] = useState([]);

  // Fetch supervisors (users with roles 'supervisor' or 'admin')
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/supervisors"
        );
        setSupervisors(response.data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };
    fetchSupervisors();
  }, []);

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
      await axios.post("http://localhost:8080/api/users", userData);
      alert("User added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="designation">Designation</label>
        <input
          id="designation"
          name="designation"
          value={userData.designation}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          name="mobile"
          value={userData.mobile}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
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

      <div>
        <label htmlFor="supervisor">Supervisor</label>
        <select
          id="supervisor"
          name="supervisor"
          value={userData.supervisor}
          onChange={handleInputChange}
        >
          <option value="">Select Supervisor</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor._id} value={supervisor._id}>
              {supervisor.firstName} {supervisor.lastName}
            </option>
          ))}
        </select>
      </div>

      <div>
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

      <button type="submit">Save User</button>
    </form>
  );
};

export default AddUser;
