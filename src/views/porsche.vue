<template>
  <div class="container" ref="container"></div>
  <Urls />
  <div class="color-controls">
    <div class="controls-item">
      <div class="controls-label">鲨蓝</div>
      <div
        @click="handleChangeColor(0x006dd1)"
        class="controls-color-box"
        style="background-color: rgb(0, 109, 209)"
      ></div>
    </div>
    <div class="controls-item">
      <div class="controls-label">星光宝石红</div>
      <div
        @click="handleChangeColor(0xaa1059)"
        class="controls-color-box"
        style="background-color: #aa1059"
      ></div>
    </div>
    <div class="controls-item">
      <div class="controls-label">胭脂红</div>
      <div
        @click="handleChangeColor(0x990033)"
        class="controls-color-box"
        style="background-color: #990033"
      ></div>
    </div>
    <div class="controls-item">
      <div class="controls-label">巨蟒绿</div>
      <div
        @click="handleChangeColor(0x3c9343)"
        class="controls-color-box"
        style="background-color: #3c9343"
      ></div>
    </div>
  </div>
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
import * as child_process from "child_process";
import MeshPhysicalNodeMaterial from "three/examples/jsm/nodes/materials/MeshPhysicalNodeMaterial";
import { MeshPhysicalMaterial } from "three";
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
camera.position.set(5, 5, 5);

//初始化渲染器
const renderer = new THREE.WebGLRenderer({
  //设置抗锯齿
  antialias: true,
  //对数深度缓冲区
  //logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor("#000");
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

scene.background = new THREE.Color("#ccc");

//添加网格地面
const gridHelper = new THREE.GridHelper(10, 10);
// gridHelper.material.opacity = 0.2;
//@ts-ignore
gridHelper.material.transparent = true;
gridHelper.position.y = -0.7;
scene.add(gridHelper);
//添加小岛模型
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "http://hades0512.oss-cn-beijing.aliyuncs.com/three/draco/"
);
loader.setDRACOLoader(dracoLoader);

const bodyMaterial = new MeshPhysicalMaterial({
  color: 0x006dd1,
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
const handleChangeColor = (newColor) => {
  bodyMaterial.color.set(newColor);
};
loader.load(
  "http://hades0512.oss-cn-beijing.aliyuncs.com/three/free_porsche_911_carrera_4s.glb",
  (gltf) => {
    const porsche = gltf.scene;
    porsche.traverse((child) => {
      //@ts-ignore
      if (child?.isMesh) {
        console.log(child.name);
        if (child.name === "boot011_0" || child.name === "boot011_0_1") {
          //@ts-ignore
          child.material = bodyMaterial;
        }
      }
    });
    scene.add(porsche);
  }
);

const light1 = new THREE.DirectionalLight(0xffffff, 5);
light1.position.set(0, 0, 5);
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 0, -5);
scene.add(light2);
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(5, 0, 5);
scene.add(light3);
const light4 = new THREE.DirectionalLight(0xffffff, 1);
light4.position.set(5, 0, -5);
scene.add(light4);
const light5 = new THREE.DirectionalLight(0xffffff, 0.3);
light5.position.set(-5, 5, 5);
scene.add(light5);
const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
light6.position.set(-5, 5, 0);
scene.add(light6);
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden;
}
.color-controls {
  position: absolute;
  right: 50px;
  top: 20px;
  display: flex;
  flex-direction: column;
}
.controls-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
.controls-color-box {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin-left: 20px;
}
</style>
