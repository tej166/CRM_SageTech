import React, { useState } from 'react';
import './ToDo.css';
import axios from 'axios';
import { inputConfig } from './inputConfig'; // Assuming inputConfig defines the fields

const ToDoInputForm = () => {
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleReset = () => {
    window.location.reload();
  };

  // Handle search form submission
  const handleSearch = async (event) => {
    event.preventDefault();
  
    const queryData = { ...formData };
  
    // If "My Assigned Leads" or "My Added Leads" is selected, attach userId from localStorage
    if (queryData.leads === 'My Assigned Leads' || queryData.leads === 'My Added Leads') {
      queryData.userId = localStorage.getItem('userId'); // Fetch userId from local storage
    }
  
    // console.log('Query Data:', queryData);
  
    try {
      // Make the API request, dynamically passing the search parameters
      const response = await axios.get('http://localhost:8080/api/leads/search', {
        params: queryData,
      });
  
      // console.log('API Response:', response.data);
  
      // Set the results
      setResults(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching leads:', error);
      alert('Error fetching leads');
      setHasSearched(true);
      setResults([]);
    }
  };

  // Handle updates to the next action field in the results
  const handleNextActionChange = (e, index) => {
    const newResults = [...results];
    newResults[index].nextAction = e.target.value;
    setResults(newResults);
  };

  return (
    <div className="container">
      <h2 className="title">TO DO LIST</h2>
      <form onSubmit={handleSearch}>
        {/* Render form inputs dynamically based on inputConfig */}
        <div className="row">
          {inputConfig.slice(0, 5).map((field, index) => (
            <div className="col" key={`input1-${index}`}>
              <label htmlFor={`input1-${index}`}>{field.label}</label>
              {field.type === 'input' ? (
                <input
                  type="text"
                  id={`input1-${index}`}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
                
              ) : (
                <select
                  id={`input1-${index}`}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
        {/* Second row of inputs */}
        <div className="row">
          {inputConfig.slice(5, 10).map((field, index) => (
            <div className="col" key={`input2-${index}`}>
              <label htmlFor={`input2-${index}`}>{field.label}</label>
              <select
                id={`input2-${index}`}
                onChange={(e) => handleChange(field.key, e.target.value)}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {/* Third row of inputs */}
        <div className="row">
          {inputConfig.slice(10, 15).map((field, index) => (
            <div className="col" key={`input3-${index}`}>
              <label htmlFor={`input3-${index}`}>{field.label}</label>
              <select
                id={`input3-${index}`}
                onChange={(e) => handleChange(field.key, e.target.value)}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn search">
                Search
              </button>
              <button type="button" className="btn reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          ))}
        </div>
      </form>

      {/* Display results or no results message */}
      {hasSearched && (
        <div className="results">
          {results.length > 0 ? (
            <>
              <h3>Total Leads: {results.length}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Lead Number</th>
                    <th>Generation Date</th>
                    <th>Company Name</th>
                    <th>Created By</th>
                    <th>Assign To</th>
                    <th>Phone</th>
                    <th>Priority</th>
                    <th>Next Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result._id}>
                      <td>{result.leadNumber}</td>
                      <td>{new Date(result.createdAt).toLocaleDateString()}</td>
                      <td>{result.companyInfo["Company Name"]}</td>
                      <td>{result.createdBy ? result.createdBy.name : 'N/A'}</td>
                      <td>{result.companyInfo["Lead Assigned To"] || 'N/A'}</td>
                      <td>{result.companyInfo["Generic Phone 1"] || 'N/A'}</td>
                      <td>{result.companyInfo["Priority"] || 'N/A'}</td>
                      <td>
                        <select
                          value={result.companyInfo["Next Action"] || ''}
                          className="clallbtn"
                          onChange={(e) => handleNextActionChange(e, index)}
                        >
                          <option value="Call Back">Call Back</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Event">Event</option>
                          <option value="Close Lead">Close Lead</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="no-results">
              <p>No results found. Please try a different search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToDoInputForm;
