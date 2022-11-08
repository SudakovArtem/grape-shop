export function getProducts (state) {
  return state.products
}

export function getProductsColour (state) {
  if (!state.products.length) {
    return null
  }
  const options = {}
  state.products.forEach(product => {
    for (const productKey in product) {
      if (!options[productKey]) {
        options[productKey] = []
      }
      if (product[productKey] && productKey !== 'photos') {
        if (!options[productKey].includes(product[productKey])) {
          options[productKey].push(product[productKey])
        }
      }
    }
  })
  return options
}

// export const getTaskById = (state) => (id) => {
//   return state.tasks.find((t) => t.id === id)
// }
//
// export function getActiveTasks(state) {
//   return state.tasks.filter((task) => {
//     return task.status.text === 'Активен'
//   })
// }
