<template>
  <div>
    <div class="container">
      <div class="row">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <!--  <td><i  class="fa fa-bars fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;<td> -->
          <td>
            <div  v-html="get_html2()" ></div>
          </td>

          <td>
            <br />
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
          </td>
        </tr>
        <tr>

          <td>
            <i v-on:click="light_on"  class="fa fa-lightbulb-o fa-4x" aria-hidden="true" > on</i>
          </td>
          <td>
            <i v-on:click="light_off"  class="fa fa-power-off fa-3x"  aria-hidden="true"> off </i>
          </td>
        </tr>
        </table>

        <hr />
        <br />
        <i v-on:click="goodbye" class="fa  fa-hand-spock-o fa-3x" aria-hidden="true">Exit</i>

        <br />
        <br />
        <br />
        <!--
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

    export default {
        name: 'hello',
        components: {
            RangeSlider
        },
        data: function() {
            return {
                bgc: 0x4551ff,
                rgb_red: 0,
                rgb_green: 0,
                rgb_blue: 0,
                thecube: {"datalength":"22","data":"{0000330FF}{111FF0000}"} ,
            }
        },
        computed: {
            screen_with: function() {
                return screen.width;
            },
        },
        created: function () {
        },
        methods: {
            videoFile () {
                var _html = '<h1 style="background-color: #';
                _html = _html.concat(this.get_rgb_string());
                _html = _html.concat('">The Cube</h1>');
                return _html;
            },
            get_html2() {
                var _html2 = '<canvas id="myCanvas" width="150" height="150" style="background-color: #';
                _html2 = _html2.concat(this.get_rgb_string());
                _html2 = _html2.concat('"></canvas>');
                return _html2;
            } ,
            get_rgb_string() {

              var hexString = this.rgb_red.toString(16);
              if (this.rgb_red < 16)
                  hexString = '0'.concat(hexString);
              if (this.rgb_green < 16)
                  hexString = hexString.concat('0',this.rgb_green.toString(16));
              else
                  hexString = hexString.concat(this.rgb_green.toString(16));
              if (this.rgb_blue < 16)
                  hexString = hexString.concat('0',this.rgb_blue.toString(16));
              else
                  hexString = hexString.concat(this.rgb_blue.toString(16));
              hexString = hexString.toUpperCase();
              return hexString;
            },
            make_led_command(x,y,z) {
              var led =x.toString().concat(y.toString(),z.toString());
              var cmd = "%7B".concat(led,this.get_rgb_string(),"%7D");
              return cmd;
            },
            make_many_command() {
                var cmd = this.make_led_command(0,0,0);
                cmd = cmd.concat( this.make_led_command(1,1,1));
                cmd = cmd.concat( this.make_led_command(2,2,2));
                cmd = cmd.concat( this.make_led_command(3,3,3));
                cmd = cmd.concat( this.make_led_command(3,0,3));
                                                       // deeper, right, updoewn
                cmd = cmd.concat( this.make_led_command(2,1,2));
                cmd = cmd.concat( this.make_led_command(1,2,1));
                cmd = cmd.concat( this.make_led_command(0,3,0));
                return cmd;
            },
            make_all_cube_command() {
                var all_cmd = "";
                for (var x=0;x<4;x++) {
                    for (var y=0;y<4;y++) {
                        for (var z=0;z<4;z++) {
                            all_cmd = all_cmd.concat( this.make_led_command(x,y,z));
                        }
                    }
                }
                return all_cmd;
            },
            goodbye() {
                window.open('','_parent','');
                window.close();
            },
            light_on() {
               var _url = "http://220.244.249.125:8085/cube.php?d=".concat(this.make_all_cube_command());
               // console.log(_url)
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
  .fa-bars, .fa-camera-retro, .fa-hand-spock-o, .fa-lightbulb-o, .fa-power-off {
    cursor: pointer;
  }
  a {
    color: #42b983;
  }
</style>