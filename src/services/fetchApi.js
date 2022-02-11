const fetchApi = async () => {
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default fetchApi;
