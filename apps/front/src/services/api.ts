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

  getArticles: async (params: string, userToken: string): Promise<any> => {
    const fields = params !== "" ? `?params=${params}` : "";

    if (userToken !== "") {
      try {
        const response = await fetch(`${apiUrl}/articles${fields}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        return handleErrors(response);
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
    } else {
      try {
        const response = await fetch(`${apiUrl}/articles${fields}`);
        return handleErrors(response);
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
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

  putProfile: async (user: any, userToken: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ is_change: true, user }),
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  register: async (user: any): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Invalid data:", error);
      throw error;
    }
  },

  postCrypto: async (crypto: any, userToken: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/cryptos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(crypto),
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error posting crypto:", error);
      throw error;
    }
  },

  getInternalCrypto: async (
    onlyTrashed: boolean,
    userToken: string,
  ): Promise<any> => {
    const only_trashed = onlyTrashed
      ? "?only_trashed=true"
      : "?only_trashed=false";
    try {
      const response = await fetch(
        `${apiUrl}/cryptos/internal${only_trashed}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching internal crypto:", error);
      throw error;
    }
  },

  deleteInternalCrypto: async (
    cryptoId: number,
    userToken: string,
  ): Promise<any> => {
    console.log("cryptoId", cryptoId);
    try {
      const response = await fetch(`${apiUrl}/cryptos/${cryptoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error deleting internal crypto:", error);
      throw error;
    }
  },

  restoreInternalCrypto: async (
    cryptoId: number,
    userToken: string,
  ): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/cryptos/${cryptoId}/restore`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error restoring internal crypto:", error);
      throw error;
    }
  },

  postKeyword: async (keyword: any, userToken: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/keywords`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(keyword),
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error posting keyword:", error);
      throw error;
    }
  },

  getKeywords: async (
    onlyTrashed: boolean,
    userToken: string,
  ): Promise<any> => {
    const only_trashed = onlyTrashed
      ? "?only_trashed=true"
      : "?only_trashed=false";
    try {
      const response = await fetch(`${apiUrl}/keywords${only_trashed}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      throw error;
    }
  },

  deleteKeyword: async (keywordId: number, userToken: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/keywords/${keywordId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error deleting keyword:", error);
      throw error;
    }
  },

  restoreKeyword: async (
    keywordId: number,
    userToken: string,
  ): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/keywords/${keywordId}/restore`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error restoring keyword:", error);
      throw error;
    }
  },

  deleteProfile: async (userID: number, userToken: string): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/profile/${userID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return handleErrors(response);
    } catch (error) {
      console.error("Error deleting keyword:", error);
      throw error;
    }
  },
};

export default api;
