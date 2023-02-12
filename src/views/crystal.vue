<template>
  <div class="container" ref="container"></div>
  <Urls />
</template>

<script setup lang="ts">
import Urls from "@/components/url.vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Water } from "three/examples/jsm/objects/Water2";
// 导入gltf载入库
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//导入解压库
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { onMounted, ref, onUnmounted } from "vue";
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
camera.position.set(1.5, 0, 1.5);
camera.updateProjectionMatrix();
//初始化渲染器
const renderer = new THREE.WebGLRenderer({
  //设置抗锯齿
  antialias: true,
  //对数深度缓冲区
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

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

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
});

//加载问题
const loader = new THREE.TextureLoader();
const bgTexture = loader.load(
  "http://hades0512.oss-cn-beijing.aliyuncs.com/three/crystal/050.jpg"
);
bgTexture.mapping = THREE.EquirectangularRefractionMapping;

scene.background = bgTexture;
scene.environment = bgTexture;

//添加环境光
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
//加载小熊模型

const gltfLoading = new GLTFLoader();
gltfLoading.load(
  "http://hades0512.oss-cn-beijing.aliyuncs.com/three/crystal/model/bear.gltf",
  (gltf) => {
    const model = gltf.scene.children[0];
    //@ts-ignore
    model.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      envMap: bgTexture,
      refractionRatio: 0.7,
      reflectivity: 0.99,
    });

    scene.add(model);
  }
);
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
}
</style>
