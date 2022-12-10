const db = require('../libs/db');

class CategoryDto {
  constructor(tagId, name, upCatId = 0) {
    this.tagId = tagId;
    this.name = name;
    this.upCatId = upCatId>0 ? upCatId : 0 ;
  }
}

class BlogDto {
  constructor(tagId, title, imgLink, imgTitle, content, catId) {
    this.tagId = tagId;
    this.title = title;
    this.imgLink = imgLink;
    this.imgTitle = imgTitle;
    this.content = content;
    this.catId = catId;
  }
}

class PageDto {
  constructor(tagId, name, link) {
    this.tagId = tagId;
    this.name = name;
    this.link = link;
  }
}

class PageSectionDto {
  constructor(pageId, title, imgLink, imgTitle, content) {
    this.pageId = pageId;
    this.title = title;
    this.imgLink = imgLink;
    this.imgTitle = imgTitle;
    this.content = content;
  }
}


const categorySave = async (categoryDto) => {

  try {
    const params = [categoryDto.tagId, categoryDto.name, categoryDto.upCatId];
    await db.any(
          'insert into categories(cat_tag_id, cat_name, up_cat_id)' +
          'values($1, $2, $3)',
           params);
  } catch(err) {
    throw err;
  }

}

const allCategories = async () => {

  try {

    const categories = await db.any('select cat_id, cat_tag_id, cat_name, up_cat_id from categories order by up_cat_id desc ')
    console.log("Categories",categories)
    return categories;
  } catch(err) {
    throw err;
  }

}

const blogSave = async (blogDto, userId, ip) => {

  try {
    const params = [
                    blogDto.tagId,
                    blogDto.title, blogDto.imgLink,
                    blogDto.imgTitle, blogDto.content,
                    userId, blogDto.catId , ip
                  ];
    console.log(params);
    await db.any(
          'insert into blogs(blog_tag_id, title, image_link, image_title, content, user_id, cat_id, ip_address )' +
          'values($1, $2, $2, $3, $4, $5, $6, $7, $8)',
           params);
  } catch(err) {
    throw err;
  }

}

const blogsWithTagId = async (catTagId) => {

  try {
    const blogs = await db.any('select id, blog_tag_id, title, image_link,image_title, content from blogs where blog_tag_id = $1', [catTagId]);
    return blogs;
  } catch(err) {
    throw err;
  }

}


const pageSave = async (pageDto, userId) => {

  try {
    const params = [
                    pageDto.tagId,
                    pageDto.name, pageDto.link,
                    userId
                  ];
    const { id } = await db.one(
                        'insert into pages(page_tag_id, page_name, page_link, user_id)' +
                        'values($1, $2, $3, $4) RETURNING id',
                  params);
    return id;

  } catch(err) {
    throw err;
  }

}

const pageSectionSave = async (pageSectionDto, userId, ipAddress) => {

  try {

    const params = [
                    pageSectionDto.pageId, pageSectionDto.title,
                    pageSectionDto.imgLink, pageSectionDto.imgTitle,
                    pageSectionDto.content, userId, ipAddress
                  ];

    const { section_id } = await db.one(
                        'insert into page_sections(page_id, title, image_link, ' +
                        'image_title, content, user_id, ip_address)' +
                        'values($1, $2, $3, $4, $5, $6, $7 ) RETURNING section_id',
                  params);

    return section_id;

  } catch(err) {
    throw err;
  }

}

const getPagesAndSections = async () => {

  try {
    const pages = await db.any('select id, page_tag_id, page_name, page_link from pages order by id');
    const sections = await db.any('select section_id, page_id, title, image_link, image_title, content from page_sections order by page_id');
    return {
      pages,
      sections
    }
  } catch(err) {
    throw err;
  }

}


module.exports = {
  CategoryDto,
  BlogDto,
  PageDto,
  PageSectionDto,
  categorySave,
  allCategories,
  blogSave,
  blogsWithTagId,
  pageSave,
  pageSectionSave,
  getPagesAndSections
}
