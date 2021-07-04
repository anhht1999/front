/**
 * Create a new context
 * @returns {{config: {endpoint: string}}}
 */
 function createContext() {
    return {
      config: {
        endpoint: '/',
      },
    };
  }
  
  /**
   * Create a http instance
   * @param config
   * @returns {{http: null, config: {endpoint: string}}|*}
   */
  function createHttpInstance(config = {}) {
    const context = createContext();
    if (config) {
      context.config = Object.assign(context.config, config);
    }
  
    return {
      request(url = '/') {
        const reqUrl = url.indexOf('http') !== -1 ? url : `${config.endpoint}${url}`;
        return fetch(reqUrl)
          .then((response) => response.json())
          .catch((e) => Promise.reject(e));
      },
    };
  }
  