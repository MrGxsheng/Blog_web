<template>
  <div class="row justify-center">
    <!--   左一   -->
    <div class="col-12 col-md-1"/>

    <!--   中5   -->
    <div class="col-12 col-md-5">
      <div class="q-pa-md row items-start q-gutter-md" v-for="friend in l_friend" :key="friend">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal  v-ripple="{early : 'true'}">
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
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
            </q-card-section>
          </q-card-section>
          <q-separator/>

          <q-card-actions>
            <q-btn flat color="red">
              删除
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>


    <!--   中5   -->
    <div class="col-12 col-md-5">
      <div class="q-pa-md row items-start q-gutter-md" v-for="friend in l_friend" :key="friend">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal  v-ripple="{early : 'true'}">
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
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
            </q-card-section>
          </q-card-section>
          <q-separator/>

          <q-card-actions>
            <q-btn flat color="red">
              删除
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import {api} from "../boot/axios";
import {ref} from "vue";

const l_friend = ref([])
const r_friend = ref([])
const userId = ref(localStorage.getItem("userId"));
function getFriend(){
  api.get("/friend/all",{
    params:{
      "userId" : userId.value
    }
  }).then(res => {
    let tem = [];
    tem = res.data.data;
    for(let i = 0 ; i < tem.length ; i++){
      if(i & 1) l_friend.value.push(tem[i]);
      else r_friend.value.push(tem[i]);
    }
  })
}

{
  getFriend()
}


</script>

<style scoped>

</style>
