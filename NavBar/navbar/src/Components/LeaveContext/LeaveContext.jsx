import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "L001",
      leaveType: "Annual Leave",
      startDate: "2024-02-25",
      endDate: "2024-02-28",
      totalDays: 4,
      status: "pending",
      approver: "",
      reason: "Family vacation",
      emergencyContact: "John Doe - 123456789",
      backupPerson: "Jane Smith",
      approvalManager: "Manager John",
    },
    {
      id: "L002",
      leaveType: "Sick Leave",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      totalDays: 3,
      status: "approved",
      approver: "Manager John",
      reason: "Flu symptoms",
      emergencyContact: "Mary Doe - 987654321",
      backupPerson: "Bob Brown",
      approvalManager: "HR Manager",
    },
  ]);

  const updateLeaveStatus = (id, newStatus) => {
    setLeaveRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const addLeaveRequest = (newRequest) => {
    setLeaveRequests((prev) => [
      ...prev,
      { ...newRequest, id: `L${prev.length + 1}` },
    ]);
  };

  return (
    <LeaveContext.Provider
      value={{ leaveRequests, updateLeaveStatus, addLeaveRequest }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

LeaveProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
