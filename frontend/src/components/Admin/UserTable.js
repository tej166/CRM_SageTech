import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import EditUserModal from "./EditUserModal";
import "./UserTable.css";

const UserModalOverlay = ({ children, onClose }) => {
  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUserId(null);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const refreshUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="user-management-container">
      <button className="create-user-btn" onClick={() => setShowAddModal(true)}>
        Create New User
      </button>

      {showAddModal && (
        <UserModalOverlay onClose={closeAddModal}>
          <h2 className="user-heading">Add New User</h2>
          <AddUser
            onClose={() => {
              closeAddModal();
              refreshUsers();
            }}
          />
        </UserModalOverlay>
      )}

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && selectedUserId && (
        <UserModalOverlay onClose={closeEditModal}>
          <h2>Edit User</h2>
          <EditUserModal
            userId={selectedUserId}
            onClose={() => {
              closeEditModal();
              refreshUsers();
            }}
          />
        </UserModalOverlay>
      )}
    </div>
  );
};

export default UserTable;
