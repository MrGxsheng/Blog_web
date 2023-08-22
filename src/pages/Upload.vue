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
              ref="noteUploader"
              label="上传笔记"
              multiple
              accept=".md"
              hide-upload-btn
              :factory="uploadFn"
              @uploaded="CommSuccess('上传成功')"
              @uploading="CommSuccess('正在上传')"
          />
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup/>
          <q-btn flat label="上传" color="primary" @click="submit"/>
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
              label="上传图片"
              ref="imgUploader"
              multiple
              hide-upload-btn
              :factory="uploadImgFn"
              accept=".jpg, image/*"
              @uploaded="CommSuccess('上传成功')"
              @uploading="CommSuccess('正在上传')"
          />
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup/>
          <q-btn flat label="上传" color="primary" @click="submitImg"/>
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
            <q-btn color="primary" label="刷新" @click="getBlog"/>
            <q-btn color="secondary" label="批量上传" @click="text = !text"/>
            <q-btn color="deep-orange" label="删除" @click="deleteBlog"/>
          </div>


          <div class="q-pa-md">
            <q-table
                title="笔记"
                :rows="rows"
                :columns="columns"
                row-key="noteName"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                v-model:selected="fileArr"
                hide-bottom
            />

            <div class="q-pa-lg flex flex-center" style="padding-top: 0;">
              <q-pagination
                  v-model="currentPage"
                  :max="maxPage"
                  input
                  input-class="text-orange-10"
                  @click="getBlog"
              />
            </div>
          </div>

          <div class="q-pa-md q-gutter-sm" style="margin: auto">
            <q-btn color="primary" label="刷新" @click="getImg"/>
            <q-btn color="secondary" label="批量上传" @click="img = !img"/>
            <q-btn color="deep-orange" label="删除"/>
          </div>

          <q-card class="my-card" v-for="(img, index) in imgArr" :key="index">
            <q-img :src="img.imgPath" alt="image"></q-img>
          </q-card>

        </div>
      </div>
      <!--   右一   -->
      <div class="col-12 col-md-1"/>
    </div>
  </div>


</template>

<script setup>
import {CommSuccess} from "../components/NotifyTools";
import {ref, watch} from "vue";
import {api} from "../boot/axios";
import {BASE_URL} from "../components/models";

const baseUrl = ref(BASE_URL)
const text = ref(false)
const img = ref(false)
const fileArr = ref([])
const userId = ref("2")
const type = ref("all")
const urlFile = ref("/note/upload/")
const imgFile = ref("/image/upload/")
const imgArr = ref([])

const currentPage = ref(1)
const pageSize = ref(5)
const maxPage = ref(5)

// 前端上传器本体
const noteUploader = ref(null);
const imgUploader = ref(null);

{
  userId.value = localStorage.getItem("userId")
  urlFile.value = baseUrl.value + urlFile.value + type.value + "/" + userId.value
  imgFile.value = baseUrl.value + imgFile.value + userId.value
  getBlog()
  getImg()
}

watch(type, (newValue, oldValue) => {
  urlFile.value = urlFile.value + "/" + newValue + "/" + userId.value
})

function getSelectedString() {
  return fileArr.value.length === 0 ? '' : `${fileArr.value.length} record${fileArr.value.length > 1 ? 's' : ''} selected of ${rows.length}`
}

const columns = [
  {
    name: 'noteName',
    required: true,
    label: '笔记名称',
    align: 'left',
    field: row => row.noteName,
    format: val => `${val}`,
    sortable: true
  },
  {name: 'type', align: 'center', label: '类型', field: 'type', sortable: true},
  {name: 'updateTime', label: '更新时间', field: 'updateTime', sortable: true},
  {name: 'createTime', label: '创建时间', field: 'createTime', sortable: true},

]

const rows = ref([])

function getBlog() {
  api.get("/note/all", {
    params: {
      "userId": userId.value,
      "currentPage": currentPage.value,
      "pageSize": pageSize.value
    }
  }).then(res => {
    maxPage.value = (res.data.data.total + pageSize.value - 1) / pageSize.value;
    rows.value = res.data.data.list;
    CommSuccess("获取成功")
  })
}

async function deleteBlog() {
  console.log(1)
  console.log(fileArr.value[0].id)
  for (let i = 0; i < fileArr.value.length; i++) {
    await api.delete("/note/delete", {
      params: {
        "id": fileArr.value[i].id
      }
    })

    CommSuccess("删除成功")
    getBlog()
  }
}

function getImg() {
  api.get("/image/allImg", {
    params: {
      "userId": userId.value
    }
  }).then(res => {
    imgArr.value = res.data.data.list
    CommSuccess("获取成功")
  })
}

// 上传文件
function uploadFn(files) {
  return new Promise(resolve => {
    resolve({
      "url": BASE_URL + imgFile + userId.value, // todo Url
      "fieldName": "file"
      // "formFields": [
      //   {
      //     "name": "field",
      //     "value": field.value
      //   },
      //   {
      //     name: "createTime",
      //     value: createTime
      //   }
      // ],
      // "headers": [{
      //   "name": "Content-Type",
      //   "value": 'application/json'
      // }]
    })
  })
}

// 上传图片
function uploadImgFn(files) {
  return new Promise(resolve => {
    resolve({
      "url": BASE_URL + "/note/upload/all/" + userId.value, // todo ImgUrl
      "fieldName": "file"
    })
  })
}



// 按下上传按钮
function submit() {
  noteUploader.value.upload();
}

function submitImg() {
  ImgUploader.value.upload();
}

// 上传成功回调
// function finish(info){
//   console.log(info.xhr);
// }


</script>

<style scoped>

</style>
