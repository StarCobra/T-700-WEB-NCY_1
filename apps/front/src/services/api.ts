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

  createUser: async (userData: any): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error saving cryptos:", error);
      throw error;
    }
  }
  
};

export default api;
