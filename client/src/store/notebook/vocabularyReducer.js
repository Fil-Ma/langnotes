import { createSlice } from "@reduxjs/toolkit";

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState: {
    nouns: {
      id: {
        name: "",
        description: "",
        gender: ""
      }
    },
    verbs: {
      id: {
        name: "",
        description: ""
      }
    },
    adjectives: {
      id: {
        name: "",
        description: "",
        gender: ""
      }
    },
    pronouns: {
      id: {
        name: "",
        description: ""
      }
    }
  },
  reducers: {},
  extraReducers: {}
});

export default vocabularySlice.reducer;
