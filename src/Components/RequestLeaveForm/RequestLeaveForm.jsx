import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { LeaveContext } from "../LeaveContext/LeaveContext";
import "./RequestLeaveForm.css";

const holidays = [
  "2025-01-01", // New Year's Day
  "2025-03-06", // Independence Day
  "2025-04-18", // Good Friday
  "2025-04-21", // Easter Monday
  "2025-05-01", // Workers' Day
  "2025-05-25", // Africa Unity Day
  "2025-07-01", // Republic Day
  "2025-08-04", // Founders' Day
  "2025-09-21", // Kwame Nkrumah Memorial Day
  "2025-12-01", // Farmer's Day
  "2025-12-25", // Christmas Day
  "2025-12-26", // Boxing Day
  // Add more holiday dates in YYYY-MM-DD format as needed
];

const RequestLeaveForm = ({ theme }) => {
  const { addLeaveRequest } = useContext(LeaveContext);

  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [returningDate, setReturningDate] = useState("");
  const [reason, setReason] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [backupPerson, setBackupPerson] = useState("");
  const [approvalManager, setApprovalManager] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [sickDocument, setSickDocument] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Success message state

  const calculateBusinessDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Extract years and ensure they are four-digit numbers
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (
      startYear < 1000 ||
      startYear > 9999 ||
      endYear < 1000 ||
      endYear > 9999
    ) {
      console.error("Invalid date: Please enter a valid four-digit year.");
      return 0;
    }

    let count = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const formattedDate = currentDate.toISOString().split("T")[0];

      if (
        dayOfWeek !== 0 &&
        dayOfWeek !== 6 &&
        !holidays.includes(formattedDate)
      ) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  };

  useEffect(() => {
    if (startDate && endDate) {
      setTotalDays(calculateBusinessDays(startDate, endDate));
    } else {
      setTotalDays(0);
    }
  }, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAgreed) return;

    const newLeaveRequest = {
      leaveType,
      startDate,
      endDate,
      returningDate,
      totalDays,
      status: "pending",
      reason,
      emergencyContact,
      backupPerson,
      approvalManager,
      sickDocument: leaveType === "Sick Leave" ? sickDocument : null,
    };

    addLeaveRequest(newLeaveRequest);
    // Show success message for 3 seconds
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReturningDate("");
    setReason("");
    setEmergencyContact("");
    setBackupPerson("");
    setApprovalManager("");
    setTermsAgreed(false);
    setTotalDays(0);
    setSickDocument(null);
  };

  return (
    <div className="request-leave-container">
      <form className={`request-leave-form ${theme}`} onSubmit={handleSubmit}>
        <h2>Request Leave</h2>

        <section className="leave-type-section">
          <label>
            Leave Type: <p></p>
            <select
              className="mobile"
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
        </section>

        <section className="date-section">
          <div className="date-inputs">
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
          </div>

          <label>
            Total Days:
            <input type="text" value={totalDays} readOnly />
          </label>

          <label>
            Returning Date:
            <input
              type="date"
              value={returningDate}
              onChange={(e) => setReturningDate(e.target.value)}
              required
            />
          </label>
        </section>

        {leaveType === "Sick Leave" && (
          <label>
            Attach Sick Document:
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => setSickDocument(e.target.files[0])}
              required
            />
          </label>
        )}

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
        <section className="approval-manager-section">
          <label>
            Approval Manager: <p></p>
            <select
              className="mobile"
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
        </section>

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

        {showSuccessMessage && (
          <p className="success-message">
            ✅ Leave request submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

RequestLeaveForm.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default RequestLeaveForm;
