<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref } from "vue";
import type { Material } from "three";
//场景初始化
const scene = new THREE.Scene();

//初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//设置位置
camera.position.z = 0.1;

//添加立方体
const geometry = new THREE.BoxGeometry(10, 10, 10);
const imgArray: String[] = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];
let boxMaterials: Material[] = [];
imgArray.forEach((item) => {
  //纹理加载
  let texture = new THREE.TextureLoader().load(`./imgs/living/${item}.jpg`);
  if (item === "4_u" || item === "4_d") {
    texture.rotation = Math.PI;
    texture.center = new THREE.Vector2(0.5, 0.5);
  }
  boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
});

const cube = new THREE.Mesh(geometry, boxMaterials);
cube.geometry.scale(1, 1, -1);
scene.add(cube);
//初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const container = ref<HTMLElement | null>(null);

//添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const render = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

onMounted(() => {
  container.value?.appendChild(renderer.domElement);
  render();
});
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
}
</style>
