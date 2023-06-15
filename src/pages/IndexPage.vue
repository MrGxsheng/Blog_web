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
            row-key="noteName"
            :filter="filter"
            hide-header
            v-model:pagination="pagination"
            :rows-per-page-options="rowsPerPageOptions"
        >


          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card style="background-color: rgba(255,255,255,0.5)">
                <q-card-section class="text-center" @click="queryBlog(props.row)">
                  <div class="text-h5"><strong>{{ props.row.noteName }}</strong> </div>
                  <br>
                  <strong>上次更新  {{  props.row.updateTime }}</strong>
                  <br>
                  <strong>创建时间  {{  props.row.createTime }}</strong>
                </q-card-section>
                <q-separator/>
                <q-card-section class="flex flex-center" :style="{ fontSize: 20 + Math.ceil(50 * Math.random()) + 'px' }">
                  <div> 这里要放点什么啊  </div>
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
import {api} from "../boot/axios";
import {useRouter} from "vue-router";

const $router = useRouter()

// 下面这一依托是瀑布流 没看懂不会改


const rows = ref([])



const $q = useQuasar()
const userId= ref("1")
const type = ref("all")

function getItemsPerPage() {
return 2

}

const pagination = ref({
  page: 1,
  rowsPerPage: rows.value.length
})

watch(() => $q.screen.name, () => {
  pagination.value.rowsPerPage = getItemsPerPage()
})

const columns = [
  {name: 'noteName', label: 'noteName', field: 'noteName'},
  {name: 'updateTime', label: 'updateTime', field: 'updateTime'},
  {name: 'createTime', label: 'createTime', field: 'createTime'}
]


const cardContainerClass = ref(computed(() => {
  return $q.screen.gt.xs
      ? 'grid-masonry grid-masonry--' +  ($q.screen.gt.sm ? '3' : '2')
      : null
}))

const rowsPerPageOptions = ref($q.screen.gt.xs
    ? $q.screen.gt.sm ? [3,6] : [3,6,9]
    : [3]
)

{

  userId.value = localStorage.getItem("userId")
  getBlog()
  // const len = rows.value.length / 3
  // change.style.setProperty('--height',change ? len + 'px' : len + 'px');
}

function getBlog(){
  api.get("/note/blog",{
    params:{
      "userId": userId.value,
      "type": type.value
    }
  }).then(res => {
    console.log(res.data.data)
    rows.value = res.data.data;
  })
}
rows.value.sort(() => (-1 + Math.floor(3 * Math.random())))


function queryBlog(props){
  localStorage.setItem("text",props.noteText)
  localStorage.setItem("textId",props.id)
  localStorage.setItem("title",props.noteName)
  $router.push("/blog")
}

//todo 动态修改height
</script>



<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 10000px

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
