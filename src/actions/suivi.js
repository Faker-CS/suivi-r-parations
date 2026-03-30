import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

/** **************************************
 * Suivi
 *************************************** */
export const postSuiviHash = async (hash) => {
  try {
    const payload = { hash };

    const res = await axios.post(endpoints.suivi, payload);

    return res.data;
  } catch (error) {
    console.error('Error during suivi request:', error);
    throw error;
  }
};

