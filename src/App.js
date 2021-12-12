import React, { Component } from "react";
import './App.css';
import * as THREE from "three";
import { Vector2 } from "three";
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBox from "./components/ChatBox";
import CreateTopic from "./components/CreateTopic";
import SearchBar from "./components/SearchBar";



class Views {
  constructor(layer, scene, camera, Alight) {
    this.layer = layer; //[univers,galaxie,systemeSolaire,planete]
    this.scene = scene;
    this.camera = camera;
    this.Alight = Alight;
    this.univers = '';
    this.obj = this.initObj();
    this.futurObj = "";
    this.wayInsideObj = [];
    this.oldObj = "";
  }

  /**
   * 
   * @param {string} layer 
   * modifie la view en descente
   */
  reinitView(layer) {
    this.scene.clear();
    this.layer = layer;
    this.wayInsideObj.push(this.obj);
    this.obj = this.downObj();
  }

  /**
   * 
   * @param {string} layer 
   * modifie al view en monter
   */
  reinitViewUp(layer) {
    this.scene.clear();
    this.layer = layer;
    this.obj = this.upObj();
  }

  /**
   * 
   * @returns obj
   * initialise le nouvel obj en monter de la view et le renvoie
   */
  upObj() {
    if (this.layer === "univers") {
      var univers = new Univers([new Galaxie(new Position2D(-1400, -500), 5, "D2", [], "red", "politique"), new Galaxie(new Position2D(-1000, 500), 5, "D2", [], "red", "ecologie"), new Galaxie(new Position2D(200, 350), 5, "D2", [], "red", "informatique"), new Galaxie(new Position2D(1200, -350), 5, "D2", [], "red", "gaming")]);
      univers.initUnivers(this.scene);
      this.camera.position.z = 2000;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return univers;
    } else if (this.layer === "galaxie") {
      var galaxie = this.wayInsideObj[this.wayInsideObj.length - 1];
      this.wayInsideObj = this.wayInsideObj.slice(0, this.wayInsideObj.length - 1);
      galaxie.DrawCentre(this.scene);
      galaxie.DrawBranchSS(this.scene, new Position2D(0, -0), 300, 1);
      this.camera.position.z = 800;
      this.camera.position.x = galaxie.centre2D.x;
      this.camera.position.y = galaxie.centre2D.y;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return galaxie;
    } else if (this.layer === "systemeSolaire") {
      var ss = this.wayInsideObj[this.wayInsideObj.length - 1];
      this.wayInsideObj = this.wayInsideObj.slice(0, this.wayInsideObj.length - 1);
      ss.DrawSystemeSolaire(this.scene);
      this.camera.position.z = 200;
      this.camera.position.x = ss.centre2D.x;
      this.camera.position.y = ss.centre2D.y;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return ss;
    }
  }

  /**
   * 
   * @returns obj
   * initialise le nouvel obj en descente de la view et le return 
   */
  downObj() {
    if (this.layer === "univers") {
      var univers = new Univers([new Galaxie(new Position2D(-1400, -500), 5, "D2", [], "red", "politique"), new Galaxie(new Position2D(-1000, 500), 5, "D2", [], "red", "ecologie"), new Galaxie(new Position2D(200, 350), 5, "D2", [], "red", "informatique"), new Galaxie(new Position2D(1200, -350), 5, "D2", [], "red", "gaming")]);
      univers.initUnivers(this.scene);
      this.camera.position.z = 2000;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return univers;
    } else if (this.layer === "galaxie") {
      var galaxie = this.futurObj;
      galaxie.DrawCentre(this.scene);
      galaxie.DrawBranchSS(this.scene, new Position2D(0, -0), 300, 1);
      this.camera.position.z = 800;
      this.camera.position.x = galaxie.centre2D.x;
      this.camera.position.y = galaxie.centre2D.y;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return galaxie;
    } else if (this.layer === "systemeSolaire") {
      var ss = this.futurObj;
      ss.DrawSystemeSolaire(this.scene);
      this.camera.position.z = 200;
      this.camera.position.x = ss.centre2D.x;
      this.camera.position.y = ss.centre2D.y;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return ss;
    } else if (this.layer === "planete") {
      var planete = this.futurObj;
      planete.position.x = 0;
      planete.position.y = 0;
      planete.position.z = 0;
      this.scene.add(planete);
      this.camera.position.x = 15;
      this.camera.position.y = -0.5;
      this.camera.position.z = 50;
      this.Alight.intensity = 1;
      this.scene.add(this.Alight);
      return planete;
    }
  }

