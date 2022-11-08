import httpService from './http.service'

const productEndpoint = 'products/'

const productService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      productEndpoint + payload._id,
      payload
    )
    console.log(data)
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      productEndpoint + payload.id,
      payload
    )
    console.log(payload)
    return data
  }
}
export default productService
