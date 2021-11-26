import React, { Component } from "react";
import './App.css';
import * as THREE from "three";
import { Vector2 } from "three";




export default class App extends Component {
  // --------------------------------------------------------------------------- Keyboard listener -------------------------------------------------------------------
  Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    rotm: false, //p
    rotl: false, //l
  };

  mouse = new THREE.Vector2();


  onMouseMove = (event) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  }

  onKeyDown = (event) => {
    var kc = event.keyCode;

    if (kc === 37) this.Keys.left = true;  //only one key per event
    else if (kc === 38) this.Keys.up = true;    //so check exclusively
    else if (kc === 39) this.Keys.right = true;
    else if (kc === 40) this.Keys.down = true;
    else if (kc === 76) this.Keys.rotl = true;
    else if (kc === 80) this.Keys.rotm = true;
  }

  onKeyUp = (event) => {
    var kc = event.keyCode;

    if (kc === 37) this.Keys.left = false;
    else if (kc === 38) this.Keys.up = false;
    else if (kc === 39) this.Keys.right = false;
    else if (kc === 40) this.Keys.down = false;
    else if (kc === 76) this.Keys.rotl = false;
    else if (kc === 80) this.Keys.rotm = false;
  }
  //-------------------------------------------------------------------SCENE ----------------------------------------------------------------------------------------------
  scene = new THREE.Scene();

  componentDidMount() {
    // on ajoute les events listerner
    this.mount.addEventListener('mousemove', this.onMouseMove);
    this.mount.addEventListener('keydown', this.onKeyDown);
    this.mount.addEventListener('keyup', this.onKeyUp);
    this.mount.setAttribute("tabindex", 0);

    //camera et ciblage a travers la souris 
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
    var renderer = new THREE.WebGLRenderer();
    camera.position.z = 40;
    const raycaster = new THREE.Raycaster(); //pour le hoover
    const mouse = new THREE.Vector2();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(this.scene.children);



    //The X axis is red. The Y axis is green. The Z axis is blue. 
    //const axesHelper = new THREE.AxesHelper( 125 );
    //  scene.add( axesHelper );

    //var tabp = [new Planete("green",1,0.2,1),new Planete("green",3,0.4,1),new Planete("green",5,0.1,1),new Planete("green",7,0.8,1),new Planete("green",9,0.6,1),];
    //var ss = new SystemeSolaire("sun",new Position2D(0,0),tabp,"red");
    //var ss2 = new SystemeSolaire("sun",new Position2D(18,10),tabp,"red");
    //ss.DrawSystemeSolaire(this.scene);
    //ss2.DrawSystemeSolaire(this.scene);
    //console.log(ss.GetCollision(ss2));
    //console.log(ss);

    var galaxie = new Galaxie(new Position2D(0, 0), 5, "D2", [], "red");
    galaxie.DrawCentre(this.scene);
    galaxie.DrawBranchSS(this.scene, new Position2D(8, 4), 500, 1);



    //la fonction qui boucle
    var animate = () => {
      requestAnimationFrame(animate);
      if (this.Keys.up) {
        camera.position.y += 1;
      }
      else if (this.Keys.down) {  //both up and down does not work so check excl.
        camera.position.y -= 1;
      }

      if (this.Keys.left) {
        camera.position.x -= 1;
      }
      else if (this.Keys.right) {
        camera.position.x += 1;
      }
      if (this.Keys.rotm) {
        camera.position.z += 1;
      }
      else if (this.Keys.rotl) {
        camera.position.z -= 1;
      }
      raycaster.setFromCamera(this.mouse, camera);  //on recalcule le ray 
      intersects = raycaster.intersectObjects(this.scene.children);
      if (intersects.length === 0) {
        for (let j = 0; j < this.scene.children.length; j++) {
          if (this.scene.children[j].geometry.type === "SphereGeometry") {
            this.scene.children[j].material.color.set(0xffffff);

          }
          else if (this.scene.children[j].geometry.type === "RingGeometry") {
            this.scene.children[j].material.color.set(0x0f00d0);
          }

        }
      }
      else {

        for (let i = 0; i < intersects.length; i++) {  //regarde pour chaque objet si on est dessus
          intersects[0].object.material.color.set(0xff0000);
          // ss.MoveSystemeSolaire();
          //galaxie.MoveGalaxie();
        }
      }
      /**for (let i = 2; i < galaxie1.length; i = i + 2) {  //regarde pour chaque objet si on est dessus
        this.rotateAboutPoint(galaxie1[i], b, axes, 0.1 * Math.PI / 180, "");

      }
      for (let i = 2; i < galaxie2.length; i = i + 2) {  //regarde pour chaque objet si on est dessus a modifier 
        this.rotateAboutPoint(galaxie2[i], c, axes, 0.1 * Math.PI / 180, "");

      }**/
      /**  this.rotateAboutPoint(cube1, b, axes, 0.1 * Math.PI / 180, ""); //on fais tourner les planetes
        this.rotateAboutPoint(cube2, b, axes, 0.2 * Math.PI / 180, "");
        this.rotateAboutPoint(cube3, b, axes, 0.5 * Math.PI / 180, "");**/
      renderer.render(this.scene, camera);

    };
    animate();
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }



}