  /**
   * 
   * @returns obj
   * initialise une view par rapport a un layer specifique
   */
  initObj() {
    if (this.layer === "univers") {
      var univers = new Univers([new Galaxie(new Position2D(-1400, -500), 5, "D2", [], "red", "politique"), new Galaxie(new Position2D(-1000, 500), 5, "D2", [], "red", "ecologie"), new Galaxie(new Position2D(200, 350), 5, "D2", [], "red", "informatique"), new Galaxie(new Position2D(1200, -350), 5, "D2", [], "red", "gaming")]);
      this.univers = univers;
      univers.initUnivers(this.scene);
      this.camera.position.z = 2000;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return univers;
    } else if (this.layer === "galaxie") {
      var galaxie = new Galaxie(new Position2D(0, 0), 5, "D2", [], "red", "random");
      galaxie.DrawCentre(this.scene);
      galaxie.DrawBranchSS(this.scene, new Position2D(0, -0), 300, 1);
      this.camera.position.z = 800;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return galaxie;
    } else if (this.layer === "systemeSolaire") {
      var tabp = [new Planete(new ToolBox().generateRandomColor(), 15, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), "PlaneteId"), new Planete(new ToolBox().generateRandomColor(), 25, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), "PlaneteId"), new Planete(new ToolBox().generateRandomColor(), 34, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), "PlaneteId"), new Planete(new ToolBox().generateRandomColor(), 49, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), "PlaneteId"), new Planete(new ToolBox().generateRandomColor(), 59, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), "PlaneteId"),];
      var ss = new SystemeSolaire("sun", new Position2D(0, 0), tabp, "yellow", 0.2, 'test');
      ss.DrawSystemeSolaire(this.scene);
      this.camera.position.z = 200;
      this.Alight.intensity = 0.4;
      this.scene.add(this.Alight);
      return ss;
    } else if (this.layer === "planete") {
      var planete = new Planete(new ToolBox().generateRandomColor(), 0, 0.2, 1, "unknown");
      planete.DrawPlanete(this.scene);
      this.camera.position.z = 20;
      this.camera.position.y = -0.5;
      this.camera.position.x = 10;
      this.Alight.intensity = 1;
      this.scene.add(this.Alight);
      return planete.planete;
    } else {
      return "ntm";
    }
  }
}



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { display: "", ChatBox: "none", currentObj: "univers", topic: "none" };
    this.scene = new THREE.Scene();
  }


  view = '';

  /**
   * 
   * @param {boolean} childData 
   * callback fct for hud component "createTopic"
   */
  childToParent3 = (childData) => {
    if (childData) {
      this.setState({ topic: "none" });
    }
  }

  /**
   * 
   * @param {boolean} childData 
   * callback fct for hud component "header"
   */
  childToParent5 = (childData) => {
    if (childData) {
      var res = "univers";
      this.view.wayInsideObj = [];
      this.view.reinitView(res);
    }
  }

  /**
   * 
   * @param {string} childData 
   * callback fct for hud component "searchBar"
   */
  childToParent4 = (childData) => {
    var res = '';
    if (childData === "javascript") {
      res = "systemeSolaire";
      this.view.wayInsideObj = [];
      this.view.obj = this.view.univers.tabGal[2];
      this.view.futurObj = this.view.univers.tabGal[2].tabSS[2];
      this.view.reinitView(res);
    } else if (childData === "input") {
      res = "planete";
      this.view.wayInsideObj = [];
      this.view.wayInsideObj.push(this.view.univers.tabGal[2]);
      this.view.obj = this.view.univers.tabGal[2].tabSS[2];
      this.view.futurObj = this.view.univers.tabGal[2].tabSS[2].tabP[1].planete;
      this.setState({ currentObj: "Input type='txt'" })
      this.view.reinitView(res);
    }
  }
  /**
    * 
    * @param {boolean} childData 
    * callback fct for hud component "footer"
    */
  childToParent2 = (childData) => {
    if (childData) {
      this.setState({ topic: "" });
    }
  }

  /**
   * 
   * @param {boolean} childData 
   * callback fct for hud component "footer"
   */
  childToParent = (childData) => {
    if (childData) {
      if (this.view.layer !== "univers") {
        if (this.view.layer === "galaxie") {
          this.view.reinitViewUp("univers");
        } else if (this.view.layer === "systemeSolaire") {
          this.view.reinitViewUp("galaxie");
        } else if (this.view.layer === "planete") {
          this.view.reinitViewUp("systemeSolaire");
        }
      }
    }
  }
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

  /**
   * 
   * @param {*} evt 
   * gere le zoom par rapport au layer de la view
   */
  onWheel = (evt) => {
    var step = 10;
    if (this.view.layer === "univers") step = 50;
    if (this.view.layer === "galaxie") step = 20;
    if (this.view.layer === "planete") step = 0;
    var value = this.camera.position.z;
    // Scrolling up
    if (evt.deltaY > 0) {
      if (value < 2000) {
        value = value + step;
        this.camera.position.z = value;
      }
    }
    // Scrolling down
    if (evt.deltaY < 0) {
      if (value > 5) {
        value = value - step;
        this.camera.position.z = value;
      }
    }
  }

  /**
   * 
   * @param {*} event 
   * gere la position de la souris selon l'ecran et selon la scene
   */
  onMouseMove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.xNat = event.clientX;
    this.mouse.yNat = event.clientY;

  }

  /**
   * 
   * @param {*} event 
   * gere les click en fonction de leur zone de click
   */
  onClick = (event) => {
    if (event.target.id === "canvas") {
      var res = '';
      if (this.view.layer === "univers") {
        for (var g = 0; g < this.view.obj.tabGal.length; g++) {
          if (new ToolBox().detectCollision(this.view.obj.tabGal[g], new ToolBox().calculThreeCoord(this.mouse, this.camera))) {
            res = "galaxie";
            this.view.futurObj = this.view.obj.tabGal[g];
          }
        }
      } else if (this.view.layer === "galaxie") {
        for (var t = 0; t < this.view.obj.tabSS.length; t++) {
          if (new ToolBox().detectCollision(this.view.obj.tabSS[t], new ToolBox().calculThreeCoord(this.mouse, this.camera))) {
            res = "systemeSolaire";
            this.view.futurObj = this.view.obj.tabSS[t];
          }
        }
      } else if (this.view.layer === "systemeSolaire") {
        if (this.view.obj.planeteUnderMouse !== '') {
          res = "planete";
          this.view.futurObj = this.view.obj.planeteUnderMouse;
          this.view.obj.planeteUnderMouse = "";
        }
      }
      if (res.length !== 0) {
        this.view.reinitView(res);
      } else if (event.target.id === "canvas") {
        if (this.state.display === "none") {
          this.setState({ display: "" });
        } else {
          this.setState({ display: "none" });
        }
      }
    }
  }
  /**
   * 
   * @param {*} event 
   * gere les appuients de touche
   */
  onKeyDown = (event) => {
    var kc = event.keyCode;

    if (kc === 37) this.Keys.left = true;
    else if (kc === 38) this.Keys.up = true;
    else if (kc === 39) this.Keys.right = true;
    else if (kc === 40) this.Keys.down = true;
    else if (kc === 76) this.Keys.rotl = true;
    else if (kc === 80) this.Keys.rotm = true;
  }
  /**
   * 
   * @param {*} event 
   * gere les appuients de touche
   */
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


  camera = '';

  componentDidMount() {
    // on ajoute les events listerner
    this.mount.addEventListener('mousemove', this.onMouseMove);
    this.mount.addEventListener('keydown', this.onKeyDown);
    this.mount.addEventListener('keyup', this.onKeyUp);
    this.mount.addEventListener('click', this.onClick);
    this.mount.setAttribute("tabindex", 0);
    this.mount.addEventListener('wheel', this.onWheel);

    //camera et ciblage a travers la souris 
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000);
    var renderer = new THREE.WebGLRenderer();
    camera.position.z = 2000;
    this.camera = camera;
    const raycaster = new THREE.Raycaster(); //pour le hoover
    const mouse = new THREE.Vector2();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    this.mount.appendChild(renderer.domElement);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(this.scene.children);

    renderer.domElement.id = 'canvas';
    const Alight = new THREE.AmbientLight('white', 0.4); // soft white light
    this.scene.add(Alight);

    this.view = new Views("univers", this.scene, this.camera, Alight); // on initialise la view 

    var hoovered = [];

    //la fonction qui boucle
    var animate = () => {
      requestAnimationFrame(animate);
      if (this.Keys.up) {
        camera.position.y += 10;
      }
      else if (this.Keys.down) {  //both up and down does not work so check excl.
        camera.position.y -= 10;
      }

      if (this.Keys.left) {
        camera.position.x -= 10;
      }
      else if (this.Keys.right) {
        camera.position.x += 10;
      }
      raycaster.setFromCamera(this.mouse, camera);  //on recalcule le ray 
      intersects = raycaster.intersectObjects(this.scene.children);
      //gestion du hoover
      if (this.view.layer === "univers") {
        this.setState({ ChatBox: "none" });
        var collision = false;
        var ind = 0;
        for (var g = 0; g < this.view.obj.tabGal.length; g++) {
          if (new ToolBox().detectCollision(this.view.obj.tabGal[g], new ToolBox().calculThreeCoord(this.mouse, camera))) {
            collision = true;
            ind = g + 0;
          }
        }
        if (collision) {
          var t = this.view.obj.tabGal[ind].DrawHoover(this.scene);
          this.setState({ currentObj: this.view.obj.tabGal[ind].tag });
          if (t !== undefined) {
            hoovered.push(t);
          }
        } else {
          for (var i = 0; i < hoovered.length; i++) {
            this.scene.remove(hoovered[i]);
            this.setState({ currentObj: this.view.layer });
          }
          hoovered = [];
          for (var j = 0; j < this.view.obj.tabGal.length; j++) {
            this.view.obj.tabGal[j].hoovered = false;
          }
        }
        if (intersects.length === 0) {
          for (var x = 0; x < this.view.obj.tabGal.length; x++) {
            this.view.obj.tabGal[x].MoveGalaxie();
            for (var y = 0; y < this.view.obj.tabGal[x].tabSS.length; y++) {
              this.view.obj.tabGal[x].tabSS[y].MoveSystemeSolaire();
            }
          }
        }
        else {

          for (let i = 0; i < intersects.length; i++) {  //regarde pour chaque objet si on est dessus
          }
        }
      } else if (this.view.layer === "galaxie") {
        collision = false;
        ind = 0;
        for (g = 0; g < this.view.obj.tabSS.length; g++) {
          if (new ToolBox().detectCollision(this.view.obj.tabSS[g], new ToolBox().calculThreeCoord(this.mouse, camera))) {
            collision = true;
            ind = g + 0;
          }
        }
        if (collision) {
          t = this.view.obj.tabSS[ind].DrawHoover(this.scene);
          this.setState({ currentObj: this.view.obj.tabSS[ind].tag });
          if (t !== undefined) {
            hoovered.push(t);
          }
        } else {
          for (i = 0; i < hoovered.length; i++) {
            this.scene.remove(hoovered[i]);
          }
          hoovered = [];
          for (j = 0; j < this.view.obj.tabSS.length; j++) {
            this.view.obj.tabSS[j].hoovered = false;
            this.setState({ currentObj: this.view.layer });
          }
        }
        if (intersects.length === 0) {
          for (x = 0; x < this.view.obj.tabSS.length; x++) {
            this.view.obj.tabSS[x].MoveSystemeSolaire();
          }
          this.view.obj.MoveGalaxie();
        }
        else {
          for (let i = 0; i < intersects.length; i++) {  //regarde pour chaque objet si on est dessus
          }
        }
      } else if (this.view.layer === "systemeSolaire") {
        this.setState({ ChatBox: "none" });
        //gestion du mouvement 
        if (intersects.length === 0) {
          this.view.obj.MoveSystemeSolaire();
          this.setState({ currentObj: this.view.layer });
        }
        else {
          for (let i = 0; i < intersects.length; i++) {  //regarde pour chaque objet si on est dessus
            if (intersects[0].object.name !== "sun") {
              this.view.obj.setPlaneteUnderMouse(intersects[0].object);
              this.setState({ currentObj: this.view.obj.getPltunderMouse().tag });
            }
          }
        }
      } else if (this.view.layer === "planete") {
        this.setState({ ChatBox: "" });
        if (intersects.length === 0) {
          new ToolBox().rotatePlanete(this.view.obj);
        }
        else {
          for (let i = 0; i < intersects.length; i++) {  //regarde pour chaque objet si on est dessus
          }
        }
      }
      renderer.render(this.scene, camera);
    };
    animate();

  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} >
        <div> <Header childToParent5={this.childToParent5} display={this.state.display} /></div>
        <SearchBar childToParent4={this.childToParent4} />
        <ChatBox title={this.state.currentObj} display={this.state.ChatBox} />
        <CreateTopic display={this.state.topic} childToParent3={this.childToParent3} />
        <Footer childToParent2={this.childToParent2} childToParent={this.childToParent} currentObj={this.state.currentObj} />
      </div>
    )
  }



}

