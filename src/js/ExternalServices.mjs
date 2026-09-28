const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend-osp8.onrender.com/";

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const url = baseURL.endsWith("/") ? `${baseURL}products/search/${category}` : `${baseURL}/products/search/${category}`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const url = baseURL.endsWith("/") ? `${baseURL}product/${id}` : `${baseURL}/product/${id}`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const url = baseURL.endsWith("/") ? `${baseURL}checkout` : `${baseURL}/checkout`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    return await convertToJson(response);
  }
}