class Planete {
  constructor(couleur, distBySun, vit, taille) {
    this.couleur = couleur;
    this.distBySun = distBySun;
    this.vit = vit;
    this.taille = taille;
    this.planete = "";
  }

  DrawPlanete(scene) { //renvoie l'element de la planete
    var geometry = new THREE.SphereGeometry(this.taille, 32, 16);
    var material = new THREE.MeshBasicMaterial({ color: this.couleur });
    var planete = new THREE.Mesh(geometry, material);
    scene.add(planete);
    planete.translateX(this.distBySun);
    //planete.translateY(this.position2D.y);
    this.planete = planete;
    return planete;
  }

}

class SystemeSolaire {
  constructor(sun, centre2D, tabP, couleurLight) {
    this.sun = sun;
    this.centre2D = centre2D;
    this.tabP = tabP;
    this.couleurLight = couleurLight;
    this.SystemeSolaireRing = [];
    this.SystemeSolairePlanete = [];
    this.radius =0;
    this.initRadius();
  }

  MoveSystemeSolaire() {
    var axes = new THREE.Vector3(0, 0, 1);
    var tb = new ToolBox();
    console.log(this.SystemeSolairePlanete);
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      console.log(i);
      tb.rotateAboutPoint(this.SystemeSolairePlanete[i], new THREE.Vector3(), axes, this.tabP[i].vit * Math.PI / 180, "");
    }

  }

  GetCollision(ss) {
    if(ss === undefined){
      return false;
    }
    else{
      var dx = this.centre2D.x - ss.centre2D.x;
    var dy = this.centre2D.y - ss.centre2D.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + ss.radius) {
      return true;
    }else{
      return false;
    }
    }
  }

  DrawSystemeSolaire(scene) {
    var ring = "";
    var planete;
    this.sun = this.DrawSun(scene);

    for (let a = 0; a < this.tabP.length; a++) {
      ring = this.DrawRing(this.tabP[a].distBySun, this.centre2D, scene);
      this.SystemeSolaireRing.push(ring);
      planete = this.tabP[a].DrawPlanete(scene);
      planete.translateX(this.centre2D.x);
      planete.translateY(this.centre2D.y);
      this.SystemeSolairePlanete.push(planete);
    }
    return this;
  }

  DrawSun(scene) {
    var sgeometry = new THREE.SphereGeometry(2, 32, 16);
    var smaterial = new THREE.MeshBasicMaterial({ color: this.couleurLight });
    var soleil = new THREE.Mesh(sgeometry, smaterial);
    scene.add(soleil);
    soleil.translateX(this.centre2D.x);
    soleil.translateY(this.centre2D.y);
    return soleil;
  }

  DrawRing(taille, position2D, scene) {
    var rgeometry = new THREE.RingGeometry(taille - 0.1, taille, 30, 15, 0, 6.3);
    var rmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    var ring = new THREE.Mesh(rgeometry, rmaterial);
    scene.add(ring);
    ring.translateX(position2D.x);
    ring.translateY(position2D.y);
    return ring;
  }

  initRadius(){
    for(var i=0;i<this.tabP.length;i++){
      if(this.tabP[i].distBySun > this.radius-this.tabP[i].taille){
        this.radius = this.tabP[i].distBySun + this.tabP[i].taille;
      }
    }
  }

  TranslateX(x) {
    this.sun.translateX(x);
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      this.SystemeSolairePlanete[i].translateX(x);
    }
    for (var j = 0; j < this.SystemeSolaireRing.length; j++) {
      this.SystemeSolaireRing[j].translateX(x);
    }
  }

  TranslateY(y) {
    this.sun.translateY(y);
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      this.SystemeSolairePlanete[i].translateY(y);
    }
    for (var j = 0; j < this.SystemeSolaireRing.length; j++) {
      this.SystemeSolaireRing[j].translateY(y);
    }
  }

}

class Galaxie {
  constructor(centre2D, taille, forme, tabSS, couleurLight) {
    this.centre2D = centre2D;
    this.taille = taille;
    this.forme = forme;
    this.tabSS = tabSS;
    this.couleurLight = couleurLight;
    this.tabEtoile = [];
  }

  DrawGalaxie() {

  }

