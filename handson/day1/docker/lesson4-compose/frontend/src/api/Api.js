export default class Api {
  static createChat = async (identity, payload) => {
    try {
      const response = await fetch(`${process.env.ENDPOINT}/api/chats`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return response.json();
    } catch (error) {
      console.error(error);
    }
    return {};
  };
}
