<template>
  <q-dialog v-model="vis">
    <q-card>
      <q-card-section>
        <div class="text-h6">批量上传文件</div>
      </q-card-section>

      <q-separator/>

      <q-card-section style="height: auto" class="scroll">
        <div class="text-light-green-7">新增</div>
        <p/>
        <q-uploader
            label="上传文件"
            :url=baseUrl
            field-name="file"
            multiple
            with-credentials
            @uploaded="CommSuccess('上传成功')"
            @uploading="CommSuccess('正在上传')"
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
          <q-btn color="primary" label="刷新" @click="getFile"/>
          <q-btn color="secondary" label="批量上传" @click="vis = !vis"/>
          <q-btn color="deep-orange" label="删除" @click="deleteFile"/>
        </div>

        <div style="margin: auto" v-for="(fi,index) in file" :key="fi">
          <q-card class="my-card  text-red" style="background-color: rgba(100,119,205,0.5)">
            <q-card-section @click="go(index)">
              <div class="text-h6">fi.name</div>
            </q-card-section>

            <q-card-actions >
              <q-btn flat @click="copyToClipboard(fi.url)">获取链接</q-btn>
              <q-btn flat>删除</q-btn>
            </q-card-actions>
          </q-card>
        </div>


      </div>
    </div>
    <!--   右一   -->
    <div class="col-12 col-md-1"/>
  </div>

</template>

<script setup>
import {CommSuccess} from "../components/NotifyTools";
import {ref} from "vue";
import {api} from "../boot/axios";
const file = ref([])
const vis = ref(false)
const userId = ref("")
const baseUrl = ref("http://localhost:8080/file/add")
{
  userId.value = localStorage.getItem("userId")
  baseUrl.value += "/" + userId.value
  getFile()
}
// 打 gogo去喽
function go(id){
  window.location.href = "http://localhost:8080/static" + file[id].name
}

function getFile(){
  api.get("/file/all",{
    params:{
      "userId": userId.value
    }
  }).then(res => {
    file.value = res.data.data
    console.log(file.value)
    CommSuccess("获取成功")
  })
}


function deleteFile(id){
  api.delete("/file/delete",{
    params:{
      "id":id
    }
  }).then(res => {
    CommSuccess("删除成功")
  })
}

// 简单使用 复制内容到粘贴板
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

</script>

<style scoped>

</style>
