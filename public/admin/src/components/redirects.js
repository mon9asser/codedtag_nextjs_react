import React, { useState, useEffect, useRef } from "react";
import { NavbarContainer } from "./parts/navbar.js";
import { SidebarContainer } from "./parts/sidebar.js";
import { Helper } from "../helper.js"; // Import Helper from your helper file

const Redirects = () => {
  const requestResultRef = useRef(null);

  const [redirects, setRedirects] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [redirectTypes] = useState([
    { text: "Permanent (301)", value: "301" },
    { text: "Temporary (302)", value: "302" }
  ]);
  const [filteredRedirects, setFilteredRedirects] = useState([]);
  const [filterRedirectType, setFilterRedirectType] = useState("");
  const [onFilterMode, setOnFilterMode] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [requestStatusClass, setRequestStatusClass] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const response = await Helper.sendRequest({
        api: 'redirects',
        method: 'GET',
        data: {}
      });
      //console.log(response);
      setRedirects(response.data);
    } catch (error) {
      console.error('Error fetching redirects:', error);
    }
  };

  const addRedirect = () => {
    setRedirects(prevRedirects => [
      ...prevRedirects,
      { _id: Helper.generateObjectId(), from: "", to: "", redirectType: "", isFolder: false }
    ]);
  };

  const handleChange = (e, redirectIndex) => {
    const { name, value, type, checked } = e.target;
    setRedirects(prevRedirects => {
      const newRedirects = [...prevRedirects];
      newRedirects[redirectIndex][name] = type === 'checkbox' ? checked : value;
      return newRedirects;
    });
  };

  const deleteRedirect = (redirectIndex) => {
    setRedirects(prevRedirects => {
      const redirect = prevRedirects[redirectIndex];
      if (redirect._id) {
        setDeletedIds(prevDeletedIds => [...prevDeletedIds, redirect._id]);
      }
      return prevRedirects.filter((_, index) => index !== redirectIndex);
    });
  };

  const validateRedirects = () => {
    return redirects.every(redirect => redirect.from && redirect.to && redirect.redirectType);
  };

  const saveRedirects = async () => {
    if (!validateRedirects()) {
      setRequestStatusClass('error');
      setRequestMessage('Please fill in all required fields.');
      setShowMessage('show_message');
      return;
    }

    setIsPressed(true);
    try {
      const response = await Helper.sendRequest({
        api: 'redirect/create-update',
        method: 'POST',
        data: { redirects, deletedIds } // Include deleted IDs
      });
      if (response.is_error) {
        throw new Error(response.message);
      }
      setRequestStatusClass('success');
      setRequestMessage('Redirects saved successfully!');
      setShowMessage('show_message');
      setIsPressed(false);
      setDeletedIds([]); // Clear deleted IDs after successful save
    } catch (error) {
      setRequestStatusClass('error');
      setRequestMessage(error.message || 'An error occurred while saving the redirects.');
      setShowMessage('show_message');
      setIsPressed(false);
    }
  };

  const filterRedirects = (e) => {
    const value = e.target.value;
    setOnFilterMode(value !== "");
    setFilteredRedirects(redirects.filter(redirect => redirect.redirectType === value));
    setFilterRedirectType(value);
  };

  return (
    <div id="app">
      <NavbarContainer />
      <SidebarContainer />
      <section className="section main-section">
        <div style={{border: "1px solid #ddd", padding: '10px', width: '100%', marginBottom: '10px', marginTop: '10px'}}>
        Note: You should restart the next.js server once you saved redirects list
        </div>
        <div style={{ margin: "20px", border: '3px solid #dfdfdf', padding: '20px' }}>
          <div style={{ display: "flex" }}>
            <button onClick={addRedirect} style={styles.addButton}>Add Redirect</button>
            <div style={{ marginLeft: "15px", marginLeft: "auto" }}>
              <label style={{ marginRight: "15px" }}>Filter :</label>
              <select value={filterRedirectType} onChange={filterRedirects} style={styles.select}>
                <option value="">Select Redirect Type</option>
                {redirectTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.text}</option>
                ))}
              </select>
            </div>
          </div>
          {(onFilterMode ? filteredRedirects : redirects).map((redirect, redirectIndex) => (
            <div key={redirect._id} style={styles.redirectItem}>
              <div style={styles.redirectHeader}>
                <input
                  name="from"
                  value={redirect.from}
                  placeholder="/php/ or /php/:id/"
                  onChange={(e) => handleChange(e, redirectIndex)}
                  style={styles.input}
                />
                <input
                  name="to"
                  value={redirect.to}
                  placeholder="/tutorials/php/ or /tutorials/php/:id/"
                  onChange={(e) => handleChange(e, redirectIndex)}
                  style={styles.input}
                />
                <select
                  name="redirectType"
                  value={redirect.redirectType}
                  onChange={(e) => handleChange(e, redirectIndex)}
                  style={styles.select}
                >
                  <option value="">Select Redirect Type</option>
                  {redirectTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.text}</option>
                  ))}
                </select>
                 
                <button onClick={() => deleteRedirect(redirectIndex)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div ref={requestResultRef} className={`${requestStatusClass} ${showMessage} request-result-notification`}>
          {requestMessage}
        </div>

        <div style={styles.stickyFooter}>
          <div style={styles.footerButtons}>
            <a onClick={saveRedirects} className="button blue" style={styles.saveButton}>
              {isPressed ? <span className="loader"></span> : "Save"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  redirectItem: {
    background: "#f1f1f1",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    border: "1px solid #000",
    marginTop: "35px",
  },
  redirectHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    flex: 1,
  },
  select: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    flex: 1,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  addButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "white",
  },
  stickyFooter: {
    position: "sticky",
    zIndex: "200",
    display: "flex",
    justifyContent: "space-between",
    bottom: "0",
    width: "90%",
    padding: "20px",
    background: "#f9f9f9",
    margin: "0 auto",
  },
  footerButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  saveButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
  },
};

export { Redirects };
