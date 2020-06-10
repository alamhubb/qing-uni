export default class JsonUtil {
  public static deepClone(object: object): any {
    return JSON.parse(JSON.stringify(object))
  }

  public static toJson(object: object): string {
    return JSON.stringify(object)
  }

  public static jsonParse(objJson: string): any {
    return JSON.parse(objJson)
  }

  public static consoleJson(object: object) {
    console.log(JSON.stringify(object))
  }
}
