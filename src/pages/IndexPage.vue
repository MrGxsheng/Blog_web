<template>
  <div class="q-pa-md">



    <div class="row justify-center">
      <!--   左一   -->
      <div class="col-12 col-md-1" />
      <!--   中10   -->
      <div class="col-12 col-md-10">
        <q-table
            grid
            :card-container-class="cardContainerClass"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
            v-model:pagination="pagination"
            :rows-per-page-options="rowsPerPageOptions"
        >


          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4" >
              <q-card style="background-color: rgba(255,255,255,0.5)">
                <q-card-section class="text-center">
                  Calories for
                  <br>
                  <strong>{{ props.row.name }}</strong>
                </q-card-section>
                <q-separator/>
                <q-card-section class="flex flex-center" :style="{ fontSize: props.row.calories + 'px' }">
                  <div>{{ props.row.calories }} g</div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
      <!--   右一   -->
      <div class="col-12 col-md-1" />
    </div>
  </div>
</template>

<script setup>
import {useQuasar} from 'quasar'
import {ref, computed, watch} from 'vue'

const deserts = [
  'Frozen Yogurt',
  'Ice cream sandwich',
  'Eclair',
  'Cupcake',
  'Gingerbread',
  'Jelly bean',
  'Lollipop',
  'Honeycomb',
  'Donut',
  'KitKat'

]

const rows = []

deserts.forEach(name => {
  for (let i = 0; i < 24; i++) {
    rows.push({name: name + ' (' + i + ')', calories: 20 + Math.ceil(50 * Math.random())})
  }
})

rows.sort(() => (-1 + Math.floor(3 * Math.random())))

const $q = useQuasar()

function getItemsPerPage() {
  if ($q.screen.lt.sm) {
    return 3
  }
  if ($q.screen.lt.md) {
    return 6
  }
  return 9
}

const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage()
})

watch(() => $q.screen.name, () => {
  pagination.value.rowsPerPage = getItemsPerPage()
})

const columns = [
  {name: 'name', label: 'Name', field: 'name'},
  {name: 'calories', label: 'Calories (g)', field: 'calories'}
]
const cardContainerClass = ref(computed(() => {
  let numSm = $q.screen.gt.sm;
  return $q.screen.gt.xs
      ? 'grid-masonry grid-masonry--' + numSm
      : null
}))

const rowsPerPageOptions = ref($q.screen.gt.xs
    ? $q.screen.gt.sm ? [3, 6, 9] : [3, 6]
    : [3]
)

</script>



<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1

      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1

  &--3
    > div
      &:nth-child(3n + 1)
        order: 1

      &:nth-child(3n + 2)
        order: 2

      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2


</style>
