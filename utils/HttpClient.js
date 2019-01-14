import axios from 'axios';

const supportedErrorCodes = {};

const instantiateErrorWithCodeAndMsg = ({ code, message }) => {
  const error = new Error(message);

  error.code = code;

  return error;
};
const getErrorCodeAndMsg = error => ({
  code: supportedErrorCodes[error.code] || 'UNKNOWN_ERROR',
  message: error.message || JSON.stringify(error),
});
const extractErrorFromResponse = error => (error.response && error.response.data) || error;
const handleError = error =>
  Promise.reject(
    instantiateErrorWithCodeAndMsg(getErrorCodeAndMsg(extractErrorFromResponse(error)))
  );

class HttpClient {
  static createInstance(instanceConfig) {
    const axiosInstance = axios.create(instanceConfig);

    axiosInstance.interceptors.request.use(config => {
      const reqHeader = {
        Accept: 'application/json',
      };

      if (config.method === 'get') {
        return {
          ...config,
          headers: {
            ...config.headers,
            ...reqHeader,
          },
        };
      }
      return {
        ...config,
        headers: {
          ...config.headers,
          ...reqHeader,
        },
      };
    }, null);

    axiosInstance.interceptors.response.use(null, handleError);

    return axiosInstance;
  }
}

export { HttpClient as default, supportedErrorCodes };
