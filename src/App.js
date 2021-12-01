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

  mouse = new THREE.Vector2(0, 0);


  onMouseMove = (event) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.xNat = event.clientX;
    this.mouse.yNat = event.clientY;

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
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000);
    var renderer = new THREE.WebGLRenderer();
    camera.position.z = 2000;
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
    const Alight = new THREE.AmbientLight('white', 0.4); // soft white light
    this.scene.add(Alight);

    //var tabp = [new Planete(new ToolBox().generateRandomColor(), 15, 0.2, 1), new Planete(new ToolBox().generateRandomColor(), 25, 0.4, 3), new Planete(new ToolBox().generateRandomColor(), 34, 0.1, 1), new Planete(new ToolBox().generateRandomColor(), 49, 0.8, 1), new Planete(new ToolBox().generateRandomColor(), 59, 0.6, 5),];
    //var ss = new SystemeSolaire("sun", new Position2D(-100, 0), tabp, "yellow", 0.2);
    //var ss2 = new SystemeSolaire("sun",new Position2D(50,0),tabp,"red",0.5);
    //ss.DrawSystemeSolaire(this.scene);
    //ss2.DrawSystemeSolaire(this.scene);

    //var galaxie = new Galaxie(new Position2D(-1200, -500), 5, "D2", [], "red");
    //galaxie.DrawCentre(this.scene);
    //galaxie.DrawBranchSS(this.scene, new Position2D(-1200, -500), 300, 1);

    //var galaxie2 = new Galaxie(new Position2D(-1000, 500), 5, "D2", [], "red");
    //galaxie2.DrawCentre(this.scene);
    //galaxie2.DrawBranchSS(this.scene, new Position2D(-1000, 500), 300, 1);

    //var galaxie3 = new Galaxie(new Position2D(0, 350), 5, "D2", [], "red");
    //galaxie3.DrawCentre(this.scene);
    //galaxie3.DrawBranchSS(this.scene, new Position2D(0, 350), 300, 1);

    //var galaxie4 = new Galaxie(new Position2D(1200, -350), 5, "D2", [], "red");
    //galaxie4.DrawCentre(this.scene);
    //galaxie4.DrawBranchSS(this.scene, new Position2D(1200, -350), 300, 1);


    var univers = new Univers([new Galaxie(new Position2D(-1400, -500), 5, "D2", [], "red"), new Galaxie(new Position2D(-1000, 500), 5, "D2", [], "red"), new Galaxie(new Position2D(200, 350), 5, "D2", [], "red"), new Galaxie(new Position2D(1200, -350), 5, "D2", [], "red")]);
    //var univers = new Univers([new Galaxie(new Position2D(1000, 0), 5, "D2", [], "red")]);
    univers.initUnivers(this.scene);

    var hoovered = [];


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
        camera.position.z += 10;
      }
      else if (this.Keys.rotl) {
        camera.position.z -= 10;
      }


      raycaster.setFromCamera(this.mouse, camera);  //on recalcule le ray 
      intersects = raycaster.intersectObjects(this.scene.children);
      var collision  =false;
      var ind = 0;
      for (var g = 0; g < univers.tabGal.length; g++) {
        if (new ToolBox().detectCollision(univers.tabGal[g], new ToolBox().calculThreeCoord(this.mouse, camera))) {
          collision = true;
          ind = g+0;
        }
      }
      if(collision){
        var t = univers.tabGal[ind].DrawHoover(this.scene);
        if (t !== undefined) {
          hoovered.push(t);
        }
      } else{
        for(var i=0;i<hoovered.length;i++){
          this.scene.remove(hoovered[i]);
        }
        hoovered = [];
        for (var j = 0; j < univers.tabGal.length; j++) {
        univers.tabGal[j].hoovered = false;
        }
      }

      if (intersects.length === 0) {
        for (var x = 0; x < univers.tabGal.length; x++) {
          univers.tabGal[x].MoveGalaxie();
          for (var y = 0; y < univers.tabGal[x].tabSS.length; y++) {
            univers.tabGal[x].tabSS[y].MoveSystemeSolaire();
          }
        }
      }
      else {

        for (let i = 0; i < intersects.length; i++) {  //regarde pour chaque objet si on est dessus
          //ss.MoveSystemeSolaire();
          //ss2.MoveSystemeSolaire();
          //for(var x =0;x<galaxie.tabSS.length;x++){
          //galaxie.tabSS[x].MoveSystemeSolaire();
          //}
          //galaxie.MoveGalaxie();
        }
      }


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
    var material = new THREE.MeshPhongMaterial({ color: this.couleur });
    var planete = new THREE.Mesh(geometry, material);
    scene.add(planete);
    planete.translateX(this.distBySun);
    //planete.translateY(this.position2D.y);
    this.planete = planete;
    return planete;
  }

}

