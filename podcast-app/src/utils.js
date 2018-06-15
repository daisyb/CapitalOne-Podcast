/**
 * parseQString(str)
 *
 * str: String containing url parameters to parse, 
        should be in the format ?key1=val1&key2=val2...
 *      the same format as location.search in the react-routor lib
 *
 * Returns: A list of lists containing key value pairs
 *          e.g. [[key1, val1], [key2, val2]]
 */
export function parseQString(str) {
  let params = str.slice(1).split('&')
  params = params.map(param => param.split('='))
  return params
}

/**
 * getUrlParam(str)
 *
 * str: String containing url parameters to parse, 
        should be in the format ?key1=val1&key2=val2...
 *      the same format as location.search in the react-routor lib
 * key: String containing name of desired param
 *
 * Returns: String containing desired param or null if it does not exist
 *          e.g.> getUrlParam("?key1=val1&key2=val2","key1")
 *              > "val1" 
 */
export function getUrlParam(str, key) {
  const params = parseQString(str)
  const result = params.find(el => el[0] === key)
  return result ? result[1] : ''
}
