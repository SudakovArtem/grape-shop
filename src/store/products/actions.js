import productService from 'src/services/product.service'

export async function loadProducts ({ commit }) {
  try {
    const { content } = await productService.get()
    commit('loadProductsList', content)
  } catch (error) {
    this.state.products = []
    console.log('error')
  }
}
