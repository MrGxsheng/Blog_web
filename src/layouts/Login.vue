<template>
  <Image/>

  <!--  下面是登录窗口-->
  <div class="q-pa-md">
    <div class="column justify-center" style="height: 90vh;">
      <div class="col-auto row justify-center">
        <q-card class="col-auto shadow-10" style="background-color: rgb(255,255,255);padding: 50px;width: 400px">

          <q-card-section class="row justify-between">
            <strong>{{ pageTitle }}</strong>
            <q-btn icon="close" dense rounded flat to="/"/>
          </q-card-section>
          <q-card-section>
            <q-input
                v-model="accountR"
                ref="accountRef"
                rounded
                label="用户名"
                :lazy-rules="true"
                :rules="[(val) => (val.length > 0) || '输入值为空']"
                @keyup.enter="usernameHandler"
            />
          </q-card-section>

          <q-card-section>
            <q-input
                v-model="passwordR"
                type="password"
                ref="passwordRef"
                rounded
                label="密码"
                :lazy-rules="true"
                :rules="[(val) => (val && val.length > 0) || '输入值为空']"
                @keyup.enter="passwordHandler"
            />
          </q-card-section>
          <q-slide-transition>
            <q-card-section v-if="registerR">
              <q-input
                  v-model="conformR"
                  type="password"
                  ref="passwordConformRef"
                  rounded
                  label="确认密码"
                  :lazy-rules="true"
                  :rules="[(val) => (val && val === passwordR && val.length > 0) || '两次输入的密码不一致']"
                  @keyup.enter="passwordConformHandler"
              />
            </q-card-section>
          </q-slide-transition>

          <q-card-section>
            <q-btn-group>
              <q-btn @click="registerR = !registerR;switchLabel()" color="secondary" :label="first"/>
              <q-btn @click="handlerLogin" color="primary" style="width: 205px;" :label="second"/>
            </q-btn-group>
          </q-card-section>

        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import Image from "../components/BackGroundImage.vue";
import {ref} from "vue";
import {api} from "../boot/axios";
import {CommFail, CommSuccess} from "../components/NotifyTools";
import {useRouter} from 'vue-router'

const $router = useRouter()

const pageTitle = ref("登录")
const accountR = ref("")
const accountRef = ref(null)
const passwordR = ref("")
const passwordRef = ref(null)
const conformR = ref("")
const passwordConformRef = ref(null)


const first = ref("注册");
const second = ref("登录");
// 注册控制
const registerR = ref(false)

// focus
// 用户名控制
function usernameHandler() {
  passwordRef.value.focus();
}

// 密码控制
function passwordHandler() {
  if (registerR.value) {
    passwordConformRef.value.focus();
  } else {
    handlerLogin();
  }
}

function passwordConformHandler() {
  handlerLogin()
}




// 重置输入框
function clearAll() {
  accountR.value = "";
  passwordR.value = "";
  conformR.value = "";
}

// 登录和注册切换
function switchLabel() {
  const temp = first.value;
  first.value = second.value;
  second.value = temp;
  passwordR.value = "";
  conformR.value = "";
}

// 点击右侧 登录/注册 按钮
// todo 登写后端在过来写
function handlerLogin() {
  localStorage.clear();
  if (second.value === '登录' && loginRule()) { // 登录
    api.post("/user/login", {
      "account": accountR.value,
      "password": passwordR.value
    }).then(res => {
      if (res.data.code === "200") {
        setUserInfo(res.data);
        CommSuccess("登录成功");
      }
    })
  } else if (second.value === '注册' && regRule()) { // 注册
    register(accountR.value);
  }
}

// 注册
async function register(val) {
  const nameE = await api.get("/user", {
    params: {
      "account": val
    }
  }).then(res => {
    return res.data.data;
  });

  if (!nameE) {
    await api.post("/user/reg", {
      "account": accountR.value,
      "password": passwordR.value
    }).then(res => {
      setUserInfo(res.data);
      CommSuccess("注册成功");
    })
  } else {
    clearAll();
    CommFail("用户名已被占用");
  }
}

// 登录请求限制
function loginRule() {
  return !(accountR.value === '' || passwordR.value === '');
}

// 注册请求限制
function regRule() {
  return (loginRule() && passwordR.value === conformR.value);
}

// 从本地获取用户基本信息
function setUserInfo(data) {
  console.log(data.data)
  // localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.data.username);
  localStorage.setItem("avatar", data.data.avatar);
  localStorage.setItem("userId", data.data.id);
  $router.push("/");
}

{
  localStorage.clear()
}

</script>

<style scoped>

</style>
