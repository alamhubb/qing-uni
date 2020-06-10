import Request, {config, requestConfig, response} from './request'

const http: Request = new Request()
http.setConfig((config: config) => { /* 设置全局配置 */
  config.baseUrl = process.env.VUE_APP_BASE /* 根域名不同 */
  return config
})
http.interceptor.request((config: requestConfig, cancel: Function) => { /* 请求之前拦截器 */
  return config
})

http.interceptor.response(
  response => {
    return response.data
  },
  error => {
    return error
  }
)
export default http




