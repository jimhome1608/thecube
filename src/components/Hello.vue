<template>
  <div>
    <div class="container">
        <div class="row" align="left">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select:
            <select class="selectpicker" id="mySelect">
                <option>All</option>
                <option>None</option>
                <option>Top Level</option>
                <option>3rd Level</option>
                <option>2nd Level</option>
                <option>Bottom Level</option>
                <option>Cube</option>
                <option>Random</option>
            </select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Photo:
            <button class="btn" v-on:click="get_snapshot" type="button">
            <i class="fa  fa-camera" aria-hidden="true"></i>
            </button>
            Video:
            <button class="btn" v-on:click="get_video" type="button">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
            </button>
        </div>
        <table class="table">
            <tbody>
            <tr>
                <td width="75px" align="left">
                    <span class="label label-default">RGB Color</span>
                    <br />
                    <input id="rgb_red" type="number" v-model="rgb_red" style="background-color: red;color: white;width: 60px">
                    <br />
                    <input type="number"  v-model="rgb_green" style="background-color: green;color: white;width: 60px">
                    <input type="number"  v-model="rgb_blue" style="background-color: blue;color: white;width: 60px">
                    <button  class="btn" v-on:click="add_color">
                        &nbsp;
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;
                    </button>
                    <br />
                    <br />
                    <button  class="btn"  id="btnRed" v-on:click="set_color('red')" type="button" style="background-color: red;height: 20px; width: 20px;">
                        &nbsp;
                    </button>
                    <button  class="btn"  id="btnGreen" v-on:click="set_color('green')" type="button" style="background-color: green;height: 20px; width: 20px;">
                        &nbsp;
                    </button>
                    <button  class="btn"  id="btnBlue" v-on:click="set_color('blue')" type="button" style="background-color: blue;height: 20px; width: 20px;">
                        &nbsp;
                    </button>

                    <button  class="btn"  v-on:click="set_color('purple')" type="button" style="background-color: purple;height: 20px; width: 20px;">
                        &nbsp;
                    </button>
                    <button  class="btn"  v-on:click="set_color('yellow')" type="button" style="background-color: yellow;height: 20px; width: 20px;">
                    &nbsp;
                    </button>

                    <button  class="btn"  v-on:click="set_color('orange')" type="button" style="background-color: orange;height: 20px; width: 20px;">
                        &nbsp;
                    </button>
                    <button  class="btn"  v-on:click="set_color('turquoise')" type="button" style="background-color: turquoise;height: 20px; width: 20px;">
                        &nbsp;
                    </button>
                    <button  class="btn"  v-on:click="set_color('salmon')" type="button" style="background-color: salmon;height: 20px; width: 20px;">
                        &nbsp;
                    </button>
                    <button  class="btn"  v-on:click="set_color('white')" type="button" style="background-color: white;height: 20px; width: 20px;">
                        &nbsp;
                    </button>
                    <button  class="btn"  v-on:click="set_color('black')" type="button" style="background-color: black;height: 20px; width: 20px;">
                        &nbsp;
                    </button>


                    <br />
                    <button  class="btn"  v-on:click="light_on" type="button">
                        <span v-html="get_html3()"></span>
                    </button>
                    <br /> <br />
                    <span class="label label-danger">Animation</span>
                    <button  class="btn"  v-on:click="extraCommand('rain00000')" type="button">
                        <span class="label label-danger">Rain</span>
                    </button>
                    <button  class="btn"  v-on:click="extraCommand('random000')" type="button">
                        <span class="label label-danger">Rand</span>
                    </button>
                    <button  class="btn"   v-on:click="extraCommand('pulse0000')" type="button">
                        <span class="label label-danger">Pulse</span>
                    </button>
                </td>
                <td  align="left">
                    <div v-if="snapshotFile!=''">
                        <img  :src='snapshotFile' width="100%" />
                        <br />
                        <br />
                    </div>
                    <div v-if="videoFile!=''">
                        <div v-html="videoFile" ></div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

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
        <div v-if="snapshot==get_state.error||video==get_state.error">
            <i class="fa fa-thumbs-down fa-2x" aria-hidden="true"></i>
            <br />&nbsp;
            <div v-html="error_message" ></div>
            <br />&nbsp;
        </div>

        <div class="row" align="center">

            <br />
            <hr>
            <input type="checkbox" v-model="show_leds">
            <label for="checkbox">Show Leds</label>
          <table v-if="show_leds" class="table">
              <thead>
              <tr>
                  <!--  <th class="nighttime">{{events.records.length}} Events</th> -->
                  <th>
                  </th>
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
      </div> <!-- <div class="row"> -->

    </div> <!-- <div class="container"> -->
  </div>
