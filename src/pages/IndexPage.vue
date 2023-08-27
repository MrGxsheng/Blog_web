<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col my-animation q-ma-lg-sm ">
        <q-card class="my-card q-ma-lg shadow-box shadow-24 cursor-pointer overflow-hidden" v-for="item in leftNote"
                :key="item" @click="queryBlog(item)">
          <q-img class="leftNote  full-width " :src=item.reducePath style="height: 200px"/>
          <q-card-section>
            <div class="text-h5 ">{{ item.noteName }}</div>
            <div class="text-subtitle1" style="float: left">by {{ username }}</div>
            <div class="text-subtitle1 " style="float: right">更新时间：{{ item.updateTime }}</div>
          </q-card-section>

        </q-card>
      </div>

      <div class="col">
        <q-card class="my-card q-ma-lg shadow-box shadow-24 cursor-pointer overflow-hidden " v-for="item in centerNote"
                :key="item" @click="queryBlog(item)">
          <q-img class="centerNote" :src=item.reducePath style="height: 200px"/>
          <q-card-section>
            <div class="text-h6">{{ item.noteName }}</div>
            <div class="text-subtitle1" style="float: left">by {{ username }}</div>
            <div class="text-subtitle1 " style="float: right">更新时间：{{ item.updateTime }}</div>

          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <q-card class="my-card q-ma-lg shadow-box shadow-24 cursor-pointer overflow-hidden " v-for="item in rightNote"
                :key="item" @click="queryBlog(item)">
          <q-img class="rightNote" :src=item.reducePath style="height: 200px"/>
          <q-card-section>
            <div class="text-h6">{{ item.noteName }}</div>
            <div class="text-subtitle1" style="float: left">by {{ username }}</div>
            <div class="text-subtitle1 " style="float: right">更新时间：{{ item.updateTime }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import {api} from "../boot/axios";
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {CommSuccess} from "../components/NotifyTools";

const $router = useRouter()

const userId = ref(1);
const username = ref(localStorage.getItem("username"));
const leftNote = ref([])
const rightNote = ref([])
const centerNote = ref([])
const type = ref("all")

{
  userId.value = localStorage.getItem("userId")
  getShowBlog()
}


//
function getShowBlog() {
  api.get("/note/showBlog", {
    params: {
      "userId": userId.value,
      "type": type.value
    },
  }).then(res => {
    let list = []
    list = res.data.data;
    for (let i = 0; i < list.length; i++) {
      list[i].reducePath || (list[i].reducePath = list[i].imgPath)
      console.log(list[i]);
      if (i % 3 === 0) {
        leftNote.value.push(list[i])
      } else if (i % 3 === 1) {
        centerNote.value.push(list[i])
      } else {
        rightNote.value.push(list[i])
      }
    }
    CommSuccess("获取成功")
  })
}


// 点击查看博客
function queryBlog(props) {
  localStorage.setItem("text", props.noteText)
  localStorage.setItem("noteName",props.noteName)
  localStorage.setItem("imgPath",props.imgPath)
  localStorage.setItem("textId", props.id)
  $router.push("/blog")
}

</script>

<style scoped>

.leftNote {
  transition: transform .35s cubic-bezier(0.6, -1.23, 0.36, 2.4)
}

.rightNote {
  transition: transform .35s cubic-bezier(0.6, -1.23, 0.36, 2.4)
}

.centerNote {
  transition: transform .35s cubic-bezier(0.6, -1.23, 0.36, 2.4)
}

.rightNote:hover {
  transform: scale(1.05);
}

.centerNote:hover {
  transform: scale(1.05);
}


.leftNote:hover {
  transform: scale(1.05);
}


</style>
