import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LeaveContext } from "../LeaveContext/LeaveContext";
import "./LeaveStatus.css";

const LeaveStatus = ({ theme }) => {
  const { leaveRequests, updateLeaveStatus } = useContext(LeaveContext);
  const [filteredRequests, setFilteredRequests] = useState(leaveRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setFilteredRequests(
      leaveRequests.filter(
        (request) =>
          (filterStatus === "all" ||
            request.status.toLowerCase() === filterStatus.toLowerCase()) &&
          (request.leaveType
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            request.reason.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, filterStatus, leaveRequests]);

  return (
    <div className={`leave-status-container ${theme}`}>
      <h2>Leave Status</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Leave Type or Reason..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Leave Status Table */}
      <table className="leave-status-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Days</th>
            <th>Reason</th>
            <th>Emergency Contact</th>
            <th>Backup Person</th>
            <th>Approval Manager</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.leaveType}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.totalDays}</td>
                <td>{request.reason}</td>
                <td>{request.emergencyContact}</td>
                <td>{request.backupPerson}</td>
                <td>{request.approvalManager}</td>
                <td>
                  <span
                    className={`status-badge ${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.status === "pending" && (
                    <button className="cancel-btn">Cancel</button>
                  )}
                  {request.status === "approved" && (
                    <button className="download-btn">Download Letter</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="no-data">
                No leave requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

LeaveStatus.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default LeaveStatus;