class Planete {
  constructor(couleur, distBySun, vit, taille, tag) {
    this.couleur = couleur;
    this.distBySun = distBySun;
    this.vit = vit;
    this.taille = taille;
    this.planete = "";
    this.tag = tag;
  }

  /**
   * 
   * @param {*} scene 
   * @returns obj
   * creer et ajoute a la scene une planete
   */
  DrawPlanete(scene) {
    var geometry = new THREE.SphereGeometry(this.taille, 32, 16);
    var material = new THREE.MeshPhongMaterial({ color: this.couleur });
    var planete = new THREE.Mesh(geometry, material);
    scene.add(planete);
    planete.translateX(this.distBySun);
    this.planete = planete;
    return planete;
  }

}

class SystemeSolaire {
  constructor(sun, centre2D, tabP, couleurLight, vit, tag) {
    this.sun = sun;
    this.centre2D = centre2D;
    this.tabP = tabP;
    this.couleurLight = couleurLight;
    this.SystemeSolaireRing = [];
    this.SystemeSolairePlanete = [];
    this.radius = 0;
    this.vit = 0.1;
    this.sunLength = 0;
    this.tabLight = [];
    this.hoovered = false;
    this.planeteUnderMouse = '';
    this.initRadius();
    this.tag = tag;
  }
  /**
   * 
   * @param {THREE.obj} plt 
   * permet de stocker la valeur de la planete sous le raycaster
   */
  setPlaneteUnderMouse(plt) {
    this.planeteUnderMouse = plt;
  }

