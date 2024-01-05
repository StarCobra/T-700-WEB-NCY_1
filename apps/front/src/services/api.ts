const apiUrl = "http://api.count-of-money.local";

const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const api = {
  getCryptos: async (cmids: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/cryptos?cmids=${cmids}`);
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      throw error;
    }
  },
  // Ajoutez d'autres méthodes pour chaque route de votre API
  getArticles: async (params: string): Promise<any> => {
    try {
      console.log("params", params);
      const fields = !params ? `/params=${params}}` : "";
      console.log("fields", fields);
      const response = await fetch(`${apiUrl}/articles${fields}`);
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  getArticle: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/articles/${id}`);
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },
};

export default api;