class SystemeSolaire {
  constructor(sun, centre2D, tabP, couleurLight, vit) {
    this.sun = sun;
    this.centre2D = centre2D;
    this.tabP = tabP;
    this.couleurLight = couleurLight;
    this.SystemeSolaireRing = [];
    this.SystemeSolairePlanete = [];
    this.radius = 0;
    this.vit = vit;
    this.sunLength = 0;
    this.initRadius();
  }

  initLight(scene) {
    var light = new THREE.PointLight('white', 1.4, 100);
    light.position.set(this.centre2D.x + this.sunLength, this.centre2D.y, 0);
    scene.add(light);

    var light2 = new THREE.PointLight('white', 1.4, 100);
    light2.position.set(this.centre2D.x, this.centre2D.y + this.sunLength, 0);
    scene.add(light2);

    var light3 = new THREE.PointLight('white', 1.4, 100);
    light3.position.set(-(this.centre2D.x + this.sunLength), this.centre2D.y, 0);
    scene.add(light3);

    var light4 = new THREE.PointLight('white', 1.4, 100);
    light4.position.set(this.centre2D.x, -(this.centre2D.y + this.sunLength), 0);
    scene.add(light4);

    var light5 = new THREE.PointLight('yellow', 1.4, 100);
    light5.position.set(this.centre2D.x, this.centre2D.y, this.sunLength * 2);
    scene.add(light5);
  }

  MoveSystemeSolaire() {
    var axes = new THREE.Vector3(0, 0, 1);
    var tb = new ToolBox();
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      tb.rotateAboutPoint(this.SystemeSolairePlanete[i], new THREE.Vector3(this.centre2D.x, this.centre2D.y, 0), axes, this.tabP[i].vit * Math.PI / 180, "");
    }

  }

  GetCollision(ss) {
    if (ss === undefined) {
      return false;
    }
    else {
      var dx = this.centre2D.x - ss.centre2D.x;
      var dy = this.centre2D.y - ss.centre2D.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius + ss.radius) {
        return true;
      } else {
        return false;
      }
    }
  }

  DrawSystemeSolaire(scene) {
    var planete;
    this.sun = this.DrawSun(scene);

    for (let a = 0; a < this.tabP.length; a++) {
      // ring = this.DrawRing(this.tabP[a].distBySun, this.centre2D, scene);
      //  this.SystemeSolaireRing.push(ring);
      planete = this.tabP[a].DrawPlanete(scene);
      planete.translateX(this.centre2D.x);
      planete.translateY(this.centre2D.y);
      this.SystemeSolairePlanete.push(planete);
    }
    this.initLight(scene);
    return this;
  }

  DrawSun(scene) {
    var taille = 0;
    for (var i = 0; i < this.tabP.length; i++) {
      if (taille < this.tabP[i].taille) {
        taille = this.tabP[i].taille * 2;
        this.sunLength = taille;
      }
    }
    var sgeometry = new THREE.SphereGeometry(taille, 32, 16);
    var smaterial = new THREE.MeshPhongMaterial({ color: 'yellow' });
    var soleil = new THREE.Mesh(sgeometry, smaterial);
    scene.add(soleil);
    soleil.translateX(this.centre2D.x);
    soleil.translateY(this.centre2D.y);
    return soleil;
  }

  DrawRing(taille, position2D, scene) {
    var rgeometry = new THREE.RingGeometry(taille - 0.1, taille, 30, 15, 0, 6.3);
    var rmaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    var ring = new THREE.Mesh(rgeometry, rmaterial);
    scene.add(ring);
    ring.translateX(position2D.x);
    ring.translateY(position2D.y);
    return ring;
  }

  initRadius() {
    for (var i = 0; i < this.tabP.length; i++) {
      if (this.tabP[i].distBySun > this.radius - this.tabP[i].taille) {
        this.radius = this.tabP[i].distBySun + this.tabP[i].taille;
      }
    }
    console.log(this.radius);
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

  RotateAboutPointSS(center) {
    var axes = new THREE.Vector3(0, 0, 1);
    var tb = new ToolBox();
    this.centre2D = tb.rotateAboutPoint(this.sun, new THREE.Vector3(center.x, center.y, 0), axes, this.vit * Math.PI / 180, "");
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      tb.rotateAboutPoint(this.SystemeSolairePlanete[i], new THREE.Vector3(center.x, center.y, 0), axes, this.vit * Math.PI / 180, "");
    }
  }

}

