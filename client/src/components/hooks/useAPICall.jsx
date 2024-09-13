import axios from "axios";
import {useCallback, useEffect, useState} from "react";

const baseUrl = "http://localhost:3000/api";

export const useGet = endpoint => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "GET",
        signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, loading, error, refetch: fetchData, setData};
};

/**
 * @API_POST
 */
export const usePost = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const post = async (url, payload) => {
    try {
      const response = await axios.post(`${baseUrl}${url}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setData(response.data);
      console.log(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.log("Api Call Error", err);
      setData(null);
      setError(err.message || "An Error occurred");
      throw err;
    }
  };

  return {data, post, error};
};

/**
 * @API_Delete
 */

export const useDelete = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteEmp = async url => {
    setLoading(true);
    setError(null); // Reset error state before making request
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error("Network response was not ok");
      }

      const result = await response.json(); // Parse JSON if needed
      const status = result.success ? "success" : "failed";
      setData(status); // Store the response data
      return status;
    } catch (error) {
      setError(error.message);
      setData("failed"); // Store the error message
      return "failed";
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return {deleteEmp, data, error, loading};
};
/**
 * @API_UPDATE
 */
export const useUpdate = () => {
  const [data, setData] = useState(null);

  const update = async (url, payload) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = response.json();
    setData(result);
    return result;
  };
  return {data, update};
};
