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
  dark: false,
  colors: {
    background: '#FFFFFF',    // CHANGE.
    surface: '#151516',      // CHANGE
    primary: '#811429',      // OC RED.
    secondary: '#222222',    // Darker and more subdued for secondary elements.
    selected: '#424A68',     // CHANGE.
    unselected: '#2E3348',   // CHANGE.
    button: '#4A547A',       // CHANGE.
    text: '#FAFAFA',         // CHANGE.
    subtext: '#A0A0A5',      // CHANGE.    
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