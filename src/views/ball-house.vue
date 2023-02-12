<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { onMounted, ref } from "vue";
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

//添加球体
const geometry = new THREE.SphereGeometry(5, 32, 32);
const loader = new RGBELoader();
loader.load(
  "http://hades0512.oss-cn-beijing.aliyuncs.com/three/imgs/hdr/living.hdr",
  (dataTexture) => {
    const material = new THREE.MeshBasicMaterial({ map: dataTexture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.geometry.scale(1, 1, -1);
    scene.add(sphere);
  }
);
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
