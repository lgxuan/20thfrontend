<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {reactive} from "vue";
import router from "@/router";
const testData = reactive({
  test: ''
})
</script>

<template>

  <RouterView />
</template>

<style>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
$--color-primary: #007aff;

</style>