  /**
   * 
   * @returns Planete
   * recupere et retourne la valeur de l'objet planete pour l'objet three.js stocké
   */
  getPltunderMouse() {
    var res = '';
    for (var i = 0; i < this.tabP.length; i++) {
      if (this.planeteUnderMouse === this.tabP[i].planete) {
        res = this.tabP[i];
      }
    }
    return res;
  }
  /**
   * 
   * @param {*} scene 
   * genere les lumieres d'un systeme solaire
   */
  initLight(scene) { //deplacer les lumieres ? 
    var light = new THREE.PointLight('white', 1.4, 100);
    light.position.set(this.centre2D.x + this.sunLength + 1, this.centre2D.y, 0);
    scene.add(light);
    this.tabLight.push(light);

    var light2 = new THREE.PointLight('white', 1.4, 100);
    light2.position.set(this.centre2D.x, this.centre2D.y + this.sunLength + 1, 0);
    scene.add(light2);
    this.tabLight.push(light2);

    var light3 = new THREE.PointLight('white', 1.4, 100);
    light3.position.set(-(this.centre2D.x + this.sunLength + 1), this.centre2D.y, 0);
    scene.add(light3);
    this.tabLight.push(light3);

    var light4 = new THREE.PointLight('white', 1.4, 100);
    light4.position.set(this.centre2D.x, -(this.centre2D.y + this.sunLength + 1), 0);
    scene.add(light4);
    this.tabLight.push(light4);

    var light5 = new THREE.PointLight('yellow', 1.4, 100);
    light5.position.set(this.centre2D.x, this.centre2D.y, this.sunLength * 2);
    scene.add(light5);
    this.tabLight.push(light5);
  }
  /**
   * fait se deplacer les planetes d'un systeme solaire selon le centre de celui ci
   */
  MoveSystemeSolaire() {
    var axes = new THREE.Vector3(0, 0, 1);
    var tb = new ToolBox();
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      tb.rotateAboutPoint(this.SystemeSolairePlanete[i], new THREE.Vector3(this.centre2D.x, this.centre2D.y, 0), axes, this.tabP[i].vit * Math.PI / 180, "");
    }
    for (var j = 0; j < this.tabLight.length; j++) {
      tb.rotateAboutPoint(this.tabLight[j], new THREE.Vector3(this.centre2D.x, this.centre2D.y, 0), axes, this.tabP[0].vit * Math.PI / 180, "");
    }
  }
  /**
   * 
   * @param {SystemeSolaire} ss 
   * @returns boolean
   * return true si le systemsolaire en parametre est en collision avec le centre
   */
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
  /**
   * 
   * @param {*} scene 
   * @returns SystemSolaire
   * creer et ajoute a la scene un systeme solaire
   */
  DrawSystemeSolaire(scene) {
    var planete;
    this.sun = this.DrawSun(scene);
    var ssplt = [];
    for (let a = 0; a < this.tabP.length; a++) {
      // ring = this.DrawRing(this.tabP[a].distBySun, this.centre2D, scene);
      //  this.SystemeSolaireRing.push(ring);
      planete = this.tabP[a].DrawPlanete(scene);
      planete.translateX(this.centre2D.x);
      planete.translateY(this.centre2D.y);
      ssplt.push(planete);
    }
    this.SystemeSolairePlanete = ssplt;
    this.initLight(scene);
    return this;
  }
  /**
   * 
   * @param {*} scene 
   * @returns Three.obj
   * creer et ajoute un soleil au systeme solaire
   */
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
    soleil.name = "sun";
    scene.add(soleil);
    soleil.translateX(this.centre2D.x);
    soleil.translateY(this.centre2D.y);
    return soleil;
  }
  /**
   * Calcul la taille du radius du systeme solaire
   */
  initRadius() {
    for (var i = 0; i < this.tabP.length; i++) {
      if (this.tabP[i].distBySun > this.radius - this.tabP[i].taille) {
        this.radius = this.tabP[i].distBySun + this.tabP[i].taille;
      }
    }
  }
  /**
   * 
   * @param {int} x 
   * permet de translater selon l'axe x un systeme solaire entier
   */
  TranslateX(x) {
    this.sun.translateX(x);
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      this.SystemeSolairePlanete[i].translateX(x);
    }
    for (var j = 0; j < this.SystemeSolaireRing.length; j++) {
      this.SystemeSolaireRing[j].translateX(x);
    }
  }
  /**
   * 
   * @param {int} y 
   * permet de translater selon l'axe y un systeme solaire entier
   */
  TranslateY(y) {
    this.sun.translateY(y);
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      this.SystemeSolairePlanete[i].translateY(y);
    }
    for (var j = 0; j < this.SystemeSolaireRing.length; j++) {
      this.SystemeSolaireRing[j].translateY(y);
    }
  }
  /**
   * 
   * @param {Position2D} center 
   * fais tourner autour d'un point le systeme solaire entier 
   */
  RotateAboutPointSS(center) {
    var axes = new THREE.Vector3(0, 0, 1);
    var tb = new ToolBox();
    this.centre2D = tb.rotateAboutPoint(this.sun, new THREE.Vector3(center.x, center.y, 0), axes, this.vit * Math.PI / 180, "");
    for (var i = 0; i < this.SystemeSolairePlanete.length; i++) {
      tb.rotateAboutPoint(this.SystemeSolairePlanete[i], new THREE.Vector3(center.x, center.y, 0), axes, this.vit * Math.PI / 180, "");
    }
  }
  /**
   * 
   * @param {*} scene 
   * @returns Three.obj
   * creer et affiche le hoovering 
   */
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

