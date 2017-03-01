let baseUrl = "http://orionstaging.railsfactory.com/api"
let headers = {"Accept": "application/json","Content-Type": "application/json"}

export function getEmployees(relativeUrl, token, pageNo) {
  let queryString = '?access_token='+token+'&page='+pageNo
  return fetch(`${baseUrl}${relativeUrl}${queryString}`,
  {headers: headers, method: "GET"})
  .then(function(response) {
    return response.json()
  }).catch((error) => console.warn("fetch error:", error))
}

export function searchEmployees(filterText, token) {
  let queryString = '?access_token='+token+'&query='+filterText
  return fetch(`${baseUrl}/admins/search_contact${queryString}`,
  {headers: headers, method: "POST"})
  .then(function(response) {
    return response.json()
  }).catch((error) => console.warn("fetch error:", error))
}

export function login(body) {
  console.log(body)
  console.log(baseUrl)
  return fetch(`${baseUrl}/admins/api_login`,
    {headers: headers, method: "POST", body: JSON.stringify(body)}
  ).then((res) => {
    console.log(res)
    return res.json()
  }).catch((error) => console.warn("fetch error:", error))
}
