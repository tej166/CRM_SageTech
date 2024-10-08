import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./CreateLeads.css";
import {
  companyFormConfig,
  contactFormConfig,
  itLandscapeConfig,
} from "./formConfigs";

const FormRow = ({ children }) => <div className="form-row">{children}</div>;

const FormGroup = ({ field, formData, handleChange, errors, options }) => {
  // console.log('FormGroup props:', { field, formData, options });
  return (
    <div className="form-group">
      <label htmlFor={field.name}>{field.label}:</label>
      {field.type === "select" ? (
        <div className="select-with-date">
          {options[field.options] && Array.isArray(options[field.options]) ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className={errors[field.name] ? "mandatory" : ""}
            >
              <option value="">Select {field.label}</option>
              {options[field.options].map((option, index) => {
                if (option === null || option === undefined) {
                  console.warn(`Null or undefined option found at index ${index} for ${field.name}`);
                  return null;
                }
                const optionValue = option._id || option;
                const optionLabel = option && typeof option === "object" && option.firstName && option.lastName
                  ? `${option.firstName} ${option.lastName}`
                  : String(option);
                return (
                  <option key={index} value={optionValue}>
                    {optionLabel}
                  </option>
                );
              })}
            </select>
          ) : (
            <p>No options available for {field.label}</p>
          )}
          {field.datePicker && (
            <input
              type="date"
              name={field.datePicker.name}
              value={formData[field.datePicker.name] || ""}
              onChange={handleChange}
              className={errors[field.datePicker.name] ? "mandatory" : ""}
            />
          )}
        </div>
      ) : (
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={errors[field.name] ? "mandatory" : ""}
        />
      )}
      {errors[field.name] && <span className="error">{errors[field.name]}</span>}
      {field.datePicker && errors[field.datePicker.name] && (
        <span className="error">{errors[field.datePicker.name]}</span>
      )}
    </div>
  );
};

