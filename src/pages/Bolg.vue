<template>
  <div class="q-pa-md q-gutter-sm">
    <!--   博客    -->
    <q-card class="shadow-10 q-ma-lg blog-container">
      <q-card-section style="font-size: 2em">
        {{ noteName }}
      </q-card-section>
      <q-img :src=imgPath style="margin-bottom: 66px;"/>

      <v-md-preview :text="page"/>

    </q-card>
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
const noteName = ref(localStorage.getItem("noteName"))
const imgPath = ref(localStorage.getItem("imgPath"))
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

._h {
  font-weight: bold;
  border-bottom: solid rgba(255, 255, 255, .6) 1px;
  line-height: 1.2;
}

.blog-h1 {
  font-size: 2.3em;
}

.blog-h2 {
  font-size: 2.2em;
}

.blog-h3 {
  font-size: 2.1em;
}

.blog-h4 {
  font-size: 2.0em;
}

.blog-h5 {
  font-size: 1.9em;
}

.blog-h6 {
  font-size: 1.8em;
}

.code-field {
  background-color: rgba(255, 255, 255, .29);
}

.blog-container {
  overflow: hidden;
  /*position: absolute;*/
  /*left: 350px;*/
  /*width: 50%;*/
  padding-bottom: 30px;
  background-color: rgba(255, 255, 255, .3);
}

.barBtn {
  margin-right: 3%;
  min-width: 100px;
}

.a {
  transition: .35s ease-in-out;
}

.a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ec85a7;
}

a {
  text-decoration: none;
  color: #1D1D1D;
}

.img-to-big {
  transition: .35s ease-in-out;
}

.img-to-big:hover {
  transform: scale(1.2);
}

.blog-link {
  text-decoration: none;
  font-size: 1.6em;
  color: #0380f6;
  transition: .25s ease-in-out;
}

.blog-link:hover {
  color: #ec85a7;
  background-color: rgba(255, 255, 255, .1);
}

/*引用*/
._cite {
  border-left: 4px solid #f19ab8;
  padding: 0 15px;
  color: #ec85a7;
  background-color: rgba(255, 255, 255, 0.66);
  line-height: 2;
}

._base {
  margin: 10px 10px 3px;
  width: 98%;
}
</style>
