import log from '../logger';

const request = async (url: string, config?: RequestInit) => {
  let requestPending = 0;

  while (requestPending < 10) {
    try {
      const response = await fetch(url, config);

      if (response.status >= 400) {
        log.warn({ message: { response } });
        requestPending += 1;
      }

      return await response.json();
    } catch (error) {
      log.error({ message: error.message });
      requestPending += 1;
    }
  }
  throw Error;
};

export default request;
