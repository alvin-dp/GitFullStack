class Post {
  constructor(title) {
    this.date = new Date()    
    this.title = title
  }

  toString() {
    return JSON.stringify({
      date: this.date.toJSON(),      
      title: this.title
    })
  }
}
export default Post