</template>

<script>

    import store from 'src/store';


    export default {
        name: 'hello',
        components: {
            store
        },
        data: function() {
            return {
                show_leds: false,
                color: null,
                colors: [
                    '#1ba6cc',
                    '#189ba7',
                    '#98c6ae',
                    '#45a270',
                    '#7cb325',
                    '#eb9826',
                    '#7B1FA2',
                    '#FF5252'
                ],
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
                        var _html =
                            '<video width="100%" controls autoplay>'+
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
                        this.error_message = "Get Photo: Failed<br />".concat("Response: ",response.body);
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
                        this.error_message = "Get Video: Failed<br />".concat("Response: ",response.body);
                        console.log("Video failed");
                        this.video = this.get_state.error;
                    });
            },
            add_color() {
               alert("Add Color not implemted yet")
            },
            set_color(color_name) {
                if (color_name == 'black') {
                    this.rgb_blue = 0;
                    this.rgb_green = 0;
                    this.rgb_red = 0;
                };

                if (color_name == 'salmon') {
                    this.rgb_red = 250;
                    this.rgb_green = 128;
                    this.rgb_blue = 114;

                };
                if (color_name == 'turquoise') {
                    this.rgb_blue = 224;
                    this.rgb_green = 208;
                    this.rgb_red = 64;
                };
                if (color_name == 'orange') {
                    this.rgb_blue = 0;
                    this.rgb_green = 165;
                    this.rgb_red = 255;
                };
                if (color_name == 'yellow') {
                    this.rgb_blue = 255;
                    this.rgb_green = 0;
                    this.rgb_red = 255;
                };
                if (color_name == 'white') {
                    this.rgb_blue = 255;
                    this.rgb_green = 255;
                    this.rgb_red = 255;
                };
                if (color_name == 'red') {
                    this.rgb_blue = 0;
                    this.rgb_green = 0;
                    this.rgb_red = 255;
                };
                if (color_name == 'green') {
                    this.rgb_blue = 0;
                    this.rgb_green = 255;
                    this.rgb_red = 0;
                };
                if (color_name == 'blue') {
                    this.rgb_blue = 255;
                    this.rgb_green = 0;
                    this.rgb_red = 0;
                };
                if (color_name == 'purple') {
                    this.rgb_green = 0;
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
                var _html2 = '<i  class="fa fa-paint-brush fa-2x" style="color: #';
                _html2 = _html2.concat(this.get_rgb_string_from_screen());
                _html2 = _html2.concat('" aria-hidden="true"></i>');
                //var _html2 = '<canvas class="myCanvas3"  width="20" height="50px" style="border: 2px solid black; background-color: #';
                //_html2 = _html2.concat(this.get_rgb_string_from_screen());
                //_html2 = _html2.concat('"></canvas>');
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
                  return_commands = "%7B".concat("444",this.get_rgb_string(led.R, led.G, led.B),"%7D");
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
                if (s == "2nd Level") z_level = 1;
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
               this.select_all();
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

    input:checked {
       background-color: black;
        height: 20px;
    }
    input:focus {
        border-color: black;
        border-width:2px;
    }
    img {
        border-color: black;
        border-width: 3px;
        border-radius : 20px;
    }
    .btn {
        border-color: black;
        border-width: 1px;
    }
    th {
    text-align: center;
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
  a {
    color: #42b983;
  }
  input {
    width: 100px;
  }
</style>