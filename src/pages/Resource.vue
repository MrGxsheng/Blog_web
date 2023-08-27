<template>

  <q-dialog v-model="name">
    <q-card style="width: 500px">
      <q-card-section>
        <div class="text-h6">重命名</div>
      </q-card-section>

      <q-separator/>

      <q-input v-model="newName"  style="margin-left: auto" label="name" />

      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" v-close-popup/>
        <q-btn flat label="完成" color="primary" @click="reName"/>
      </q-card-actions>
    </q-card>
  </q-dialog>


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
            ref="uploader"
            label="上传文件"
            multiple
            :factory="uploadFileFn"
            hide-upload-btn
            @uploaded="CommSuccess('上传成功');"
            @finish="getFile"
            @uploading="CommSuccess('正在上传')"
        />
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" v-close-popup/>
        <q-btn flat label="上传" color="primary"  @click="submit"/>
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
              <div class="text-h6">{{ fi.name }}</div>
            </q-card-section>

            <q-card-actions>
              <q-btn flat @click="onClipText(fi.url)">获取链接</q-btn>
              <q-btn flat @click="name = !name ; newId = fi.id">重命名</q-btn>
              <q-btn flat @click="openFile(fi.url)">下载</q-btn>
              <q-btn flat @click="deleteFile(fi.id)">删除</q-btn>
            </q-card-actions>
          </q-card>
          <br>
        </div>


      </div>
    </div>
    <!--   右一   -->
    <div class="col-12 col-md-1"/>
  </div>

</template>

<script setup>
import {CommFail, CommSuccess} from "../components/NotifyTools";
import {ref} from "vue";
import {api} from "../boot/axios";
import {BASE_URL} from "../components/models";

const file = ref([])
const vis = ref(false)
const userId = ref("")
const baseUrl = ref(BASE_URL + "/file/add")
const name = ref(false)

// 重命名
const newName = ref("")
const newId = ref("")

// 前端上传器本体
const uploader = ref(null);

{
  userId.value = localStorage.getItem("userId")
  baseUrl.value += "/" + userId.value
  getFile()
}

//重命名
function reName() {
  console.log(newId.value);
  api.put(BASE_URL + "/file/updateName",null,{
    params:{
      "FileId": newId.value,
      "name": newName.value
    }
  }).then(res => {
    CommSuccess("命名成功")
    getFile()
    newName.value = ""
  })

}

// 打 gogo去喽
function go(id) {
  window.location.href = BASE_URL + "/static" + file[id].name
}

function getFile() {
  api.get("/file/all", {
    params: {
      "userId": userId.value
    }
  }).then(res => {
    file.value = res.data.data
    console.log(file.value)
    CommSuccess("获取成功")
  })
}

// 删除文件
function deleteFile(id) {
  api.delete("/file/delete", {
    params: {
      "id": id
    }
  }).then(res => {
    CommSuccess("删除成功")
    getFile()
  })
}

// 简单使用 复制内容到粘贴板
const onClipText = (text) => {
  handleCopyValue(text)
      .then(() => {
        CommSuccess("复制成功");
      })
      .catch(() => {
        CommFail("自动复制失败");
      });
};

const handleCopyValue = (text) => {
  //浏览器禁用了非安全域的 navigator.clipboard 对象
  //在线上环境会报错 TypeError: Cannot read properties of undefined (reading 'writeText')
  if (!navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // 判断是否支持拷贝
    if (!document.execCommand("copy")) return Promise.reject();
    // 创建标签，并隐藏
    const textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = textArea.style.left = "-100vh";
    textArea.style.opacity = "0";
    textArea.value = text;
    document.body.appendChild(textArea);
    // 聚焦、复制
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      // 不知为何，必须写这个三目，不然copy不上
      document.execCommand("copy") ? resolve() : reject();
      textArea.remove();
    });
  }
};


// 上传文件
function uploadFileFn(files) {
  return new Promise(resolve => {
    resolve({
      "url": BASE_URL + "/file/add/" + userId.value, // todo ImgUrl
      "fieldName": "file",
      "headers": [
        {
          name: 'token',
          value: localStorage.getItem("token")
        }
      ]
    })
  })
}

// 按下上传按钮
function submit() {
  uploader.value.upload();
}

function openFile(url){
  window.open(url)
}

</script>

<style scoped>

</style>
