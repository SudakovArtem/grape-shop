// export function someMutation (/* state */) {
// }
//
// export loadProductsList = () => async () => {
//   const tasks = localStorage.getItem('tasks')
//   if (tasks) {
//     this.state.tasks = JSON.parse(tasks)
//   } else {
//     this.state.tasks = []
//   }
// }

import productService from 'src/services/product.service'

export function loadProductsList (state, products) {
  state.products = products
}

export async function updateProduct (state, payload) {
  try {
    console.log(payload)
    const { content } = await productService.update(payload)
    const index = state.products.findIndex((el) => el.id === content.id)
    state.products[index] = content
    // history.push(`/products/${content.id - 1}`);
  } catch (error) {
    console.log(error)
  }
}

// export function createNewTask(state, {name, status, deadline, description, id}) {
//   const localStorageTasks = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
//   localStorageTasks.push({name, status: status.value, deadline, description, id})
//   localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
//   this.commit('loadTasks')
// }
//
// export function changeStatus(state, {status, id}) {
//   const currentTask = this.getters.tasks.find((t) => t.id === id);
//   currentTask.status = status
//   this.commit('updateTasks')
// }
