<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-btn label="btn" @click="handler"/>
      <q-list>
        <q-item-label
          header
        >
          Фильтр
        </q-item-label>
        <q-item>
          <q-item-section>
            <q-select v-model="taste" :options="options.taste" label="Вкус"/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select v-model="colour" :options="options.colour" label="Цвет ягоды"/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select v-model="ripeningPeriod" :options="options.ripeningPeriod" label="Срок созревания"/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select v-model="weight" :options="options.weight" label="Масса грозди"/>
          </q-item-section>
        </q-item>
        <q-item class="column">
          <q-item-section class="full-width">
            <q-item-label>Цена черенка</q-item-label>
          </q-item-section>
          <q-item-section class="full-width">
            <q-range
              v-model="step"
              :min="0"
              :max="45"
              :step="5"
              label
            />
          </q-item-section>
        </q-item>
        <q-item class="column">
          <q-item-section class="full-width">
            <q-item-label>Цена саженца</q-item-label>
          </q-item-section>
          <q-item-section class="full-width">
            <q-range
              v-model="step"
              :min="0"
              :max="45"
              :step="5"
              label
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const $store = useStore()
    const leftDrawerOpen = ref(false)

    const handler = () => {
      const opt = $store.getters['products/getProductsColour']
      console.log(opt)
    }

    const options = computed(() => {
      const obj = $store.getters['products/getProductsColour']
      if (!obj) {
        return {}
      }
      return obj
    })

    return {
      options,
      colour: ref(null),
      taste: ref(null),
      weight: ref(null),
      ripeningPeriod: ref(null),
      step: ref({
        min: 10,
        max: 20
      }),
      // tasteOptions: ref(options.value ? options.value.taste : []),
      // colourOptions: ref(options.value ? options.value.colour : []),
      // periodOptions: ref(options.value ? options.value.ripeningPeriod : []),
      // weightOptions: ref(options.value ? options.value.weight : []),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handler
    }
  }
})
</script>
