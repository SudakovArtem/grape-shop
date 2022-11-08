<template>
  <q-page class="q-pa-md">
    <div class="row q-gutter-md">
      <q-card class="my-card col-3 col-grow" v-for="card in productsCrop" :key="card.id">
        <q-card-section>
          <span class="text-h5">{{ card.name }}</span>
        </q-card-section>
        <product-image :names="card.photos"></product-image>
          <q-list dense padding>
            <q-item>
              <q-item-section>
                Вкус:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.taste}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Мороз °С:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.freezing}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Масса грозди:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.bunchWeight}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Срок созревания:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.ripeningPeriod}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Цвет ягоды:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.colour}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Вес ягоды:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.weight}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Размер ягоды:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.size}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Цена черенка:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.cuttingPrice}}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                Цена саженца:
              </q-item-section>
              <q-item-section class="text-right">
                {{card.seedlingPrice}}
              </q-item-section>
            </q-item>
          </q-list>
        <q-card-actions>
          <q-btn icon="settings" color="indigo" text-color="white" @click="settingButtonClickHandler(card)"/>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-if="products.length"
        v-model="current"
        :max="Math.ceil(products.length / 12)"
      />
    </div>
  </q-page>
  <q-dialog v-model="editPopupOpen">
    <edit-form :product="currentCard"/>
  </q-dialog>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import ProductImage from 'components/ProductImage'
import { paginate } from 'src/utils/paginate'
import EditForm from 'components/EditForm'

export default defineComponent({
  name: 'IndexPage',
  components: { EditForm, ProductImage },
  setup () {
    const $store = useStore()
    const current = ref(1)
    const editPopupOpen = ref(false)
    const currentCard = ref({})

    const products = computed(() => $store.getters['products/getProducts'])
    const productsCrop = computed(() => paginate(products.value, current.value, 12))
    const settingButtonClickHandler = (card) => {
      currentCard.value = card
      editPopupOpen.value = true
    }
    onMounted(() => {
      $store.dispatch('products/loadProducts')
    })
    return {
      products,
      productsCrop,
      current,
      editPopupOpen,
      currentCard,
      settingButtonClickHandler
    }
  }
})
</script>
