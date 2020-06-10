import http from "@/plugins/http"

export default class DistrictAPI {
  public static queryDistrictsAPI() {
    console.log('触发了')
    return http.post('district/queryProvinceDistricts')
  }
}
