const apiUrl = "http://api.count-of-money.local";

const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const api = {
  getAllCryptos: async (): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/cryptos`, {
        method: "GET",
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      throw error;
    }
  },
  getCryptos: async (cmids: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/cryptos?cmids=${cmids}`, {
        method: "GET",
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      throw error;
    }
  },
  getCandleStick: async (crypto: string): Promise<any> => {
    try {
      const response = await fetch(
        `${apiUrl}/cryptos/${crypto}/history/daily`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching crypto:", error);
      throw error;
    }
  },

  logIn: async (user: any): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Wrong email or password:", error);
      throw error;
    }
  },

  getProfile: async (userToken: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  register: async (userData: any): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Invalid data:", error);
      throw error;
    }
  },
};

export default api;
