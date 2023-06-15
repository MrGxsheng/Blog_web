<template>
  <div class="row justify-center" style="max-width: 100%;">
    <!--   左一   -->
    <div class="col-12 col-md-1"/>
    <!--   中10   -->
    <div class="col-12 col-md-10" style="color: azure;">
      <div class="html" v-html="page"></div>
    </div>
    <!--   右一   -->
    <div class="col-12 col-md-1"/>
  </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

const $router = useRouter()
const page = ref("")
const title = ref("")
{
  let id = localStorage.getItem("textId")
  if (id === null) {
    $router.push("/")
  } else {
    page.value = localStorage.getItem("text");
    title.value = localStorage.getItem("title");
  }

}


</script>

<style scoped>
.img{
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

</style>