  DrawCentre(scene) {
    var cgeometry = new THREE.SphereGeometry(5, 32, 16);
    var cmaterial = new THREE.MeshBasicMaterial({ color: this.couleurLight });
    var centre = new THREE.Mesh(cgeometry, cmaterial);
    scene.add(centre);
    centre.translateX(this.centre2D.x);
    centre.translateY(this.centre2D.y);
    return centre;
  }

  DrawCirclePlanete(scene, radius, nb) {
    var tb = new ToolBox();
    var tabEtoile = [];
    for (var i = 0; i < nb; i++) {
      var pos = tb.generatePointAroudCircle(radius);
      var p = new Planete("green", pos.x, 0.2, 0.5);
      tabEtoile.push(p);
      p = p.DrawPlanete(scene);
      scene.add(p);
      p.translateY(pos.y);
    }
    return tabEtoile;
  }

  DrawBranchPlanete(scene, startPos, angleSize, step) {
    var tabEtoile = [];
    for (var i = 1; i < angleSize; i = i + step) {
      var tb = new ToolBox();
      var pos = tb.generateSpirale(i, startPos);
      var p = new Planete("green", pos.x, 0.2, 0.5).DrawPlanete(scene);
      tabEtoile.push(p);
      scene.add(p);
      p.translateY(pos.y);
    }
    this.tabEtoile = tabEtoile;
    return tabEtoile;
  }

  GetCollision(tab,ss){
    var res = false;
    for(var i =0 ; i< tab.length ; i++){
      if(tab[i].GetCollision(ss)){
        res = true;
      }
    }
    return res;
  }

  DrawBranchSS(scene, startPos, angleSize, step) {
    var tabSS = [];
    var tb = new ToolBox();
    var curveTab = [];
    for (var j = 1; j < angleSize * 4; j = j + 2) {
      var posL = tb.generateSpiralePoint(j, startPos);
      curveTab.push(new Vector2(posL.x, posL.y));
    }
    var geometry = new THREE.BufferGeometry().setFromPoints(curveTab);
    var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var splineObject = new THREE.Line(geometry, material);
    scene.add(splineObject);
    for (var i = 1; i < angleSize; i = i + step) {
      var pos = tb.generateSpirale(i, startPos);
      var ss = new SystemeSolaire("sun", new Position2D(this.centre2D.x + pos.x, this.centre2D.y+pos.y), [new Planete("green", 1, 0.2, 1), new Planete("green", 3, 0.4, 1), new Planete("green", 5, 0.1, 1), new Planete("green", 7, 0.8, 1), new Planete("green", 9, 0.6, 1),], "red");
      if(!this.GetCollision(tabSS,ss)){
        ss =ss.DrawSystemeSolaire(scene);
        tabSS.push(ss);
        ss.TranslateY(pos.y);
      }
    }
    return tabSS;
  }


  MoveGalaxie() {
    var axes = new THREE.Vector3(0, 0, 1);
    var tb = new ToolBox();
    for (var i = 0; i < this.tabEtoile.length; i++) {
      tb.rotateAboutPoint(this.tabEtoile[i].planete, new THREE.Vector3(), axes, this.tabEtoile[i].vit * Math.PI / 180, "");
    }

  }

}

class Univers {
  constructor(tabGal) {
    this.tabGal = tabGal;
  }
}

class ToolBox {
  // obj - your object (THREE.Object3D or derived)
  // point - the point of rotation (THREE.Vector3)
  // axis - the axis of rotation (normalized THREE.Vector3)
  // theta - radian value of rotation
  // pointIsWorld - boolean indicating the point is in world coordinates (defaul
  rotateAboutPoint = (obj, point, axis, theta, pointIsWorld) => {

    pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;

    if (pointIsWorld) {
      obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if (pointIsWorld) {
      obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
  }

  //creer des points aleatoires a la periphérie d'un cercle 2d
  generatePointAroudCircle(radius) {
    var angle = Math.random() * Math.PI * 2;
    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;
    return (new Position2D(x, y));
  }

  generateSpirale(angleSize, startPos) { //angleSize a utilisé dans une boucle 360 ou 720 etc 
    var angle = (Math.random() * (0.5 - 0.1) + 0.1) * angleSize + 10;
    var x = (startPos.x + angle) * Math.cos(angle);
    var y = (startPos.y + angle) * Math.sin(angle);
    return new Position2D(x, y)
  }

  generateSpiralePoint(angleSize, startPos) { //angleSize a utilisé dans une boucle 360 ou 720 etc 
    var angle = 0.1 * angleSize;
    var x = (startPos.x + angle) * Math.cos(angle);
    var y = (startPos.y + angle) * Math.sin(angle);
    return new Position2D(x, y)
  }
}

class Position2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}