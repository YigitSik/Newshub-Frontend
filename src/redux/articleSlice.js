import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: null,
  country: "tr",
  category: "general",
  favourites: null
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, articles) => {
      state.articles = articles.payload
    },

    setCountry: (state, country) => {
      state.country = country.payload
    },

    setCategory: (state, category) => {
      state.category = category.payload
    },

    setFavourites: (state, favourites) => {
      state.favourites = favourites.payload
    },

  },

})

// Action creators are generated for each case reducer function
export const { setArticles, setCountry, setCategory, setFavourites } = articleSlice.actions

export default articleSlice.reducer