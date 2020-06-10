import http from "@/plugins/http"

export default class DistrictAPI {
  public static queryDistrictsAPI() {
    return http.post('district/queryProvinceDistricts')
  }
}
