const mongoose = require('mongoose')

const mongoUrl = 'mongodb://xxx:xxx@ds247439.mlab.com:47439/fs-bloglist'
mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = (blog) => {
  return {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog