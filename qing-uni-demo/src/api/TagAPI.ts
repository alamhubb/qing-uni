import http from "@/plugins/http"

export default class TagAPI {
  public static queryTagTypesAPI() {
    return http.post('tag/queryTagTypes')
  }
}