class Galaxie {
  constructor(centre2D, taille, forme, tabSS, couleurLight, tag) {
    this.centre2D = centre2D;
    this.radius = 0;
    this.taille = taille;
    this.forme = forme;
    this.tabSS = tabSS;
    this.couleurLight = couleurLight;
    this.tabEtoile = [];
    this.tabSS = [];
    this.hoovered = false;
    this.tag = tag;
  }
/**
 * determine le radius d'une galaxie
 */
  initRadius() {
    this.radius = new ToolBox().DistanceEntreDeuxpoint(this.centre2D, this.tabSS[this.tabSS.length - 1].centre2D) + this.tabSS[this.tabSS.length - 1].radius + 100;
  }
/**
 * 
 * @param {*} scene 
 * @returns Three.obj
 * creer et affiche le soleil d'une galaxie 
 */
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
/**
 * 
 * @param {SystemeSolaire[]} tab 
 * @param {SystemeSolaire} ss 
 * @returns boolean
 * return true si le systeme solaire ss est actuellement en collision avec un systeme solaire du tableau tab
 */
  GetCollision(tab, ss) {
    var res = false;
    for (var i = 0; i < tab.length; i++) {
      if (tab[i].GetCollision(ss)) {
        res = true;
      }
    }
    return res;
  }
/**
 * 
 * @param {SystemeSolaire} ss 
 * @returns boolean
 * return true si le systeme solaire ss est en collision avec le centre de la galaxie
 */
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
/**
 * 
 * @param {*} scene 
 * @param {Position2D} startPos 
 * @param {int} angleSize 
 * @param {int} step 
 * @returns SystemeSolaire[]
 * initialise et affiche l'ensemble des systemes solaires compris dans une galaxie
 */
  DrawBranchSS(scene, startPos, angleSize, step) {
    var fakeData = ["angular", "react", "javascript", "threejs", "ember", "svelte", "native-script", "typescript", "react-spring", "quasar", "ionic", "java", "python", "ia", "symfony", "laravel", "php"];
    var pltFakeData = ["Comment hover ?", "Input type='txt'", "Comment import une image ?", "Math.random ? ", "Faire une copie d'un array ?", "opérateur '===' ou '==' ?"];
    var tabSS = [];
    var tb = new ToolBox();
    var curveTab = [];
    for (var j = 1; j < angleSize * 4; j = j + 2) {
      var posL = tb.generateSpiralePoint(j, new Position2D(startPos.x + this.centre2D.x, startPos.y + this.centre2D.y));
      curveTab.push(new Vector2(posL.x, posL.y + this.centre2D.y));
    }
    var nb = 0;
    for (var i = 1; i < angleSize; i = i + step) {
      var pos = tb.generateSpirale(i, startPos);
      var ss = new SystemeSolaire("sun", new Position2D(this.centre2D.x + pos.x, this.centre2D.y + pos.y), [new Planete(new ToolBox().generateRandomColor(), 15, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), pltFakeData[0]), new Planete(new ToolBox().generateRandomColor(), 25, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), pltFakeData[1]), new Planete(new ToolBox().generateRandomColor(), 34, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), pltFakeData[2]), new Planete(new ToolBox().generateRandomColor(), 49, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), pltFakeData[3]), new Planete(new ToolBox().generateRandomColor(), 59, Math.random() * (0.6 - 0.2) + 0.2, new ToolBox().getRandomInt(1, 6), pltFakeData[4]),], "red", Math.random() * (0.1 - 0.01) + 0.01, "");
      if ((!this.GetCollision(tabSS, ss)) && (!this.isCollisionCenter(ss))) {
        ss = ss.DrawSystemeSolaire(scene);
        ss.tag = fakeData[nb];
        tabSS.push(ss);
        ss.TranslateY(pos.y);
        nb = nb + 1;
      }

    }
    this.tabSS = tabSS;
    this.initRadius();
    return tabSS;
  }

