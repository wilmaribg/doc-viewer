export default (domain, apiKey) => {
  const getTemplate = async (keyname) => {
    if (!keyname) throw new Error('keyname not defined')
    const url = `${domain}/v2/template/${keyname}`
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer: ${apiKey}`
      }
    })
    return await response.json()
  }

  return {
    domain,
    apiKey,
    getTemplate
  }
}
