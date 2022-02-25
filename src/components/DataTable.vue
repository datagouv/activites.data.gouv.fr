<template>
  <div class="widget">
    <div class="chart" v-if="dataset">
      <h6>{{dataset["nom"]}}</h6>
      <div class="table">
        <div class="row" :key="r['name']" v-for="r,i in dataset['values']" @click="goToLink(r['url'])">
          <div class="inner_row" :style="{width:getBg(r['value']), backgroundColor: color}"></div>
          <div class="content">
            <div class="rank">
              {{i+1}}
            </div>
            <div class="name">
              {{pruneName(r['name'])}}
            </div>
            <div class="value">
              {{r['value']}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mixin } from '@/utils.js'
export default {
  name: 'DataTable',
  mixins: [mixin],
  data(){
    return {
      dataset:undefined
    }
  },
  props: {
    indicateur: String,
    color: String,
  },
  computed: {
    rowStyle() {
      return {
        "background-color": this.color
      };
    },
    selectedPeriode () {
      return store.state.selectedPeriode
    }
  },
  methods: {
    async getData () {
      var url = this.indicateur+"-"+this.selectedPeriode
      store.dispatch('getData', url).then(data => {
        this.dataset = data
      })
    },
    getBg (value) {
      var p = value/this.dataset["values"][0]["value"]*100
      return p+"%"
    },
    goToLink (url) {
      window.open(url, '_blank');
    },
    pruneName (name) {
      return name.substring(0,60)
    },
    updateChart () {
      this.dataset = {}
      this.getData()
    }
  },
  watch:{
    selectedPeriode: function () {
      this.updateChart()
    }
  },
  created(){
    this.getData()
    
  },
}
</script>

<style scoped lang="scss">
  .widget{
    max-width: 370px;
  }
  @import "../../css/overload-fonts.css";
  @import "../../css/dsfr.min.css";
  @keyframes progress-bar {
    0% { width: 0; }
  }
  .chart{
    width: 100%;
    height:900px;
    .table{
      width: 100%;
      .row{
        cursor: pointer;
        height: 70px;
        margin-bottom: 10px;
        font-size: 14px;
        position: relative;
        .name{
            max-width: 70%;
            vertical-align: middle;
        }
        .content:hover{
          color: #3558a2;
        }
        .inner_row{
          height: 70px;
          width: 50%;
          position: absolute;
          animation: progress-bar 0.8s;
        }
        .content{
          display: block;
          height: auto;
          position: relative;
          top:50%;
          transform:translate(0,-50%);
          div{
            position: relative;
            display: inline-block;
            &.rank{
              margin-left: 15px;
              margin-right: 15px;
              line-height: 70px;
            }
            &.value{
              position: absolute;
              right:10px;
              line-height: 70px;
            }
          }
        }
      }
    }
  }
</style>