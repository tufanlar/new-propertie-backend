const homeController = require('../../controllers/home.controller');
const checkToken = require('../../middleware/token')

const express = require('express');

const app = express.Router();

app.post('/save-page', checkToken, homeController.savePage);
app.post('/save-page-section', checkToken, homeController.savePageSection);
app.post('/save-blog', checkToken, homeController.saveBlog);
app.post('/save-category', checkToken, homeController.saveCategory);

app.get('/get-blogs/:cat_id', checkToken, homeController.getBlogsWithCatId);
app.get('/get-pages-with-sections', checkToken, homeController.getPagesWithSections);
app.get('/get-categories', checkToken, homeController.getCategories);

module.exports = app
