import React from "react";
import CircleWrapper from "./CircleWrapper";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import gsap from 'gsap'



class Bag extends React.Component {
  constructor(props) {
    super(props);
  }
 
  componentDidUpdate(prevProps, prevState) {
    const { ActiveData } = this.props;
    if (prevProps.ActiveData !== ActiveData) {
      this.applyMaterial(ActiveData);
    }
  }
  componentDidMount() {
   this.initialStep();
  }

  initialStep=()=>{

    const {setLoading} = this.props;
    this.container = document.querySelector("#main")
    const item = this.container.getBoundingClientRect()
    
    this.size = {
      width : item.width,
      height : item.height,
    }
    this.canvas = document.querySelector("canvas.webgl")

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.size.width / this.size.height, 50, 1000);
    this.camera.position.set(50, 20, 90);
    this.scene.add(this.camera)

    this.manager = new THREE.LoadingManager()
    this.manager.onProgress=(url,items,totalItems)=>{
      const percentage = (items / totalItems) *100;
      if(percentage === 100){
        setLoading()
        console.log('Loading complete');
      }
    }

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.touches = {
      ONE:THREE.TOUCH.ROTATE,
      TWO:THREE.TOUCH.DOLLY_PAN
    };
    this.controls.enableDamping = true;
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.rotateSpeed=2;
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI / 1.9;


    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.size.width,this.size.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)


    const renderFinal=()=>{
      requestAnimationFrame(renderFinal);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    renderFinal();
    this.loadHDRI(); 
    this.addModel(); 
    window.addEventListener('resize', this.Resize);
  };

  Resize=()=>{
    this.size.width = this.container.offsetWidth;
    this.size.height = this.container.offsetHeight;
    this.camera.aspect = this.size.width / this.size.height;
    this.renderer.setSize(this.size.width, this.size.height);
    this.camera.updateProjectionMatrix();
  }
  loadHDRI = () => {
    new RGBELoader(this.manager)
      .setDataType(THREE.HalfFloatType)
      .load('default.hdr', (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.needsUpdate = true;
        // this.scene.background = texture;
        this.scene.environment = texture;
        texture.dispose();
      });
  };

addModel = () => {
    const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
    const DRACO_LOADER = new DRACOLoader(this.manager).setDecoderPath(
      `${THREE_PATH}/examples/js/libs/draco/gltf/`
    );

    const bagpack = 'bag.glb';
    const GLtfLoader = new GLTFLoader(this.manager).setDRACOLoader(
      DRACO_LOADER
    );
    GLtfLoader.load(bagpack, (gltf) => {
      gltf.scene.position.set(0, -30, 0);
    
      this.scene.add(gltf.scene);
    });
  };

  applyMaterial = (data) => {
    this.scene.traverse((element) => {
      if (element.isMesh) {
        Object.entries(data.itemList).forEach((mesh) => {
          if (mesh[0] === element.name) {
            var value = new THREE.Color(mesh[1].color).convertSRGBToLinear();

            gsap.to(element.material.color, {
              r: value.r,
              g: value.g,
              b: value.b,
              ease: 'power3.inOut',
              duration: 0.8,
            });
            element.material.needsUpdate = true;
          }
        });
      }
    });

    gsap.to('.highlight', {
      backgroundColor: data.buttonColor.background,
      ease: 'power3.inOut',
      duration: 0.8,
    });
  };

  render() {

    const { WrapperData, ActiveData, handleColors} = this.props;
    return (
      <div id="main" className=" w-full lg:w-1/2 h-3/5 lg:h-full relative z-10  ">
         <canvas className="webgl w-full h-full" > </canvas>

      <CircleWrapper
        WrapperData={WrapperData}
        ActiveData={ActiveData}
        handleColors={handleColors}
      />
             <div className="highlight w-2/3 h-1/2 bg-[#D7B172] absolute inset-x-40 top-0 -z-10 rounded-br-full rounded-bl-full md:inset-x-60  lg:inset-x-40"></div>


    </div>
    
    );
  }
}

export default Bag;
