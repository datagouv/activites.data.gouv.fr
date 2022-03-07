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
      dataset:undefined,
      objectId: ''
    }
  },
  props: {
    indicateur: String,
    color: String,
    slug: String,
    fetchtype: String,
    apiurl: String,
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
      var url = ''
      console.log(this.fetchtype)
      if(this.fetchtype == 'file'){
        console.log('zceve')
        url = this.indicateur+"-"+this.selectedPeriode
        store.dispatch('getData', url).then(data => {
          this.dataset = data
        })
      } else {
        console.log('jhhh')
        url = this.apiurl + '/' + this.objectId + '/' + this.selectedPeriode
        store.dispatch('getDataUrl', url).then(data => {
          this.dataset = data
        })
      }   

    },
    getBg (value) {
      var p = value/this.dataset["values"][0]["value"]*100
      return p+"%"
    },
    goToLink (url) {
      window.open(url, '_blank');
    },
    pruneName (name) {

      var newName
      
      if(window.innerWidth<465){
        if(name.substring(0,30) == name){
          newName = name
        }else{
          newName = name.substring(0,26)+"[..]"
        }
      }else{
        if(name.substring(0,60) == name){
          newName = name
        }else{
          newName = name.substring(0,56)+"[..]"
        }
      }
      
      
      return newName
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
    console.log(this.apiurl)
    if(this.slug) {
      console.log('popop')
      var realslug = this.slug.split('/')[0]
      var idsite = ''
      if (this.slug.split('/').length > 1) {
        idsite = this.slug.split('/')[1]
      }
      fetch('https://www.data.gouv.fr/api/1/' + this.indicateur + '/'+realslug).then(res => {
        return res.json()
      }).then(data => {
        if(idsite == ''){
          this.objectId = data.id
        }else{
          this.objectId = data.id + '/' +idsite
        }
        this.getData()
      })
    }else{
      console.log('ded')
      this.getData()
    }

    
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
    min-height:200px;
    .table{
      width: 100%;
      .row{
        cursor: pointer;
        height: 70px;
        margin-bottom: 10px;
        font-size: 14px;
        position: relative;
        border:1px solid #eeeee4;
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
            &.name{
              overflow: hidden;
              line-height: 20px;
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

  @media (max-width: 465px) {
    .chart{
      .table{
        .row{
          .content{
            div{
              &.name{
                max-width: 50%;
              }
            }
          }
        }
      }
    }
  }

</style>