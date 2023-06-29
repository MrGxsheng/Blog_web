<template>
  <div class="row justify-center" style="max-width: 100%;">
    <!--   左一   -->
    <div class="col-12 col-md-1"/>
    <!--   中10   -->
    <div class="col-12 col-md-10" style="color: azure;">
<!--      <div class="html" v-html="page"></div>-->
      <v-md-preview :text="page"/>

    </div>
    <!--   右一   -->
    <div class="col-12 col-md-1"/>
  </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

import { createApp } from 'vue';
import VMdPreview from '@kangc/v-md-editor/lib/preview';

import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
const app = createApp(/*...*/);
VMdPreview.use(createLineNumbertPlugin());
VMdPreview.use(createCopyCodePlugin());
app.use(VMdPreview);

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
.html {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

</style>
