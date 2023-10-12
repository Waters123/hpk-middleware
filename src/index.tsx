import React from 'react'
import ReactDOM from 'react-dom'
import {Chart, registerables} from 'chart.js'
import {App} from './app/App'
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'

Chart.register(...registerables)

ReactDOM.render(
  <MetronicI18nProvider>
    <App basename={'/'} />
  </MetronicI18nProvider>,
  document.getElementById('root')
)
