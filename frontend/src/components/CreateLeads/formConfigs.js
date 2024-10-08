
export const companyFormConfig = [
  [
    {
      name: "Lead Type ",
      label: "Lead Type *",
      type: "select",
      options: "leadTypeOptions",
    },
    { name: "Generic email 1", label: "Generic email 1", type: "email" },
    {
      name: "Vertical",
      label: "Vertical *",
      type: "select",
      options: "verticalOptions",
    },
  ],
  [
    {
      name: "Company Name",
      label: "Company Name *",
      type: "text",
    },
    { name: "Generic email 2", label: "Generic email 2", type: "email" },
    {
      name: "Lead Assigned to",
      label: "Lead Assigned to",
      type: "select",
      options: "leadAssignedToOptions",
    },
  ],
  [
    { name: "Website", label: "Website *", type: "url", required: true },
    { name: "Generic phone 1", label: "Generic phone 1", type: "tel" },
    { name: "BDM", label: "BDM", type: "select", options: "bdmOptions" },
  ],
  [
    { name: "Address", label: "Address *", type: "text", required: true },
    { name: "Generic phone 2", label: "Generic phone 2", type: "tel" },
    {
      name: "Lead Status",
      label: "Lead Status",
      type: "select",
      options: "leadStatusOptions",
    },
  ],
  [
    { name: "City", label: "City *", type: "text", required: true },
    {
      name: "Lead Source",
      label: "Lead Source",
      type: "select",
      options: "leadSourceOptions",
    },
    {
      name: "Priority",
      label: "Priority *",
      type: "select",
      options: "priorityOptions",
    },
  ],
  [
    {
      name: "State",
      label: "State *",
      type: "select",
      options: "stateOptions",
    },
    {
      name: "totalNoOfOffices",
      label: "Total no. of offices",
      type: "number",
    },
    {
      name: "Next Action",
      label: "Next Action *",
      type: "select",
      options: "nextActionOptions",

      datePicker: { name: "dateField", label: "Date" },
    },
  ],
  [
    {
      name: "Country",
      label: "Country",
      type: "select",
      options: "countryOptions",
    },
    {
      name: "Turn Over (INR)",
      label: "Turn Over (INR)",
      type: "select",
      options: "turnOverOptions",
    },
    {
      name: "Lead Usable",
      label: "Lead Usable *",
      type: "select",
      options: "leadUsableOptions",
    },
  ],
  [
    {
      name: "Employee Count",
      label: "Employee Count",
      type: "select",
      options: "employeeCountOptions",
    },
    {
      name: "totalNoOfManufUnits",
      label: "Total no. of Manuf. Units",
      type: "number",
    },
    {
      name: "Reason",
      label: "Reason",
      type: "select",
      options: "reasonOptions",
    },
  ],
  [{ name: "About The Company", label: "About The Company", type: "textarea" }],
];
export const contactFormConfig = [
  {
    role: "IT",
    fields: [
      { name: "itName", label: "Name *", type: "text", required: true },
      { name: "itDlExt", label: "DL/Ext", type: "text" },
      { name: "itDesignation", label: "Designation", type: "text" },
      { name: "itMobile", label: "Mobile", type: "tel" },
      { name: "itEmail", label: "Email *", type: "email", required: true },
      { name: "itPersonalEmail", label: "Personal Email", type: "email" },
    ],
  },
  {
    role: "Finance",
    fields: [
      { name: "financeName", label: "Name *", type: "text", required: true },
      { name: "financeDlExt", label: "DL/Ext", type: "text" },
      { name: "financeDesignation", label: "Designation", type: "text" },
      { name: "financeMobile", label: "Mobile", type: "tel" },
      { name: "financeEmail", label: "Email *", type: "email", required: true },
      { name: "financePersonalEmail", label: "Personal Email", type: "email" },
    ],
  },
  {
    role: "Business Head",
    fields: [
      { name: "businessHeadName", label: "Name *", type: "text", required: true },
      { name: "businessHeadDlExt", label: "DL/Ext", type: "text" },
      { name: "businessHeadDesignation", label: "Designation", type: "text" },
      { name: "businessHeadMobile", label: "Mobile", type: "tel" },
      {
        name: "businessHeadEmail",
        label: "Email *",
        type: "email",
        
      },
      {
        name: "businessHeadPersonalEmail",
        label: "Personal Email",
        type: "email",
      },
    ],
  },
];

export const itLandscapeConfig = {
  netNew: [
    [
      {
        name: "Using ERP (y/n)",
        label: "Using ERP (y/n)",
        type: "select",
        options: "usingERPOptions",
      },
      { name: "Budget", label: "Budget", type: "text" },
      {
        name: "Opportunity for us 1",
        label: "Opportunity for us 1",
        type: "select",
        options: "opportunityOptions",
      },
    ],
    [
      {
        name: "If yes, which one",
        label: "If yes, which one",
        type: "select",
        options: "ERPTypeOptions",
      },
      { name: "Authority", label: "Authority", type: "text" },
      {
        name: "Opportunity Value 1",
        label: "Opportunity Value 1",
        type: "select",
      },
    ],
    [
      {
        name: "If no, why",
        label: "If no, why",
        type: "select",
        options: "noWhyOptions",
      },
      { name: "Need", label: "Need", type: "text" },

      {
        name: "Timeframe",
        label: "Timeframe",
        type: "select",
        options: "timeframeOptions",
      },
    ],
    [
      { name: "Hardware", label: "Hardware", type: "text" },

      {
        name: "Current Database",
        label: "Current Database",
        type: "select",
        options: "currentDatabaseOptions",
      },
    ],
  ],
  SAPInstalledBase: [
    [
      {
        name: "Opportunity for us 2",
        label: "Opportunity for us 2",
        type: "select",
        options: "opportunityOptions",
      },
      {
        name: "Year of Implementation",
        label: "Year of Implementation",
        type: "text",
      },
      { name: "No. of Users", label: "No. of Users", type: "number" },
    ],
    [
      {
        name: "Opportunity Value 2",
        label: "Opportunity Value 2",
        type: "text",
      },

      {
        name: "Contract Expiry",
        label: "Contract Expiry",
        type: "select",
        options: "expiryOptions",
      },
      {
        name: "Support Partner",
        label: "Support Partner",
        type: "select",
        options: "partnerOptions",
      },
    ],
    [
      {
        name: "Opportunity for us 3",
        label: "Opportunity for us 3",
        type: "select",
        options: "opportunityOptions",
      },

      {
        name: "Exact Version",
        label: "Exact Version",
        type: "select",
        options: "versionOptions",
      },
      { name: "Hardware", label: "Hardware", type: "text" },
    ],
    [
      {
        name: "Opportunity Value 3",
        label: "Opportunity Value 3",
        type: "text",
      },
      { name: "No. of License", label: "No. of License", type: "number" },
      { name: "License Value", label: "License Value", type: "text" },
    ],
    [
      {
        name: "Modules Implemented",
        label: "Modules Implemented",
        type: "text",
      },

      {
        name: "Implementation Partner",
        label: "Implementation Partner",
        type: "text",
      },
      {
        name: "Total Project Cost",
        label: "Total Project Cost",
        type: "text",
      },
    ],
  ],
};