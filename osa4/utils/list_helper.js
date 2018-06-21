const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0

  for (let i = 0; i < blogs.length; i++) {
    total += blogs[i].likes
  }
  return total
}

const favouriteBlog = (blogs) => {
  if (blogs.length > 0) {
    let fav = blogs[0]

    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].likes > fav.likes) {
        fav = blogs[i]
      }
    }
    return fav
  } else {
    return false
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
