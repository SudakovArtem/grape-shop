<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ product.name }}</div>
      {{ (photos) }}
      <q-space/>
      <q-btn icon="close" flat round dense v-close-popup/>
    </q-card-section>
    <q-separator/>

    <q-card-section style="max-height: 70vh" class="scroll">
      <q-list>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="bunchWeight" label="Масса грозди"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="collection" label="Коллекция"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="colour" label="Цвет ягоды"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="cuttingPrice" label="Цена черенка"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="diseaseResistance" label="Устойчивость к болезням"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="freezing" label="Мороз °С"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="name" label="Название"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="photos" label="Фото"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="ripeningPeriod" label="Срок созревания"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="seedlingPrice" label="Цена саженца"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="size" label="Размер ягоды"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="taste" label="Вкус"/>
        </q-item>
        <q-item class="q-px-none">
          <q-input class="full-width" v-model="weight" label="Вес"/>
        </q-item>
        <q-item class="q-px-none">
          <q-file
            class="full-width"
            v-model="photos"
            label="Фото"
            multiple
            use-chips
          >
          </q-file>
        </q-item>
      </q-list>
    </q-card-section>

    <q-separator/>
    <q-card-actions>
      <q-btn label="Применить" @click.prevent="onSubmit"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { deleteFile, getImageFile, uploadFile } from 'src/firebase'
import { useStore } from 'vuex'
import _ from 'lodash'

export default defineComponent({
  name: 'EditForm',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const $store = useStore()
    const bunchWeight = ref(props.product.bunchWeight)
    const collection = ref(props.product.collection)
    const colour = ref(props.product.colour)
    const cuttingPrice = ref(props.product.cuttingPrice)
    const diseaseResistance = ref(props.product.diseaseResistance)
    const freezing = ref(props.product.freezing)
    const name = ref(props.product.name)
    const photos = ref([])
    const ripeningPeriod = ref(props.product.ripeningPeriod)
    const seedlingPrice = ref(props.product.seedlingPrice)
    const size = ref(props.product.size)
    const taste = ref(props.product.taste)
    const weight = ref(props.product.weight)
    onMounted(async () => {
      if (!props.product.photos) {
        return
      }
      console.log(Array.isArray(props.product.photos))

      const value = await Promise.all(props.product.photos.map(async (name) => {
        const file = await getImageFile(name)
        console.log(file)
        return file
      }))
      photos.value = value
    })

    const onSubmit = async () => {
      const photoNames = photos.value.map(photo => photo.name)
      const newPhoto = props.product.photos ? _.difference(photoNames, props.product.photos) : photoNames
      const toRemoved = props.product.photos ? _.difference(props.product.photos, photoNames) : []
      if (newPhoto.length) {
        await Promise.all(newPhoto.map((photo) => {
          const file = photos.value.find(el => el.name === photo)
          return uploadFile(file, photo)
        }))
      }
      if (toRemoved.length) {
        await Promise.all(toRemoved.map((photo) => deleteFile(photo)))
      }
      $store.commit('products/updateProduct', {
        ...props.product,
        bunchWeight: bunchWeight.value,
        collection: collection.value,
        colour: colour.value,
        cuttingPrice: cuttingPrice.value,
        diseaseResistance: diseaseResistance.value,
        freezing: freezing.value,
        name: name.value,
        photos: photoNames,
        ripeningPeriod: ripeningPeriod.value,
        seedlingPrice: seedlingPrice.value,
        size: size.value,
        taste: taste.value,
        weight: weight.value
      })
    }
    return {
      bunchWeight,
      collection,
      colour,
      cuttingPrice,
      diseaseResistance,
      freezing,
      name,
      photos,
      ripeningPeriod,
      seedlingPrice,
      size,
      taste,
      weight,
      onSubmit
    }
  }
})
</script>
