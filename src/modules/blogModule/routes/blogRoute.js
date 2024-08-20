const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.post('/', blogController.createBlog)
router.get('/', blogController.getAllBlog)
router.put('/:id', blogController.updateBlog)
router.delete('/:id', blogController.deleteBlog)

module.exports = router
