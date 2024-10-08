// const express = require('express');
// const router = express.Router();
// const Lead = require('./models/createLeads'); // Assuming leadSchema is in the lead.js file

// // Helper function to build the search query based on params
// const buildSearchQuery = (params) => {
//   const query = {};
  
//   if (params["Company Name"]) {
//     query["companyInfo.Company Name"] = { $regex: params["Company Name"], $options: 'i' };
//   }
//   if (params.City) {
//     query["companyInfo.City"] = { $regex: params.City, $options: 'i' };
//   }
//   if (params.Vertical) {
//     query["companyInfo.Vertical"] = { $regex: params.Vertical, $options: 'i' };
//   }
//   if (params.Priority && params.Priority !== 'Show All') {
//     query["companyInfo.Priority"] = params.Priority;
//   }
//   if (params.State) {
//     query["companyInfo.State"] = { $regex: params.State, $options: 'i' };
//   }

//   return query;
// };

// // Route to handle search queries with pagination and sorting
// router.get('/createLeads/search', async (req, res) => {
//   try {
//     const query = buildSearchQuery(req.query);

//     // Pagination and Sorting
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     // Validate page and limit
//     if (page < 1 || limit < 1) {
//       return res.status(400).json({ message: 'Invalid pagination values. Page and limit must be greater than 0.' });
//     }

//     const sortField = req.query.sort || 'createdAt'; // default sorting by createdAt
//     const sortOrder = req.query.order === 'desc' ? -1 : 1;

//     // Fetching data
//     const leads = await Lead.find(query)
//       .sort({ [sortField]: sortOrder })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     const totalLeads = await Lead.countDocuments(query);

//     res.json({
//       leads,
//       totalLeads,
//       currentPage: page,
//       totalPages: Math.ceil(totalLeads / limit),
//     });
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).json({
//       message: 'Error fetching leads. Please check your query parameters and try again.',
//       error
//     });
//   }
// });

// module.exports = router;
