<template>
  <div>
    <div class="widget">
      <div class="chart" v-if="dataset">
        <h6>{{dataset["nom"]}}</h6>
        <div class="barchart_tooltip" v-if="tooltip.display" :style="{top:tooltip.top,left:tooltip.left}">
          <div class="tooltip_header">{{tooltip.date}}</div>
          <div class="tooltip_body">
            <div class="tooltip_value">
              <span class="legende_dot" :style="dotStyles"></span>
              {{tooltip.value}}
            </div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mixin } from '@/utils.js'
import Chart from 'chart.js'
export default {
  name: 'BarChart',
  mixins: [mixin],
  data(){
    return {
      dataset:undefined,
      chartId: '',
      unite:'',
      tooltip: {
        top: '0px',
        left: '0px',
        display: false,
        value: 110,
        date: '',
      }
    }
  },
  props: {
    indicateur: String,
    color: String
  },
  computed: {

    dotStyles() {
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
        this.unite = data["unite"]
        this.createChart()
      })
    },

    createChart () {
      const self = this

      const labels = []
      const datapoints = []

      this.dataset["values"].forEach(function(d){
        labels.push(d["date"])
        datapoints.push(d["value"])
      })

      let xTickLimit = 6
      let bgColor = this.color
      let period = this.selectedPeriode

      setTimeout(() => {
        const ctx = document.getElementById(self.chartId).getContext('2d')
        
        this.chart = new Chart(ctx, {
          data: {
            labels: labels,
            datasets: [{
              data: datapoints,
              backgroundColor: bgColor,
              borderColor: bgColor,
              type: 'bar',
              borderWidth: 4
            }]
          },
          options: {
            animation: {
              easing: 'easeInOutBack'
            },
            onHover: (e) => {
            if (this.chart.getElementsAtEvent(e).length !== 0) {
              const index = this.chart.getElementsAtEvent(e)[0]._index
              const pxTop = this.chart.scales['y-axis-0'].getPixelForValue(datapoints[index])
              self.tooltip.top = (e.target.getBoundingClientRect().top + pxTop - 50) + 'px'
              self.tooltip.left = (e.target.getBoundingClientRect().left + this.chart.scales['x-axis-0'].getPixelForTick(index) + 25) + 'px'
              self.tooltip.display = true

              self.tooltip.value = datapoints[index]+" "+self.unite

              var date = new Date(labels[index])
              const options = {day: 'numeric', month: 'long', year: 'numeric'};
              var ndate = date.toLocaleDateString('fr-FR',options)
              self.tooltip.date = ndate

            } else {
              self.tooltip.display = false
            }
          },
            scales: {
              xAxes: [{
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)'
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: xTickLimit,
                  maxRotation: 0,
                  minRotation: 0,
                  callback: function (value) {
                    let formula = ''
                    if(period == 'daily' || period == 'weekly'){
                      formula = value.toString().substring(8, 10) + '/' + value.toString().substring(5,7)
                    }
                    if(period == 'monthly') {
                      formula = value.toString().substring(5, 7) + '/' + value.toString().substring(2,4)
                    }
                    return formula
                  }
                },
                offset: true
              }],
              yAxes: [{
                gridLines: {
                  color: '#e5e5e5',
                  borderDash: [3]
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 5
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            }
          }
        })

      },100)
    },

    updateChart () {
      this.getData()
      this.chart.destroy()
      this.chart.update()
    }

  },

  watch:{
    selectedPeriode: function () {
      this.updateChart()
    }
  },

  created(){

    this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
    this.getData()
    
  },


}
</script>

<style scoped lang="scss">
  .widget{
    max-width: 500px;
  }

  @import "../../css/overload-fonts.css";
  @import "../../css/dsfr.min.css";

  .chart{
    width: 100%;
  }

  canvas{
    width: 100%;
  }

  .barchart_tooltip{
      width: 165px;
      height: auto;
      background-color: white;
      position: fixed;
      z-index: 999;
      border-radius: 4px;
      box-shadow: 0 8px 16px 0 rgba(22, 22, 22, 0.12), 0 8px 16px -16px rgba(22, 22, 22, 0.32);
      text-align: left;
      pointer-events: none;
      font-size: 0.75rem;
      .tooltip_header{
        width: 100%;
        height: 30px;
        background-color: #f6f6f6;
        color:#6b6b6b;
        padding-left: 5px;
        padding-top: 3px;
      }
      .tooltip_body{
        padding-left: 5px;
        padding-bottom: 5px;
        line-height: 1.67;
        .legende_dot{
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          
          display: inline-block;
          margin-top: 0.25rem;
        }
        .tooltip_place{
          color:#242424;
        }
        .tooltip_value{
          color:#242424;
          font-weight: bold;
        }
      }
    }

</style>