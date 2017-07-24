<template>
  <div>
    <div class="container">
        <div>
            <button class="btn" v-on:click="get_snapshot" type="button">
                <i class="fa  fa-camera fa-2x" aria-hidden="true"></i>
            </button>
            <button class="btn" v-on:click="get_video" type="button">
                <i class="fa fa-video-camera fa-2x" aria-hidden="true"></i>
            </button>
        </div>
        <div v-if="snapshotFile!=''">
            <img v-if="screen_with<800" :src='snapshotFile' width="300" height="300"/>
            <img v-if="screen_with>800" :src='snapshotFile' width="600" height="600"/>
            <br />
            <br />
        </div>
        <div v-if="videoFile!=''">
            <div v-html="videoFile" ></div>
        </div>
        <div v-if="snapshot==get_state.waiting||video==get_state.waiting">
            <!-- <img src="../assets/camera_still.jpg" width="300" height="457"/> -->
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            <br />&nbsp;
            <div v-if="snapshot==get_state.waiting">
               Taking a new photo ..
            </div>
            <div v-if="video==get_state.waiting">
                Taking a new video ..
            </div>
            <br />&nbsp;
        </div>
        <div v-if="snapshot==get_state.error||videoFile==get_state.error">
            <i class="fa fa-thumbs-down fa-2x" aria-hidden="true"></i>
            <br />&nbsp;
            {{error_message}}
            <br />&nbsp;
        </div>
        {{error_message}}

        <div class="row" align="left">
          <!-- <input type="checkbox" v-model="showRangeFinder">
          <label for="checkbox">Show Sliders</label> -->

      </div>
          <div class="row" >
              <div class="panelbottom">
                  <hr>
                  <input id="rgb_red" type="number" v-model="rgb_red" style="background-color: red;color: white;width: 60px">
                  <input type="number"  v-model="rgb_green" style="background-color: green;color: white;width: 60px">&nbsp;&nbsp;
                  <input type="number"  v-model="rgb_blue" style="background-color: blue;color: white;width: 60px">&nbsp;&nbsp;&nbsp;&nbsp;
                  <button  class="btn"  v-on:click="set_color('black')" type="button" style="background-color: black">
                      &nbsp;
                  </button>
                  <button  class="btn"  v-on:click="set_color('white')" type="button" style="background-color: white">
                      &nbsp;
                  </button>
                  <button  class="btn"  v-on:click="set_color('red')" type="button" style="background-color: red">
                      &nbsp;
                  </button>
                  <button  class="btn"  v-on:click="set_color('green')" type="button" style="background-color: green">
                      &nbsp;
                  </button>
                  <button  class="btn"  v-on:click="set_color('blue')" type="button" style="background-color: blue">
                      &nbsp;
                  </button>
                  <button  class="btn"  v-on:click="set_color('purple')" type="button" style="background-color: purple">
                      &nbsp;
                  </button>
                  <span class="label label-danger">Animation</span>
                  <button  class="btn applyBtn"  v-on:click="extraCommand('rain00000')" type="button">
                      <span class="label label-danger">Rain</span>
                  </button>
                  <button  class="btn applyBtn"  v-on:click="extraCommand('random000')" type="button">
                      <span class="label label-danger">Random</span>
                  </button>
                  <button  class="btn applyBtn"   v-on:click="extraCommand('pulse0000')" type="button">
                      <span class="label label-danger">Pulse</span>
                  </button>
                  <hr>
                  <button  class="btn applyBtn"  v-on:click="light_on" type="button">
                      Apply
                      <span v-html="get_html3()"></span>
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button  class="btn" v-on:click="select_all()" type="button">
                      Select:<br />
                      <select id="mySelect" >
                          <option value="All">All</option>
                          <option value="None">None</option>
                          <option value="Top Level">Top Level</option>
                          <option value="3rd Level">3rd Level</option>
                          <option value="2nd  Level">2nd  Level</option>
                          <option value="Bottom Level">Bottom Level</option>
                          <option value="Random">Random</option>
                          <option value="Cube">Cube</option>
                      </select>
                  </button>


        </div>
          <table class="table">
              <thead>
              <tr>
                  <!--  <th class="nighttime">{{events.records.length}} Events</th> -->
                  <th>Select</th>
                  <th>X</th>
                  <th>Y</th>
                  <th>Z</th>
                  <th>Red</th>
                  <th>Green</th>
                  <th>Blue</th>
              </tr>
              </thead>
              <tbody>
              <tr  v-for="led in leds.LEDS">
                  <td><input type="checkbox"  v-model="led.S"></td>
                  <td>{{led.X}} </td>
                  <td>{{led.Y}} </td>
                  <td>{{led.Z}} </td>
                  <td>{{led.R}} </td>
                  <td>{{led.G}} </td>
                  <td>{{led.B}} </td>

              </tr>
              </tbody>
          </table>
        <!--
         <td v-html="get_html3()"></td>
        <button type="button"  class="btn btn-danger"  v-on:click="goodbye">
            <h4>さよなら </h4>
        </button>
        -->
      </div> <!-- <div class="row"> -->

    </div> <!-- <div class="container"> -->
  </div>
