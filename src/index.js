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
   * Function to collect page
   */
  collectPage (id, callback, tags = false) {
    this.axios({
      method: 'get',
      url: `page?id=${id}${tags && tags.length > 0 ? `&filter=${tags.join(',')}` : ''}`
    }).then((response) => {
      if (response.status === 200) {
        return callback(null, response.data)
      } else {
        return callback(response.data, null)
      }
    })
  }

  /**
   * Function to collect page content
   */
  collectPageContent (id, type, callback, tags = false) {
    this.axios({
      method: 'get',
      url: `page/content?id=${id}&type=${type}${tags && tags.length > 0 ? `&filter=${tags.join(',')}` : ''}`
    }).then((response) => {
      if (response.status === 200) {
        return callback(null, response.data)
      } else {
        return callback(response.data, null)
      }
    })
  }

  /**
   * Function to collect content
   */
  collectContent (type, callback, tags = false) {
    this.axios({
      method: 'get',
      url: `content?type=${type}${tags && tags.length > 0 ? `&filter=${tags.join(',')}` : ''}`
    }).then((response) => {
      if (response.status === 200) {
        return callback(null, response.data)
      } else {
        return callback(response.data, null)
      }
    })
  }
}

export default Substruct