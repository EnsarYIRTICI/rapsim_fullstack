import axios from "axios";
import HeaderUtil from "../utils/HeaderUtil";

class HttpService {
  static async Get(url, token) {
    try {
      const response = await axios.get(url, {
        headers: HeaderUtil.getHeader(token),
      });

      return response.data;
    } catch (reason) {
      if (reason.response) {
        const request = reason.response.request;
        if (request.response) {
          throw new Error(request.response);
        }
        throw new Error(reason.message);
      }
      throw new Error(reason.message);
    }
  }

  static async Post(url, token, body) {
    try {
      const response = await axios.post(url, JSON.stringify(body), {
        headers: HeaderUtil.postHeader(token),
      });

      return response.data;
    } catch (reason) {
      if (reason.response) {
        const request = reason.response.request;
        if (request.response) {
          throw new Error(request.response);
        }
        throw new Error(reason.message);
      }
      throw new Error(reason.message);
    }
  }

  static async Put(url, token, body) {
    try {
      const response = await axios.put(url, JSON.stringify(body), {
        headers: HeaderUtil.postHeader(token),
      });

      return response.data;
    } catch (reason) {
      if (reason.response) {
        const request = reason.response.request;
        if (request.response) {
          throw new Error(request.response);
        }
        throw new Error(reason.message);
      }
      throw new Error(reason.message);
    }
  }

  static async FormData(url, token, body, files, abortSignal, progresser) {
    const formData = new FormData();
    formData.append("body", JSON.stringify(body));

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append(i === 0 ? "file" : `file${i}`, file);
      }
    }

    try {
      const response = await axios.post(url, formData, {
        headers: HeaderUtil.formHeader(token),
        signal: abortSignal,
        onUploadProgress: (pe) => {
          if (progresser) progresser(HttpService.percent(pe) + "%");
        },
      });
      return response.data;
    } catch (reason) {
      if (reason.response) {
        const request = reason.response.request;
        if (request.response) {
          throw new Error(request.response);
        }
        throw new Error(reason.message);
      }
      throw new Error(reason.message);
    }
  }

  static percent(event) {
    return Math.round((event.loaded * 100) / event.total);
  }
}

export default HttpService;
