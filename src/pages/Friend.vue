<template>
  <q-dialog v-model="add">
    <q-card>
      <q-card-section>
        <div class="text-h6">添加Friend</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md">
          <div class="q-gutter-md" style="width: 500px">
            <q-input filled v-model="name" label="name"/>
            <q-input filled v-model="description" label="description"/>
            <q-file filled v-model="avatar" accept=".png,.jpg,image/*" label="avatar"/>
            <q-input filled v-model="urlR" label="链接地址"/>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup @click="addFriend"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="upda">
    <q-card>
      <q-card-section>
        <div class="text-h6">修改Friend</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md">
          <div class="q-gutter-md" style="width: 500px">
            <q-input filled v-model="name" label="name"/>
            <q-input filled v-model="description" label="description"/>
            <q-file filled v-model="avatar" accept=".png,.jpg,image/*" label="avatar"/>
            <q-input filled v-model="urlR" label="链接地址"/>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup @click="updateFriend()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div class="row justify-center" style="margin-top: 55px">

    <!--   左一   -->
    <div class="col-12 col-md-1">
      <q-btn color="red" icon-right="send" label="这里添加" @click="add = !add"/>
    </div>
    <!--       中5-->
    <div class="col-12 col-md-5">
      <div style="margin: auto;">
        <div class="q-pa-md  items-start q-gutter-md">
          <q-card class="my-card" flat bordered v-for="friend in l_friend" :key="friend">
            <q-card-section horizontal v-ripple="{early : 'true'}" @click="jump(friend.url)">
              <q-card-section class="q-pt-xs">
                <div class="text-overline">{{ friend.name }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">简介</div>
                <div class="text-caption text-grey">
                  {{ friend.description }}
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-img
                    class="rounded-borders"
                    :src=friend.avatar
                    style="max-height: 150px"
                />
              </q-card-section>
            </q-card-section>
            <q-separator/>

            <q-card-actions>
              <q-btn flat color="red" @click="deleteFriend(friend.id)">
                删除
              </q-btn>
              <q-btn flat color="red" @click="init(friend.id,friend.name,friend.description,friend.avatar,friend.url);upda= !upda">
                修改
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!--   中5   -->
    <div class="col-12 col-md-5">
      <div class="q-pa-md  items-start q-gutter-md" v-for="(friend,index) in r_friend" :key="friend"
           style="max-height: 300px">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal v-ripple="{early : 'true'}" @click="jump(friend.url)">
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ friend.name }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">简介</div>
              <div class="text-caption text-grey">
                {{ friend.description }}
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center" style="text-align: right">
              <q-img
                  class="rounded-borders"
                  :src=friend.avatar
                  style="max-height: 150px;"
              />
            </q-card-section>
          </q-card-section>
          <q-separator/>

          <q-card-actions>
            <q-btn flat color="red" @click="deleteFriend(friend.id)">
              删除
            </q-btn>
            <q-btn flat color="red" @click="init(friend.id,friend.name,friend.description,friend.avatar,friend.url);upda= !upda">
              修改
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!--    &lt;!&ndash;   右一   &ndash;&gt;-->
    <!--    <div class="col-12 col-md-1">-->

    <!--    </div>-->
  </div>
</template>

<script setup>
import {api} from "../boot/axios";
import {ref} from "vue";
import {CommSuccess} from "../components/NotifyTools";

const add = ref(false)
const upda = ref(false)

const l_friend = ref([])
const r_friend = ref([])
const userId = ref(localStorage.getItem("userId"));

const name = ref("")
const description = ref("")
const avatar = ref(null)
const urlR = ref("")
const friendId = ref()

function jump(url) {
  window.location.href = url
}

function init(id,nameR,descriptionR,avatarR,urlRR){
  friendId.value = id
  name.value = nameR
  description.value = descriptionR
  avatar.value = avatarR
  urlR.value = urlRR
}

function updateFriend() {

  let formData = new FormData();
  formData.append("friendId", friendId.value);
  formData.append("name", name.value);
  formData.append("userId", userId.value);
  formData.append("description", description.value);
  formData.append("url", urlR.value);
  formData.append("avatar", avatar.value); // assuming avatar is a file input element

  api.put("/friend/update", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    CommSuccess("修改成功喽");
    clearUpdate()
    clear()
    getFriend()
  })
}

function addFriend() {
  let formData = new FormData();
  formData.append("name", name.value);
  formData.append("userId", userId.value);
  formData.append("description", description.value);
  formData.append("url", urlR.value);
  formData.append("avatar", avatar.value); // assuming avatar is a file input element
  console.log(avatar.value)
  api.post("/friend/add", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    CommSuccess("成功喽")
    clear()
    getFriend()
  })
}


function getFriend() {
  api.get("/friend/all", {
    params: {
      "userId": userId.value
    }
  }).then(res => {
    let tem = [];
    tem = res.data.data;
    for (let i = 0; i < tem.length; i++) {
      if (i & 1) r_friend.value.push(tem[i]);
      else l_friend.value.push(tem[i]);
    }
  })
}

function deleteFriend(id) {
  api.delete("/friend/delete", {
    params: {
      "userId": userId.value,
      "friendId": id,
    }
  }).then(res => {
    CommSuccess("删除成功喽")
    clear()
    getFriend()
  })
}

function clear() {
  l_friend.value = []
  r_friend.value = []

}

function clearUpdate() {
  friendId.value = null
  name.value = ""
  description.value = ""
  avatar.value = null
  urlR.value = ""
}

{
  getFriend()
  userId.value = localStorage.getItem("userId")
  console.log(l_friend.value)
  console.log(r_friend.value)
}


</script>

<style scoped>

</style>
