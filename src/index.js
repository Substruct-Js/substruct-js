import axios from 'axios'

class Substruct {
  constructor (token = false) {
    if (!token) {
      return new Error('You need to supply your space ID.')
    } else {
      this.secret = token
    }
    this.axios = axios.create({
      baseURL: 'https://api.substruct.app/api/v1/space/'
    })
    this.axios.defaults.headers.common['Authorization'] = this.secret;
    this.content = false
    this.page = false
  }

  /**
   * Function to collect pages
   */
  collectPages (callback, tags = []) {
    this.axios({
      method: 'get',
      url: `pages${tags.length > 0 ? '?filter=' + tags.join(',') : ''}`
    }).then((response) => {
      if (response.status === 200) {
        return callback(null, response.data)
      } else {
        return callback(response.data, null)
      }
    })
  }

  /**
   * Get content by identifier
   * @param {string} identififer
   * @param {array} content optional
   */
  getContentByIdentifier (identififer, content = false) {
    if (!this.content && !content) {
      throw Error('You need to provide some content to search through')
    }
    let searchArray = content ? content : this.content
    const filteredContent = searchArray.filter(c => c.identifier === 'identifier')
    return filteredContent[0]
  }

  /**
   * Function to collect page
   */
  collectPage (id, callback) {
    this.axios({
      method: 'get',
      url: `page?id=${id}`
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.content) {
          this.content = response.data.content
        }

        if (response.data.page) {
          this.page = response.data.page
        }

        return callback(null, response.data)
      } else {
        return callback(response.data, null)
      }
    })
  }
}

export default Substruct