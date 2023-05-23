const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })
      .then((dbBlogData) => {
        const blogs = dbBlogData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
          blogs,
          logged_in: true,
          username: req.session.username,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    })
      .then((dbBlogData) => {
        if (!dbBlogData) {
          res.status(404).json({ message: 'No blog found with this id' });
          return;
        }
  
        const blog = dbBlogData.get({ plain: true });
        console.log('sending ' + req.session.username);
        res.render('edit-blog', {
          blog,
          logged_in: true,
          username: req.session.username,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  router.get('/new', (req, res) => {
    res.render('new-blog', { username: req.session.username });
  });

module.exports = router;