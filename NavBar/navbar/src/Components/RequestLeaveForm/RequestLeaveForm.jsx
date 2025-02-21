import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { LeaveContext } from "../LeaveContext/LeaveContext";
import "./RequestLeaveForm.css";

const RequestLeaveForm = ({ theme }) => {
  const { addLeaveRequest } = useContext(LeaveContext);

  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [backupPerson, setBackupPerson] = useState("");
  const [approvalManager, setApprovalManager] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [totalDays, setTotalDays] = useState(0);

  const handleDateChange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include start date
      setTotalDays(diffDays);
    } else {
      setTotalDays(0);
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAgreed) return;

    const newLeaveRequest = {
      leaveType,
      startDate,
      endDate,
      totalDays,
      status: "pending",
      reason,
      emergencyContact,
      backupPerson,
      approvalManager,
    };

    addLeaveRequest(newLeaveRequest);
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setEmergencyContact("");
    setBackupPerson("");
    setApprovalManager("");
    setTermsAgreed(false);
    setTotalDays(0);
  };

  return (
    <form className={`request-leave-form ${theme}`} onSubmit={handleSubmit}>
      <h2>Request Leave</h2>

      <label>
        Leave Type:
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
          <option value="Paternity Leave">Paternity Leave</option>
          <option value="Emergency Leave">Emergency Leave</option>
          <option value="Unpaid Leave">Unpaid Leave</option>
          <option value="Study Leave">Study Leave</option>
        </select>
      </label>

      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>

      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>

      <label>
        Total Days:
        <input type="text" value={totalDays} readOnly />
      </label>

      <label>
        Reason for Leave:
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </label>

      <label>
        Emergency Contact:
        <input
          type="text"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          required
        />
      </label>

      <label>
        Backup/Delegate Person:
        <input
          type="text"
          value={backupPerson}
          onChange={(e) => setBackupPerson(e.target.value)}
          required
        />
      </label>

      <label>
        Approval Manager:
        <select
          value={approvalManager}
          onChange={(e) => setApprovalManager(e.target.value)}
          required
        >
          <option value="">Select an approval manager</option>
          <option value="Sarah Johnson (HR Manager)">
            Sarah Johnson (HR Manager)
          </option>
          <option value="Emma Davis (Project Manager)">
            Emma Davis (Project Manager)
          </option>
          <option value="William Harris (Team Leader)">
            William Harris (Team Leader)
          </option>
          <option value="Emily Thompson (Operations Manager)">
            Emily Thompson (Operations Manager)
          </option>
          <option value="Lucas Anderson (Finance Manager)">
            Lucas Anderson (Finance Manager)
          </option>
          <option value="Charlotte Wilson (Senior Supervisor)">
            Charlotte Wilson (Senior Supervisor)
          </option>
          <option value="Henry Clark (HR Manager)">
            Henry Clark (HR Manager)
          </option>
          <option value="Liam Collins (Project Director)">
            Liam Collins (Project Director)
          </option>
          <option value="Mason Wright (IT Manager)">
            Mason Wright (IT Manager)
          </option>
          <option value="Isabella Cooper (General Manager)">
            Isabella Cooper (General Manager)
          </option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={termsAgreed}
          onChange={() => setTermsAgreed(!termsAgreed)}
        />
        I confirm that this leave request follows company policies.
      </label>

      <button type="submit" disabled={!termsAgreed}>
        Submit
      </button>
    </form>
  );
};

RequestLeaveForm.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default RequestLeaveForm;
