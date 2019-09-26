/// <reference path="../steps.d.ts" />
'use strict';
let Helper = codecept_helper;

const requireg = require('requireg');

let axios = requireg('axios');
let headers = {};

// Works with `REST` to get at some of the missing properties we need
class CustomRESTHelper extends Helper {        

    constructor(config) {
        super(config);
        axios = requireg('axios');
        this.options = {
          timeout: 10000,
          defaultHeaders: {},
          endpoint: '',
        };
        this.options = Object.assign(this.options, config);
        headers = Object.assign({}, this.options.defaultHeaders);
        axios.defaults.headers = this.options.defaultHeaders;
      }
    
      static _checkRequirements() {
        try {
          requireg('axios');
        } catch (e) {
          return ['axios'];
        }
      }
    
      /**
       * Executes axios request
       *
       * @param {*} request
       */
      async _executeRequest(request) {
        axios.defaults.timeout = request.timeout || this.options.timeout;
    
        if (headers && headers.auth) {
          request.auth = headers.auth;
        }
    
        if ((typeof request.data) === 'string') {
          request.headers = Object.assign(request.headers, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    
        if (this.config.onRequest) {
          await this.config.onRequest(request);
        }
    
        this.debugSection('Request', JSON.stringify(request));
    
        let response;
        try {
          response = await axios(request);
        } catch (err) {
          //if (!err.response) throw err;
          //this.debugSection('Response', `Response error. Status code: ${err.response.status}`);
          response = err.response;
        }
        //this.debugSection('Response', JSON.stringify(response.data));
        return response;
      }
    
      /**
       * Generates url based on format sent (takes endpoint + url if latter lacks 'http')
       *
       * @param {*} url
       */
      _url(url) {
        return url.indexOf('http') === -1 ? this.options.endpoint + url : url;
      }
    
      /**
       * Set timeout for the request
       *
       * ```js
       * I.setRequestTimeout(10000); // In milliseconds
       * ```
       *
       */
      setRequestTimeout(newTimeout) {
        this.options.timeout = newTimeout;
      }
    
      /**
       * Send GET request to REST API
       *
       * ```js
       * I.checkGetRequest('/api/users.json');
       * ```
       *
       * @param {*} url
       * @param {object} headers
       */
      async checkGetRequest(url, headers = {}) {
        const request = {
          baseURL: this._url(url),
          headers,
          withCredentials: true
        };
        return this._executeRequest(request);
      }
    
      /**
       * Sends POST request to API.
       *
       * ```js
       * I.checkPostRequest('/api/users.json', { "email": "user@user.com" });
       * ```
       *
       * @param {*} url
       * @param {*} payload
       * @param {object} headers
       */
      async checkPostRequest(url, payload = {}, headers = {}) {
        const request = {
          baseURL: this._url(url),
          method: 'POST',
          data: payload,
          headers,
        };
    
        return this._executeRequest(request);
      }
    
      /**
       * Sends PATCH request to API.
       *
       * ```js
       * I.checkPatchRequest('/api/users.json', { "email": "user@user.com" });
       * ```
       *
       * @param {string} url
       * @param {object} payload
       * @param {object} headers
       */
      async checkPatchRequest(url, payload, headers = {}) {
        const request = {
          baseURL: this._url(url),
          method: 'PATCH',
          data: payload,
          headers,
        };
    
        return this._executeRequest(request);
      }
    
      /**
       * Sends PUT request to API.
       *
       * ```js
       * I.checkPutRequest('/api/users.json', { "email": "user@user.com" });
       * ```
       *
       * @param {string} url
       * @param {object} payload
       * @param {object} headers
       */
      async checkPutRequest(url, payload = {}, headers = {}) {
        const request = {
          baseURL: this._url(url),
          method: 'PUT',
          data: payload,
          headers,
        };
    
        return this._executeRequest(request);
      }
    
      /**
       * Sends DELETE request to API.
       *
       * ```js
       * I.checkDeleteRequest('/api/users/1');
       * ```
       *
       * @param {*} url
       * @param {object} headers
       */
      async checkDeleteRequest(url, headers = {}) {
        const request = {
          baseURL: this._url(url),
          method: 'DELETE',
          headers,
        };
    
        return this._executeRequest(request);
      }
    
}

module.exports = CustomRESTHelper;