class Galaxie {
  constructor(centre2D, taille, forme, tabSS, couleurLight) {
    this.centre2D = centre2D;
    this.radius = 0;
    this.taille = taille;
    this.forme = forme;
    this.tabSS = tabSS;
    this.couleurLight = couleurLight;
    this.tabEtoile = [];
    this.tabSS = [];
    this.hoovered = false;
  }

  initRadius() {
    this.radius = new ToolBox().DistanceEntreDeuxpoint(this.centre2D,this.tabSS[this.tabSS.length-1].centre2D) + this.tabSS[this.tabSS.length - 1].radius +100;
  }

  DrawCentre(scene) {
    var cgeometry = new THREE.SphereGeometry(30, 32, 16);
    var cmaterial = new THREE.MeshPhongMaterial({ color: 'yellow' });
    var centre = new THREE.Mesh(cgeometry, cmaterial);
    scene.add(centre);
    centre.translateX(this.centre2D.x);
    centre.translateY(this.centre2D.y);
    var light5 = new THREE.PointLight('yellow', 1, 100);
    light5.position.set(this.centre2D.x, this.centre2D.y, 50);
    scene.add(light5);
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
      var p = new Planete(new ToolBox().generateRandomColor(), pos.x, 0.2, 0.5).DrawPlanete(scene);
      tabEtoile.push(p);
      scene.add(p);
      p.translateY(pos.y);
    }
    this.tabEtoile = tabEtoile;
    return tabEtoile;
  }

  GetCollision(tab, ss) {
    var res = false;
    for (var i = 0; i < tab.length; i++) {
      if (tab[i].GetCollision(ss)) {
        res = true;
      }
    }
    return res;
  }

  isCollisionCenter(ss) {
    var dx = ss.centre2D.x - this.centre2D.x;
    var dy = ss.centre2D.y - this.centre2D.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ss.radius + 30) {
      return true;
    } else {
      return false;
    }
  }

  DrawBranchSS(scene, startPos, angleSize, step) {
    var tabSS = [];
    var tb = new ToolBox();
    var curveTab = [];
    for (var j = 1; j < angleSize * 4; j = j + 2) {
      var posL = tb.generateSpiralePoint(j, new Position2D(startPos.x + this.centre2D.x, startPos.y + this.centre2D.y));
      curveTab.push(new Vector2(posL.x, posL.y + this.centre2D.y));
    }
    var geometry = new THREE.BufferGeometry().setFromPoints(curveTab);
    var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    var splineObject = new THREE.Line(geometry, material);
    //scene.add(splineObject);
    for (var i = 1; i < angleSize; i = i + step) {
      var pos = tb.generateSpirale(i, startPos);
      var ss = new SystemeSolaire("sun", new Position2D(this.centre2D.x + pos.x, this.centre2D.y + pos.y), [new Planete(new ToolBox().generateRandomColor(), 15, 0.2, 1), new Planete(new ToolBox().generateRandomColor(), 25, 0.4, 3), new Planete(new ToolBox().generateRandomColor(), 34, 0.1, 1), new Planete(new ToolBox().generateRandomColor(), 49, 0.8, 1), new Planete(new ToolBox().generateRandomColor(), 59, 0.6, 5),], "red", Math.random() * (0.1 - 0.01) + 0.01);
      if ((!this.GetCollision(tabSS, ss)) && (!this.isCollisionCenter(ss))) {
        ss = ss.DrawSystemeSolaire(scene);
        tabSS.push(ss);
        ss.TranslateY(pos.y);
      }
    }
    this.tabSS = tabSS;
    this.initRadius();
    return tabSS;
  }


  MoveGalaxie() {
    for (var i = 0; i < this.tabSS.length; i++) {
      this.tabSS[i].RotateAboutPointSS(this.centre2D);
    }
  }

  DrawHoover(scene) {
    if (!this.hoovered) {
      var geometry = new THREE.CircleGeometry(this.radius, 32);
      var material = new THREE.MeshBasicMaterial({ color: 'white', transparent: true, opacity: 0.2 });
      var circle = new THREE.Mesh(geometry, material);
      scene.add(circle);
      circle.translateX(this.centre2D.x);
      circle.translateY(this.centre2D.y);
      circle.translateZ(-50);
      this.hoovered = !this.hoovered;
      return circle;
    }
  }

}

