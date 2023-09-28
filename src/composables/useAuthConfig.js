import { isObject } from 'lodash'

export default {
  install: (app, params) => {
    if (!isObject(params)) return

    app.config.globalProperties.$domain = params.domain
    app.config.globalProperties.$apiKey = params.apiKey

    app.provide('$domain', params.domain)
    app.provide('$apiKey', params.apiKey)
  }
}
