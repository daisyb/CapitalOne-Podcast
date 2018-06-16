/**
 * parseQString(str) - split search string
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
 * getUrlParam(str, key) - get url param given by key
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

/* scaleLogo(url, scale) - modifies gpod scaled_logo_url to include a different 
 * scale 
 *
 * motivation - the gpod tag endpoint does not let you specify a scale_logo param
 *    however, by modifying the scaled_logo_url you can get back an image of the
 *    correct scale from gpod. This solution is temporary, however since gpod
 *    might change the structure of the scaled_logo_url in the future. 
 *    If this was a long term project I would either bite the bullet and load 
 *    in the slow full-sized logos or enter a feature/pull request to extend t
 *   the tag endpoint with to use the scale_logo param 
 *
 * url: String containing gpod scaled_logo_url
 *      e.g https://gpodder.net/logo/199/40e/40e43ebc4ddd1cc6030b45cfb12a0a722ad64555
 *
 * scale: Int containg new scale to use
 *
 * Returns: string containing a url linking to a properly scaled image
 */
export function scaleLogo(url, scale) {
  let scaled_url = url.split('/')
  scaled_url[4] = scale.toString()
  scaled_url = scaled_url.join('/')
  return scaled_url
}