/**
 * permet de faire tourner l'ensemble des sytemes solaire autour du centre de la galaxie
 */
  MoveGalaxie() {
    for (var i = 0; i < this.tabSS.length; i++) {
      this.tabSS[i].RotateAboutPointSS(this.centre2D);
    }
  }
/**
 * 
 * @param {*} scene 
 * @returns Three.obj
 * Dessine le hoover d'une galaxie
 */
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
/**
 * 
 * @param {*} scene 
 * creer et affiche un univers 
 */
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

/**
 * 
 * @param {int} angleSize 
 * @returns Position2D
 * permet de generer les points d'une spirale de euler
 */
  generateSpirale(angleSize) { //angleSize a utilisé dans une boucle 360 ou 720 etc 
    var angle = (Math.random() * angleSize + 10);
    var x = (angle) * Math.cos(angle);
    var y = (angle) * Math.sin(angle);
    return new Position2D(x, y)
  }
/**
 * 
 * @param {int} angleSize 
 * @param {int} startPos 
 * @returns Position2D
 * permet de genere des points en fonction d'une position de depart selon une spirale de euler
 */
  generateSpiralePoint(angleSize, startPos) { //angleSize a utilisé dans une boucle 360 ou 720 etc 
    var angle = 0.1 * angleSize;
    var x = (startPos.x + angle) * Math.cos(angle);
    var y = (startPos.y + angle) * Math.sin(angle);
    return new Position2D(x, y)
  }
