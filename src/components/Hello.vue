<template>
  <div>
    <div class="container">
      <div class="row">
          <input type="checkbox" v-model="showRangeFinder">
          <label for="checkbox">Show Sliders</label>
        <div v-if="showRangeFinder==true">
            <range-slider
                    class="slider"
                    min="0"
                    max="255"
                    step="5"
                    v-model="rgb_red">
            </range-slider>
            <span class="badge" style="background-color: red;">{{rgb_red}}</span>
            <br />
            <br />
            <range-slider
                    class="slider"
                    min="0"
                    max="255"
                    step="5"
                    v-model="rgb_green">
            </range-slider>
            <span class="badge" style="background-color: green;">{{rgb_green}}</span>
            <br />
            <br />
            <range-slider
                    class="slider"
                    min="0"
                    max="255"
                    step="5"
                    v-model="rgb_blue">
            </range-slider>
            <span class="badge" style="background-color: blue;">{{rgb_blue}}</span>
            <br />
        </div>
        <br />
        <br />
        <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">

        <tr>
          <td height="150px" align="right">
            <div class="switchon h4" style="width: 80px;height: 80px" v-on:click="light_on"
                 v-html="get_html2()" >
            </div>

          </td>

          <td>
            <input type="number"  v-model="rgb_red">&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge" style="background-color: red;">{{rgb_red}}</span><br>
            <input type="number"  v-model="rgb_green">&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge" style="background-color: green;">{{rgb_green}}</span><br>
            <input type="number"  v-model="rgb_blue">&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge" style="background-color: blue;">{{rgb_blue}}</span><br>

          </td>
        </tr>
        </table>
        <br />
        <br />

        <div class="panelbottom">
          <hr>
          <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                  <button  class="btn"  v-on:click="light_on" type="button">
                      Apply
                  </button>
                    <span v-html="get_html3()"></span>
                </td>
                <td>
                    <button  class="btn" v-on:click="select_all()" type="button">
                        Select:&nbsp;
                        <select id="mySelect" >
                            <option value="All">All</option>
                            <option value="None">None</option>
                            <option value="Top Level">Top Level</option>
                            <option value="3rd Level">3rd Level</option>
                            <option value="2nd  Level">2nd  Level</option>
                            <option value="Bottom Level">Bottom Level</option>
                        </select>
                    </button>
                </td>

              <td>
                <button class="btn" v-on:click="goodbye" type="button">
                  Exit
                  <i class="fa  fa-hand-spock-o fa-2x" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </table>
          <hr>
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
            screen_with: function() {
                return screen.width;
            },
        },
        created: function () {
            this. readLocalStorage();
        },
        methods: {
            get_html2() {
                var _html2 = '<canvas id="myCanvas2" width="100" height="80" style="background-color: #';
                _html2 = _html2.concat(this.get_rgb_string_from_screen());
                _html2 = _html2.concat('"></canvas>');
                return _html2;
            } ,
            get_html3() {
                var _html2 = '<canvas class="myCanvas3" width="40" height="20" style="background-color: #';
                _html2 = _html2.concat(this.get_rgb_string_from_screen());
                _html2 = _html2.concat('"></canvas>');
                return _html2;
            } ,

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
            make_led_command(x,y,z,r,g,b) {
                var led =x.toString().concat(y.toString(),z.toString());
                var cmd = "%7B".concat(led,this.get_rgb_string(r,g,b),"%7D");
                return cmd;
            },
            led_to_commands() {
              var return_commands = "";
              for (var i = 0; i < this.leds.LEDS.length; i++) {
                  var led = this.leds.LEDS[i];
                  if (led.S == true) {
                      return_commands = return_commands.concat( this.make_led_command(led.X,led.Y,led.Z,led.R, led.G, led.B));
                  }
              }
              return return_commands;
            },
            select_all() {
                var state = false;
                var s = document.getElementById("mySelect").value;
                if (s == "All") state = true;
                if (s == "None") state = false;
                var z_level = -1;
                if (s == "Top Level") z_level = 3;
                if (s == "3rd Level") z_level = 2;
                if (s == "2nd  Level") z_level = 1;
                if (s == "Bottom Level") z_level = 0;
                z_level = Math.floor(z_level);

                for (var i = 0; i < this.leds.LEDS.length; i++) {
                    var led = this.leds.LEDS[i];
                    if (z_level > -1) {
                        console.log(led.Z);
                        state = false;
                        if (led.Z == z_level) state = true;
                    }
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
            light_on() {
               this.set_cube_color(this.rgb_red, this.rgb_green, this.rgb_blue);
               //this.set_led_color(3,1,1,255,0,0);
               //this.set_led_color(2,2,1,0,255,0);
               store.commit('setleds', this.leds);
               store.commit('set_rgb_red',this.rgb_red);
               store.commit('set_rgb_green',this.rgb_green);
               store.commit('set_rgb_blue',this.rgb_blue);
               var _url = "http://220.244.249.125:8085/cube.php?d=".concat(this.led_to_commands());
               console.log(_url)
                this.$http.get(_url)
                    .then(function (response) {
                       // console.log(response.body)
                        this.thecube = response.body;
                    })
                    .catch(function (response) {
                        alertify.warning("thecube failed");
                    });
            },
            light_off() {
                this.rgb_red = 0;
                this.rgb_green = 0;
                this.rgb_blue = 0;
                this.light_on();
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