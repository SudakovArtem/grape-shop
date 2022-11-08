<template>
  <q-carousel
    animated
    v-model="slide"
    v-if="images.length"
    height="200px"
    arrows
    navigation
  >
    <q-carousel-slide v-for="(image, idx) in images" :key="image" :name="idx" :img-src="image" />
  </q-carousel>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getImageUrl } from 'src/firebase'

export default {
  props: {
    names: {
      // type: Array,
      required: true
    }
  },
  setup: (props) => {
    const images = ref([])
    onMounted(async () => {
      if (!props.names) {
        return
      }
      const value = await Promise.all(props.names.map(async (name) => {
        const { src } = await getImageUrl(name)
        return src
      }))
      images.value = value
    })
    return {
      images,
      slide: ref(0)
    }
  }
}
</script>