const CreateLeads = () => {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    company: {},
    contact: {},
    additionalSections: [],
    itLandscape: {
      netNew: {},
      SAPInstalledBase: {},
    },
    description: "",
    selectedOption: "",
    radioValue: "",
    createdBy: "",
  });
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState({
    companyOptions: [],
    contactOptions: [],
    itLandscapeOptions: [],
    conversationLevelOptions: [],
    bdmOptions: [],
    leadAssignedToOptions: [],
  });
  
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [optionsResponse, userNamesResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/options"),
          axios.get("http://localhost:8080/api/users"),
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          ...optionsResponse.data,
          bdmOptions: userNamesResponse.data,
          leadAssignedToOptions: userNamesResponse.data,
        }));
      } catch (error) {
        console.error("Error fetching options", error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      setFormData((prevData) => ({
        ...prevData,
        createdBy: userIdFromStorage,
      }));
    }
  }, []);

  const handleChange = useCallback((e, section, index) => {
   
     const { name, value } = e.target;
     const parsedValue = ["totalNoOfOffices", "totalNoOfManufUnits"].includes(
       name
     )
       ? Number(value)
       : value;
     setFormData((prevData) => ({
       ...prevData,
       [section]: { ...prevData[section], [name]: parsedValue },
     }));


    setFormData((prevData) => {
      if (section === "additionalSections") {
        const newAdditionalSections = [...prevData.additionalSections];
        if (!newAdditionalSections[index]) {
          newAdditionalSections[index] = {};
        }
        newAdditionalSections[index][name] = value;
        return { ...prevData, additionalSections: newAdditionalSections };
      } else if (section === "itLandscape") {
        return {
          ...prevData,
          itLandscape: {
            ...prevData.itLandscape,
            [index]: { ...prevData.itLandscape[index], [name]: value },
          },
        };
      } else if (section) {
        return {
          ...prevData,
          [section]: { ...prevData[section], [name]: value },
        };
      } else {
        return { ...prevData, [name]: value };
      }
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }, []);

  const addSection = useCallback(() => {
    setFormData((prevData) => ({
      ...prevData,
      additionalSections: [...prevData.additionalSections, {}],
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      company: {},
      contact: {},
      additionalSections: [],
      itLandscape: {
        netNew: {},
        SAPInstalledBase: {},
      },
      description: "",
      selectedOption: "",
      radioValue: "",
    });
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrors({});
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const validateSection = (config, data, section) => {
      config.flat().forEach((field) => {
        if (field.required && !data[field.name]?.trim()) {
          newErrors[field.name] = `${field.label} is required`;
        }
        if (field.datePicker?.required && !data[field.datePicker.name]) {
          newErrors[
            field.datePicker.name
          ] = `${field.datePicker.label} is required`;
        }
      });
    };

    validateSection(companyFormConfig, formData.company, "company");
    contactFormConfig.forEach((role) => {
      validateSection(role.fields, formData.contact, "contact");
    });
    Object.entries(itLandscapeConfig).forEach(([section, fields]) => {
      validateSection(
        fields,
        formData.itLandscape[section],
        `itLandscape.${section}`
      );
    });

    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!file) newErrors.file = "File is required";
    if (!formData.selectedOption)
      newErrors.selectedOption = "Present Conversation Level is required";
    if (!formData.radioValue)
      newErrors.radioValue = "Mailer Shared selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, file]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const formDataToSend = new FormData();
      const dataToSend = {
        ...formData,
        createdBy: userId,
      };
      formDataToSend.append("data", JSON.stringify(dataToSend));
      if (file) {
        formDataToSend.append("file", file);
      }

      // console.log("Data being sent:", JSON.stringify(dataToSend, null, 2));

      const response = await axios.post(
        "http://localhost:8080/api/leads",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }

        );

        alert(
          `Lead created successfully! Lead Number: ${response.data.leadNumber}`
        );
        resetForm();
      } catch (error) {
        console.error("Error saving data", error);
        alert("Error saving data. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h1>Company Information</h1>
          {companyFormConfig.map((row, rowIndex) => (
            <FormRow key={rowIndex}>
              {row.map((field) => (
                <FormGroup
                  key={field.name}
                  field={field}
                  formData={formData.company}
                  handleChange={(e) => handleChange(e, "company")}
                  errors={errors}
                  options={options}
                />
              ))}
            </FormRow>
          ))}
        </section>

        <section className="form-section">
          <h1>Contact Information</h1>
          {contactFormConfig.map((role, roleIndex) => (
            <div key={roleIndex}>
              <h2>{role.role}</h2>
              {role.fields
                .reduce((rows, field, index) => {
                  const rowIndex = Math.floor(index / 3);
                  if (!rows[rowIndex]) {
                    rows[rowIndex] = [];
                  }
                  rows[rowIndex].push(
                    <FormGroup
                      key={field.name}
                      field={field}
                      formData={formData.contact}
                      handleChange={(e) => handleChange(e, "contact")}
                      errors={errors}
                      options={options}
                    />
                  );
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <FormRow key={rowIndex}>{row}</FormRow>
                ))}
            </div>
          ))}
          {formData.additionalSections.map((section, index) => (
            <div key={`other-section-${index}`}>
              <h2>Other Section {index + 1}</h2>
              {contactFormConfig[0].fields
                .reduce((rows, field, idx) => {
                  const rowIndex = Math.floor(idx / 3);
                  if (!rows[rowIndex]) {
                    rows[rowIndex] = [];
                  }
                  rows[rowIndex].push(
                    <FormGroup
                      key={`${field.name}_other_${index}`}
                      field={{
                        ...field,
                        name: field.name.replace("it", "").toLowerCase(),
                      }}
                      formData={section}
                      handleChange={(e) =>
                        handleChange(e, "additionalSections", index)
                      }
                      errors={errors}
                      options={options}
                    />
                  );
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <FormRow key={rowIndex}>{row}</FormRow>
                ))}
            </div>
          ))}
          <div className="form-row">
            <button type="button" className="add-section" onClick={addSection}>
              + Add Other Section
            </button>
          </div>
        </section>

        <section className="form-section">
          <h1>IT Landscape</h1>
          <h2>Net New</h2>
          {itLandscapeConfig.netNew.map((row, rowIndex) => (
            <FormRow key={`netNew-${rowIndex}`}>
              {row.map((field) => (
                <FormGroup
                  key={field.name}
                  field={field}
                  formData={formData.itLandscape.netNew}
                  handleChange={(e) => handleChange(e, "itLandscape", "netNew")}
                  errors={errors}
                  options={options}
                />
              ))}
            </FormRow>
          ))}

          <h2>SAP Installed Base</h2>
          {itLandscapeConfig.SAPInstalledBase.map((row, rowIndex) => (
            <FormRow key={`SAPInstalledBase-${rowIndex}`}>
              {row.map((field) => (
                <FormGroup
                  key={field.name}
                  field={field}
                  formData={formData.itLandscape.SAPInstalledBase}
                  handleChange={(e) =>
                    handleChange(e, "itLandscape", "SAPInstalledBase")
                  }
                  errors={errors}
                  options={options}
                />
              ))}
            </FormRow>
          ))}
        </section>

        <section className="form-section">
          <h1>Description Section</h1>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="file">Attachment (PDF or Word):</label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                required
                ref={fileInputRef}
              />
              {errors.file && <span className="error">{errors.file}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="selectedOption">
                Present Conversation Level:
              </label>
              <select
                id="selectedOption"
                name="selectedOption"
                value={formData.selectedOption}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select an option</option>
                {options.conversationLevelOptions?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.selectedOption && (
                <span className="error">{errors.selectedOption}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mailer Shared:</label>
              <label>
                <input
                  type="radio"
                  name="radioValue"
                  value="yes"
                  checked={formData.radioValue === "yes"}
                  onChange={(e) => handleChange(e)}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="radioValue"
                  value="no"
                  checked={formData.radioValue === "no"}
                  onChange={(e) => handleChange(e)}
                />
                No
              </label>
              {errors.radioValue && (
                <span className="error">{errors.radioValue}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CreateLeads;
