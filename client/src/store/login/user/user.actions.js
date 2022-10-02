import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNotebook } from "../../../api/notebook";


export const addNotebook = createAsyncThunk(
  'user/addNotebook',
  async (notebook) => {
    try {
      const response = await createNotebook(notebook);

      return {
        notebook: response.notebook,
        vocabulary: response.vocabulary
      }
    } catch(err) {
      throw err;
    }
  }
);
