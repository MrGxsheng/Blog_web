<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <!--   背景图片   -->
      <BackGroundImage/>


      <!--   导航栏     -->
      <q-bar style="background-color: rgba(255,255,255,0.0)">
        <q-tabs indicator-color="transparent"
                style="color: rgba(255,255,255,0.5);"

        >
          <q-route-tab to="/" label="xsheng Blog"/>
          <q-route-tab to="/" label="Home"/>
          <q-route-tab to="/Resource" label="resource"/>
          <q-route-tab to="/Friend" label="friend"/>

        </q-tabs>
        <q-space/>
        <q-tabs indicator-color="transparent"
                style="color: rgba(255,255,255,0.5);">
          <q-route-tab to="/Upload" label="upload"/>
          <q-route-tab to="/login" label="quit"/>
          <q-avatar style="height: 40px;width: 40px">
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

        </q-tabs>

      </q-bar>

      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import BackGroundImage from "../components/BackGroundImage.vue";

export default {
  components: {BackGroundImage}
}
</script>

<style scoped>
q-route-tab {
  height: auto;
}
</style>