/**
 * 
 * @returns string
 * return une couleur au hasard
 */
  generateRandomColor() {
    var c = ['purple', 'blue', 'red', 'green', 'darkorange', 'pink', 'brown']
    var r = new ToolBox().getRandomInt(0, 6);
    return c[r];
  }
/**
 * 
 * @param {int} min 
 * @param {int} max 
 * @returns int
 * renvoie un entier aleatoire compris entre min et max inclus
 */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
/**
 * 
 * @param {Galaxie} galaxie 
 * @param {Position2D} mouse 
 * @returns boolean
 * renvoie vrai si la position de X est à l'interieur du radius de la galaxie
 */
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
/**
 * 
 * @param {Position2D} mouse 
 * @param {*} camera 
 * @returns Position2D
 * permet de calculer les coordonnées dans un autre systeme de visualisation que celui de l'eventHandler a fin de les faires correspondre a celle de three.js
 */
  calculThreeCoord(mouse, camera) {
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return pos;
  }
/**
 * 
 * @param {int} a 
 * @returns int
 * fonction ^2
 */
  sqr(a) {
    return a * a;
  }
/**
 * 
 * @param {Position2D} coord1 
 * @param {Position2D} coord2 
 * @returns int
 * renvoie la distance entre deux points dans un espace 2D
 */
  DistanceEntreDeuxpoint(coord1, coord2) {
    return Math.sqrt(this.sqr(coord2.y - coord1.y) + this.sqr(coord2.x - coord1.x));
  }
/**
 * 
 * @param {Three.obj} obj
 * fais rotationner un objet Three.js sur lui même 
 */
  rotatePlanete(obj) {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  }

}


class Position2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}