/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const customTheme = {
  dark: true,
  colors: {
    background: '#0E0E0F',   // Almost black, for a sleek and minimal appearance.
    surface: '#151516',      // Slightly lighter for panels and cards.
    primary: '#212538',      // Deep, muted navy for primary elements.
    secondary: '#2E3348',    // Darker and more subdued for secondary elements.
    selected: '#424A68',     // Brighter than primary but more distinct from secondary.
    unselected: '#2E3348',   // Blends seamlessly with secondary while remaining lighter than selected.
    button: '#4A547A',       // Noticeable yet muted for actions.
    text: '#FAFAFA',         // Close to pure white for high readability on dark backgrounds.
    subtext: '#A0A0A5',      // Softer, slightly muted grey for secondary text.    
  },
}


export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})