class Univers {
  constructor(tabGal) {
    this.tabGal = tabGal;
  }

  initUnivers(scene) {
    for (var i = 0; i < this.tabGal.length; i++) {
      this.tabGal[i].DrawCentre(scene);
      this.tabGal[i].DrawBranchSS(scene, this.tabGal[i].centre2D, 300, 1);
    }
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
    return new Position2D(obj.position.x, obj.position.y);
  }

  //creer des points aleatoires a la periphérie d'un cercle 2d
  generatePointAroudCircle(radius) {
    var angle = Math.random() * Math.PI * 2;
    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;
    return (new Position2D(x, y));
  }

  generateSpirale(angleSize) { //angleSize a utilisé dans une boucle 360 ou 720 etc 
    var angle = (Math.random() * angleSize + 10);
    var x = (angle) * Math.cos(angle);
    var y = (angle) * Math.sin(angle);
    return new Position2D(x, y)
  }

  generateSpiralePoint(angleSize, startPos) { //angleSize a utilisé dans une boucle 360 ou 720 etc 
    var angle = 0.1 * angleSize;
    var x = (startPos.x + angle) * Math.cos(angle);
    var y = (startPos.y + angle) * Math.sin(angle);
    return new Position2D(x, y)
  }

  generateRandomColor() {
    var c = ['purple', 'blue', 'red', 'green', 'darkorange', 'pink', 'brown']
    var r = new ToolBox().getRandomInt(0, 6);
    return c[r];
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  detectCollision(galaxie, mouse) {
    if (mouse !== undefined) {
      var dx = galaxie.centre2D.x - mouse.x;
      var dy = galaxie.centre2D.y - mouse.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < galaxie.radius) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  calculThreeCoord(mouse, camera) {
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return pos;
  }

  sqr(a) {
    return a * a;
  }

  DistanceEntreDeuxpoint(coord1, coord2) {
    return Math.sqrt(this.sqr(coord2.y - coord1.y) + this.sqr(coord2.x - coord1.x));
  }


}


class Position2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}