class JsonUtil {

  /**
   * Convert Map object to JSON string
   * 
   * @param strMap Map object with string key
   * @returns JSON string
   */
  public strMapToJson = (strMap: Map<string, object>) => {
      return JSON.stringify(this.strMapToObj(strMap));
  }

  /**
   * Convert JSON string to Map object
   * 
   * @param jsonStr JSON string
   * @returns Map object
   */
  public jsonToStrMap = (jsonStr: string) => {
      return this.objToStrMap(JSON.parse(jsonStr));
  }

  private strMapToObj(strMap: Map<string, object>) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v;
    }
    return obj;
  }

  private objToStrMap(obj: any) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }
}

export default JsonUtil;
