import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: null,
  country: "tr",
  category: "general",
  query:""
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state,articles) => {
      state.articles = articles.payload
    },

    setCountry: (state,country) => {

        state.country = country.payload
    },

    setCategory: (state,category) => {
        state.category = category.payload
    },


  },

})

// Action creators are generated for each case reducer function
export const { setArticles, setCountry, setCategory } = articleSlice.actions

export default articleSlice.reducer