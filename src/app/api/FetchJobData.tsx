import axios from "axios";
import { parseHTMLData } from "../components/helpers/parseHTMLDatal";

export const fetchJobData = async (url: string, page: number = 1) => {
 // console.log("API Hit")
    try {
      const response = await axios.get(`${url}?page=${page}`, {
        timeout: 10000,  // Timeout in case of a delay
      });
  
      // If the response is in HTML format
      if (response.headers['content-type'].includes('text/html')) {
        return parseHTMLData(response.data);
      }
      //console.log("API Hit")
      return response.data.jobs;
    } catch (error) {
      console.error('Error fetching job data:', error);
      throw new Error('Failed to fetch job data');
    }
  };
  