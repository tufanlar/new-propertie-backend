const {
  CategoryDto, BlogDto,
  categorySave, allCategories,
  blogSave, blogsWithTagId,
  PageDto, pageSave,
  PageSectionDto, pageSectionSave,
  getPagesAndSections } = require('../models/home.model');


async function saveCategory(req, res, next) {
  try {
    const {cat_tag_id, cat_name, up_cat_id} = req.body;
    await categorySave(new CategoryDto(cat_tag_id, cat_name, up_cat_id));
    res.send({message:"Category successfuly created"});
  } catch(err) {
    return next(err);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await allCategories();
    res.send({categories});
  } catch(err) {
    return next(err);
  }

}

async function saveBlog(req, res, next) {

  try {
    const {blog_tag_id, title, image_link, image_title, content, cat_id } = req.body;
    const {user_id, user_ip} = req;
    await blogSave(
              new BlogDto (blog_tag_id, title, image_link, image_title, content, cat_id)
              ,user_id, user_ip
            );
    res.send({message:"Blog successfuly saved"});
  } catch(err) {
    return next(err);
  }

}

async function getBlogsWithCatTagId(req, res, next) {

  try {
    const {cat_tag_id} = req.params;
    const blogs = await blogsWithTagId(cat_tag_id);
    res.send({blogs});
  } catch(err) {
    return next(err);
  }

}

async function savePage(req, res, next) {

  try {
    const {page_tag_id, page_name, page_link} = req.body;
    const {user_id} = req;
    const pageId = await pageSave(new PageDto(page_tag_id, page_name, page_link), user_id);
    res.send({message:"Page successfuly saved" , pageId});
  } catch(err) {
    return next(err);
  }

}

async function savePageSection(req, res, next) {

  try {

    const {page_id, title, image_link, image_title, content } = req.body;
    const {user_id, user_ip} = req;

    const pageSectionId = await pageSectionSave(
      new PageSectionDto(
        page_id, title, image_link, image_title, content), user_id, user_ip
      );

    res.send({message:"Page section successfuly saved", pageSectionId});

  } catch(err) {
    return next(err);
  }

}

async function getPagesWithSections(req, res, next) {

  try {
    const {pages, sections} = await getPagesAndSections();
    res.send({pages, sections});
  } catch(err) {
    return next(err);
  }

}


module.exports = {
  savePage,
  savePageSection,
  saveBlog,
  saveCategory,
  getBlogsWithCatTagId,
  getCategories,
  getPagesWithSections
}