</template>

<script>

    import RangeSlider from 'vue-range-slider'
    import 'vue-range-slider/dist/vue-range-slider.css'
    import store from 'src/store'


    export default {
        name: 'hello',
        components: {
            RangeSlider,
            store
        },
        data: function() {
            return {
                //get_state: {none:-2, error: -1,waiting: 0,done: 1},

                snapshot: 0,
                video: 0,
                error_message: "",
                snapshotObject: {},
                videoObject: {},
                showRangeFinder: false,
                rgb_red: 0,
                rgb_green: 0,
                rgb_blue: 0,
                thecube: {"datalength":"22","data":"{0000330FF}{111FF0000}"} ,
                leds: {"LEDS":[

                    {"S":"true","X":"0","Y":"0","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"0","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"0","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"0","Z":"3","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"1","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"1","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"1","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"1","Z":"3","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"2","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"2","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"2","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"2","Z":"3","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"3","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"3","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"3","Z":"3","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"3","Z":"3","R":"0","G":"0","B":"0"},

                    {"S":"true","X":"0","Y":"0","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"0","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"0","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"0","Z":"2","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"1","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"1","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"1","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"1","Z":"2","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"2","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"2","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"2","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"2","Z":"2","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"3","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"3","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"3","Z":"2","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"3","Z":"2","R":"0","G":"0","B":"0"},

                    {"S":"true","X":"0","Y":"0","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"0","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"0","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"0","Z":"1","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"1","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"1","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"1","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"1","Z":"1","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"2","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"2","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"2","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"2","Z":"1","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"3","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"3","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"3","Z":"1","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"3","Z":"1","R":"0","G":"0","B":"0"},

                    {"S":"true","X":"0","Y":"0","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"0","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"0","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"0","Z":"0","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"1","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"1","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"1","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"1","Z":"0","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"2","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"2","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"2","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"2","Z":"0","R":"0","G":"0","B":"0"},
                    {"S":"true","X":"0","Y":"3","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"1","Y":"3","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"2","Y":"3","Z":"0","R":"0","G":"0","B":"0"},{"S":"true","X":"3","Y":"3","Z":"0","R":"0","G":"0","B":"0"}
                ]
                },
            }
        },
        computed: {
            get_state: function () {
                return {"none": 0, "waiting": 1, "done": 2, "error":3};
            },
            screen_with: function() {
                return screen.width;
            },
            snapshotFile: function () {
                if (this.snapshotObject == undefined)
                    return "";
                if (this.snapshotObject.hasOwnProperty('filename')) {
                    return "http://220.244.249.125:8085/images/" + this.snapshotObject.filename;
                }
                else
                    return "";
            },
            videoFile: function () {
                if (this.videoObject == undefined)
                    return "";
                if (this.videoObject.hasOwnProperty('filename'))
                    if ("NOKEYS" == this.videoObject.filename)
                        return '<img src="http://220.244.249.125:8085/camera_still.jpg" width="300" height="457"/>';
                    else {
                        var _src = "http://220.244.249.125:8085/images/"+this.videoObject.filename;
                        var w = "400";
                        var h = "225";
                        if (screen.width >= 800 ) {
                            w = "800";
                            h = "450";
                        };
                        var _html =
                            '<video width="'+w+'" height="'+h+'" controls autoplay>'+
                            '<source src="'+_src+'" type="video/mp4"> '+
                            'Your browser does not support the video tag.'+
                            '</video>';
                        return _html;
                    }
                else
                    return "";
            },
        },
        created: function () {
            this. readLocalStorage();
            this.get_snapshot();
            for (var i = 0; i < this.leds.LEDS.length; i++) {
                var led = this.leds.LEDS[i];
                led.S = true;
            }
        },
        methods: {
            get_snapshot() {
                //get_state: {none:-2, error: -1,waiting: 0,done: 1},
                this.snapshot = this.get_state.waiting;
                this.video = this.get_state.none;
                this.snapshotObject = {};
                this.videoObject = {};
                var _url = "http://220.244.249.125:8085/camera.php";
                console.log(_url);
                this.$http.get(_url)
                    .then(function (response) {
                        this.snapshot = this.get_state.done;
                        console.log(response.body);
                        this.snapshotObject = response.body;
                    })
                    .catch(function (response) {
                        console.log(response);
                        this.error_message = "Get Photo: Failed";
                        console.log("Photo failed");
                        this.snapshot = this.get_state.error;
                    });
            },
            get_video() {
                this.snapshot = this.get_state.none;
                this.video = this.get_state.waiting;
                this.snapshotObject = {};
                this.videoObject = {};
                var _url = "http://220.244.249.125:8085/video.php?duration=10";
                console.log(_url);
                this.snapshotObject = {};
                this.videoObject = {};
                this.$http.get(_url)
                    .then(function (response) {
                        this.video = this.get_state.done;
                        console.log(response.body);
                        this.videoObject = response.body;
                    })
                    .catch(function (response) {
                        console.log(response);
                        this.error_message = "Get video: Failed";
                        console.log("Video failed");
                        this.video = this.get_state.error;
                    });
            },
            set_color(color_name) {
                this.rgb_blue = 0;
                this.rgb_green = 0;
                this.rgb_red = 0;
                if (color_name == 'white') {
                    this.rgb_blue = 255;
                    this.rgb_green = 255;
                    this.rgb_red = 255;
                };
                if (color_name == 'red') {
                    this.rgb_red = 255;
                };
                if (color_name == 'green') {
                    this.rgb_green = 255;
                };
                if (color_name == 'blue') {
                    this.rgb_blue = 255;
                };
                if (color_name == 'purple') {
                    this.rgb_blue = 255;
                    this.rgb_red = 130;
                };
                if (color_name == 'randome') {
                    this.rgb_blue = Math.floor((Math.random() * 255) + 1);
                    this.rgb_green = Math.floor((Math.random() * 255) + 1);
                    this.rgb_red = Math.floor((Math.random() * 255) + 1);
                };


            },
            get_html2() {
                var _html2 = '<canvas id="myCanvas2" width="80" height="40" style="background-color: #';
                _html2 = _html2.concat(this.get_rgb_string_from_screen());
                _html2 = _html2.concat('"></canvas>');
                return _html2;
            } ,
            get_html3() {
                var _html2 = '<br /><canvas class="myCanvas3"  width="60" height="20" style="background-color: #';
                _html2 = _html2.concat(this.get_rgb_string_from_screen());
                _html2 = _html2.concat('"></canvas>');
                return _html2;
            } ,
            random_random() {
                this.select_all("Random");
                this.rgb_blue = Math.floor((Math.random() * 255) + 1);
                this.rgb_green = Math.floor((Math.random() * 255) + 1);
                this.rgb_red = Math.floor((Math.random() * 255) + 1);
                this.light_on();
            },
            get_rgb_string_from_screen() {
               return this.get_rgb_string(this.rgb_red, this.rgb_green, this.rgb_blue);
            },
            get_rgb_string(r,g,b) {
              r = Math.floor(r);
              g = Math.floor(g);
              b = Math.floor(b);
              var hexString = r.toString(16);
              if (r < 16)
                  hexString = '0'.concat(hexString);
              if (g < 16)
                  hexString = hexString.concat('0',g.toString(16));
              else
                  hexString = hexString.concat(g.toString(16));
              if (b < 16)
                  hexString = hexString.concat('0',b.toString(16));
              else
                  hexString = hexString.concat(b.toString(16));
              hexString = hexString.toUpperCase();
              return hexString;
            },
            make_led_command(x,y,z,r,g,b) { //{rain00000} {random000} {400000000}
                var led =x.toString().concat(y.toString(),z.toString());
                var cmd = "%7B".concat(led,this.get_rgb_string(r,g,b),"%7D");
                return cmd;
            },
            led_to_commands() {
              var CountNotSelected = 0;
              var return_commands = "";
              for (var i = 0; i < this.leds.LEDS.length; i++) {
                  var led = this.leds.LEDS[i];
                  if (led.S == true) {
                      return_commands = return_commands.concat( this.make_led_command(led.X,led.Y,led.Z,led.R, led.G, led.B));
                  }
                  else {
                      CountNotSelected++;
                  }
              }
              if (CountNotSelected ==0) {
                  led = this.leds.LEDS[0];
                  return_commands = "%7B".concat("400",this.get_rgb_string(led.R, led.G, led.B),"%7D");
              }
              return return_commands;
            },
            select_all(sender_state) {
                var state = false;
                var s = document.getElementById("mySelect").value;
                if (s == "All") state = true;
                if (s == "None") state = false;
                var z_level = -1;
                if (s == "Top Level") z_level = 3;
                if (s == "3rd Level") z_level = 2;
                if (s == "2nd  Level") z_level = 1;
                if (s == "Bottom Level") z_level = 0;
                if (s == "Random") z_level = 4;
                if (s == "Cube") z_level = 5;

                if (sender_state == "Random") z_level = 4;
                z_level = Math.floor(z_level);

                for (var i = 0; i < this.leds.LEDS.length; i++) {
                    var led = this.leds.LEDS[i];
                    if (z_level > -1) {
                        state = false;
                        if (led.Z == z_level) state = true;
                        if (z_level == 4) {
                            state = false;
                            if (Math.floor((Math.random() * 10) + 1) > 5 ) state = true;
                        };
                        if (z_level == 5) {
                            state = false;
                            if (led.Z == 3 & (led.Y == 0 | led.Y ==3)) state = true;
                            if (led.Z == 0 & (led.Y == 0 | led.Y ==3)) state = true;
                            if (led.X == 0 &  led.Z ==0) state = true;
                            if (led.X == 3 &  led.Z ==0) state = true;
                            if (led.X == 0 &  led.Z ==3) state = true;
                            if (led.X == 3 &  led.Z ==3) state = true;

                            if (led.Y == 0 &  led.X ==0) state = true;
                            if (led.Y == 0 &  led.X ==3) state = true;
                            if (led.Y == 3 &  led.X ==0) state = true;
                            if (led.Y == 3 &  led.X ==3) state = true;
                        }

                    };
                    led.S = state;
                }
            },
            set_cube_color (r,g,b) {
                for (var i = 0; i < this.leds.LEDS.length; i++) {
                    var led = this.leds.LEDS[i];
                    led.R = r;
                    led.G = g;
                    led.B = b;
                }
            },
            set_led_color(x,y,z,r,g,b) {
                for (var i = 0; i < this.leds.LEDS.length; i++) {
                    var led = this.leds.LEDS[i];
                    if (led.X != x)
                        continue;
                    if (led.Y != y)
                        continue;
                    if (led.Z != z)
                        continue;
                    led.R = r;
                    led.G = g;
                    led.B = b;
                    return;
                }
            },
            goodbye() {
                window.open('','_parent','');
                window.close();
            },
            readLocalStorage() {

               // if(localStorage.getItem("ledsObject") != null) {
               //     this.leds = JSON.parse(localStorage.getItem('ledsObject'));
               // };
                if(localStorage.getItem("rgb_red") != null) {
                    this.rgb_red = localStorage.getItem('rgb_red');
                };
                if(localStorage.getItem("rgb_green") != null) {
                    this.rgb_green = localStorage.getItem('rgb_green');
                };
                if(localStorage.getItem("rgb_blue") != null) {
                    this.rgb_blue = localStorage.getItem('rgb_blue');
                };

            },
            extraCommand (xCommand) {
                var _url = "http://220.244.249.125:8085/cube.php?d=".concat("%7B",xCommand,"%7D");
                console.log(_url);
                this.$http.get(_url)
                    .then(function (response) {
                        // console.log(response.body)
                        this.thecube = response.body;
                        this. get_video();
                    })
                    .catch(function (response) {
                        alertify.warning("thecube failed");
                    });
            },
            light_on() {
               this.set_cube_color(this.rgb_red, this.rgb_green, this.rgb_blue);
               //this.set_led_color(3,1,1,255,0,0);
               //this.set_led_color(2,2,1,0,255,0);
              // store.commit('setleds', this.leds);
               store.commit('set_rgb_red',this.rgb_red);
               store.commit('set_rgb_green',this.rgb_green);
               store.commit('set_rgb_blue',this.rgb_blue);
               var _url = "http://220.244.249.125:8085/cube.php?d=".concat(this.led_to_commands());
               // console.log(_url)
                this.$http.get(_url)
                    .then(function (response) {
                       // console.log(response.body)
                        this.thecube = response.body;
                        this.get_snapshot();
                    })
                    .catch(function (response) {
                        alertify.warning("thecube failed");
                    });
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .badge {
        margin-right: 50px;
    }
    button {
        margin-top: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    input:checked {
       background-color: black;
        height: 20px;
    }
    input:focus {
        border-color: black;
        border-width: 5px;
    }
    .panelbottom {
        border-width: 3px;
        border-radius : 10px;
    }
    img {
        border-color: black;
        border-width: 3px;
        border-radius : 20px;
    }
    .applyBtn {
        background-color: lightyellow;
        border-color: black;
        border-width: 3px;
        border-radius : 10px;
    }
    th {
    text-align: center;
   }
  .evenlevel {
      background: lightyellow;
  }
  .oddlevel {
     background: lightcyan;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  .fa-bars, .fa-camera-retro, .fa-hand-spock-o, .switchon, .fa-power-off {
    cursor: pointer;
  }
  a {
    color: #42b983;
  }
  .bigbutton {
    width: 90px;
    height: 90px;
    font-size: large;
  }
  .badge {
    width: 50px;
    margin-left: 5px;
  }
  .panelbottom {
    background-color: darkgray;
  }
  input {
    width: 100px;
  }
</style>