import axios from 'axios'
import Response from '@/plugins/response.js'
import Vue from 'vue'

class mqlAssetFDB {
  constructor (indexId = null) {
    let cancel
    let isDevelopment = process.env.NODE_ENV !== 'production'
    let CancelToken = axios.CancelToken
    this.assetData = new FormData()
    this.route = 'assetfdb'
    this.downloadRoute = 'assetdownload'
    this.hostName = ''
    this.fileName = ''
    this.indexType = 'o'
    this.indexId = indexId
    this.recordId = ''
    const IndexSplitter = '.'
    this.customURL = ''

    const mqlInstance = axios.create({
      baseURL: Vue.getBaseURL()
    })

    mqlInstance.interceptors.request.use(
      function (config) {
        if (config.url.indexOf('r/mql') !== -1 || config.url.indexOf('r/c/mql') !== -1) {
          if (sessionStorage.getItem('user-token') === null) {
            cancel('Operation canceled by the MQL interceptor.')
          }
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    const setHeaders = (headers = {}) => {
      headers['Authorization'] =
        'Bearer ' + sessionStorage.getItem('user-token')
      headers['Content-Type'] = 'multipart/form-data'
      return headers
    }

    this.formatIndex = function (indexIdStr) {
      this.indexType = indexIdStr.split(IndexSplitter)[0]
      this.indexId = indexIdStr.split(IndexSplitter)[1]
    }

    // TODO: Validate the necessary params by creating a helper function
    // to generate url for uploading an asset
    this.generateUploadURL = () => {
      let url = `${this.indexType}/${this.route}/${this.hostName}/${this.indexId}`
      if (this.customURL) {
        url = `${this.customURL}/${url}`
      } else {
        url = `/${url}`
      }
      return url
    }
    this.generateUpdateURL = () => {
      let url = `${this.indexType}/${this.route}/${this.hostName}/${this.indexId}`
      if (this.recordId) {
        url = `${url}/${this.recordId}`
      } else {
        console.log('Record Id cannot be null')
        url = `${url}/`
        return url
      }
      if (this.customURL) {
        url = `${this.customURL}/${url}`
        return url
      } else {
        url = `/${url}`
        return url
      }
    }
    this.generateStreamURL = assetPath => {
      let url = `${this.indexType}/${this.route}`
      if (assetPath) {
        url = `${url}/${assetPath}`
      } else {
        console.error('Asset Path cannot be null')
        return
      }
      if (this.customURL) {
        url = `${this.customURL}/${url}`
        return url
      } else {
        url = `/server/${url}`
        return url
      }
    }
    this.generateDownloadURL = assetPath => {
      let url = `${this.indexType}/${this.downloadRoute}`
      if (assetPath) {
        url = `${url}/${assetPath}`
      } else {
        console.error('Asset Path cannot be null')
        return
      }
      if (this.customURL) {
        url = `${this.customURL}/${url}`
        return url
      } else {
        url = `/server/${url}`
        return url
      }
    }
    this.setIndex = function (indexId) {
      this.formatIndex(indexId)
      return this
    }

    this.setHostName = function (hostName) {
      this.hostName = hostName
      return this
    }
    this.setFormData = formData => {
      this.fileName = formData.get('file').name
      this.assetData.append('asset', formData.get('file'))
      return this
    }

    this.setCustomURL = customURL => {
      this.customURL = customURL
      return this
    }

    this.setAssetData = function (assetData) {
      assetData = JSON.stringify(assetData)
      this.assetData.set('data', assetData)
      return this
    }

    this.enablePageLoader = function (boolShowPageLoader = false) {
      this.showPageLoader = boolShowPageLoader
      return this
    }

    this.setUpdateWithRecordId = function (recordId) {
      this.recordId = recordId
      return this
    }

    this.uploadAssetFile = (docId = null) => {
      let txt = ''
      if (this.showPageLoader) {
        window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      }
      return new Promise(resolve => {
        if (docId !== null && document.getElementById(docId) !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        let url = ''
        if (this.recordId) {
          url = this.generateUpdateURL()
        } else {
          url = this.generateUploadURL()
        }
        if (this.indexId) {
          mqlInstance({
            url: url,
            method: 'POST',
            headers: setHeaders(),
            data: this.assetData,
            cancelToken: new CancelToken(function executor (c) {
              cancel = c
            })
          })
            .then(res => {
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              if (docId !== null && document.getElementById(docId) !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              let obj = {}
              obj.data = {}
              obj.data.errorCode = 1000
              obj.data.result = res.data
              resolve(new Response(obj))
            })
            .catch(error => {
              let obj = {}
              obj.data = {}
              if (docId !== null && document.getElementById(docId) !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              obj.data.error = error.message
              obj.data.errorCode = 1990
              obj.data.result = null
              resolve(new Response(obj))
            })
        } else {
          if (docId !== null && document.getElementById(docId) !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'Data Not Found' + this.assetData
          obj.data.errorCode = 1990
          obj.data.result = null
          resolve(new Response(obj))
        }
      }).catch(error => {
        // Handling development related errors
        if (isDevelopment) {
          alert(error)
        }
      })
    }

    this.download = (assetPath, docId = null) => {
      let txt = ''
      if (this.showPageLoader) {
        window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      }
      return new Promise(resolve => {
        if (docId !== null && document.getElementById(docId) !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        if (assetPath) {
          window.open(this.generateDownloadURL(assetPath), '_blank')
        } else {
          if (docId !== null && document.getElementById(docId) !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'No Data Found' + this.assetData
          obj.data.errorCode = 1990
          obj.data.result = null
          resolve(new Response(obj))
        }
      }).catch(error => {
        // Handling development related errors
        if (isDevelopment) {
          alert(error)
        }
      })
    }
    this.render = (assetPath, docId = null) => {
      let txt = ''
      if (this.showPageLoader) {
        window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      }
      return new Promise(resolve => {
        if (docId !== null && document.getElementById(docId) !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        if (assetPath) {
          window.open(this.generateStreamURL(assetPath), '_blank')
        } else {
          if (docId !== null && document.getElementById(docId) !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'No Data Found' + this.assetData
          obj.data.errorCode = 1990
          obj.data.result = null
          resolve(new Response(obj))
        }
      }).catch(error => {
        // Handling development related errors
        if (isDevelopment) {
          alert(error)
        }
      })
    }
  }
}

export default mqlAssetFDB
