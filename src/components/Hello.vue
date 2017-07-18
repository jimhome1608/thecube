<template>
  <div>
    <div class="container">
      <div class="row">
        <h1>The Cube</h1>
        <hr />
        <i v-on:click="light_on"  class="fa fa-lightbulb-o fa-2x" aria-hidden="true"></i>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i v-on:click="light_off"  class="fa fa-power-off fa-2x" aria-hidden="true"></i>
        <br />
        <br />
        <i v-on:click="goodbye" class="fa  fa-hand-spock-o fa-2x" aria-hidden="true"></i>

        <br />
        <br />
        <br />
        {{thecube.datalength}}
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
    export default {
        name: 'hello',
        components: {
        },
        data: function() {
            return {
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
            goodbye() {
                window.open('','_parent','');
                window.close();
            },
            light_on() {
               var _url = "http://220.244.249.125:8085/cube.php?d=%7B0000330FF%7D%7B111FF0000%7D%7B2220000FF%7D%7B33300FF00%7D";
                console.log(_url)
                this.$http.get(_url)
                    .then(function (response) {
                        console.log(response.body)
                        this.thecube = response.body;
                    })
                    .catch(function (response) {
                        alertify.warning("thecube failed");
                    });
            },
            light_off() {
                var _url = "http://220.244.249.125:8085/cube.php?d=%7B000000000%7D%7B111000000%7D%7B222000000%7D%7B333000000%7D";
                this.$http.get(_url)
                    .then(function (response) {
                        this.thecube = response.body;
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