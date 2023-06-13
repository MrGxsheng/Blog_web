<template>
  <div class="q-pa-md">


    <q-dialog v-model="text">
      <q-card>
        <q-card-section>
          <div class="text-h6">批量上传笔记</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="height: auto" class="scroll">
          <div class="text-light-green-7">新增修改一体</div>
          <p/>
          <q-uploader
              label="上传文件"
              field-name="file"
              url="note"
              multiple
              batch
              with-credentials
              accept=".md"
              @rejected="CommFail('格式错误，只接受md格式')"

          />
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup/>
          <q-btn flat label="上传" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="img">
      <q-card>
        <q-card-section>
          <div class="text-h6">批量上传图片</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="height: auto" class="scroll">
          <div class="text-light-green-7">新增修改一体</div>
          <q-uploader
              style="max-width: 300px;"
              url="img"
              label="上传图片"
              multiple
              accept=".jpg, image/*"
              @rejected="CommFail('格式错误，只接收图片')"
          />
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup/>
          <q-btn flat label="上传" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row justify-center">
      <!--   左一   -->
      <div class="col-12 col-md-1"/>
      <!--   中10   -->
      <div class="col-12 col-md-10">

        <div style="margin: auto">
          <div class="q-pa-md q-gutter-sm" style="margin: auto">
            <q-btn color="primary" label="刷新"/>
            <q-btn color="secondary" label="批量上传" @click="text = !text"/>
            <q-btn color="deep-orange" label="删除"/>
          </div>


          <div class="q-pa-md">
            <q-table
                title="Treats"
                :rows="rows"
                :columns="columns"
                row-key="name"
                selection="single"
                v-model:selected="selected"
            />
          </div>

          <div class="q-pa-md q-gutter-sm" style="margin: auto">
            <q-btn color="primary" label="刷新"/>
            <q-btn color="secondary" label="批量上传" @click="img = !img"/>
            <q-btn color="deep-orange" label="删除"/>
          </div>

          <div className="q-pa-md">
            <q-table
                :rows="rows"
                :columns="columns"
                row-key="name"
                selection="single"
                v-model:selected="selected"
            />
          </div>
        </div>
      </div>
      <!--   右一   -->
      <div class="col-12 col-md-1"/>
    </div>
  </div>


</template>

<script setup>
import {CommFail} from "../components/NotifyTools";
import {ref} from "vue";

const text = ref(false);
const img = ref(false)

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
  {name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true},
  {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
  {name: 'protein', label: 'Protein (g)', field: 'protein'},
  {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
  },
  {name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)}
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]


</script>

<style scoped>

</style>
