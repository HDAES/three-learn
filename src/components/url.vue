<template>
  <div class="urls">
    <router-link to="/3d-house">3D看房</router-link>
    <router-link to="/ball-house">球形看房</router-link>
    <router-link to="/">小岛</router-link>
    <router-link to="/crystal">水晶小熊</router-link>
    <router-link to="/porsche">保时捷</router-link>
    <router-link to="/robotics">机器人</router-link>
  </div>
</template>
<style>
.urls {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  background-color: rgba(255, 255, 255, 0.7);
}
a {
  padding: 2px 0;
}
</style>
