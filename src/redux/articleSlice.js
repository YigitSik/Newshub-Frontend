import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: null,
  currentArticles: null,
  country: "tr",
  category: "general",
  favourites: null,
  splashScreen: true,
  isCardView: true
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, articles) => {
      state.articles = articles.payload
    },

    setCurrentArticles: (state, currentArticles) => {
      state.currentArticles = currentArticles.payload
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

    setSplashScreen: (state, bool) => {
      state.splashScreen = bool.payload
    },

    setIsCardView: (state, bool) => {
      state.isCardView = bool.payload
    }

  },

})

// Action creators are generated for each case reducer function
export const { setArticles, setCountry, setCategory, setFavourites, setSplashScreen, setIsCardView, setCurrentArticles } = articleSlice.actions

export default articleSlice.reducer