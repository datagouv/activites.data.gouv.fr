<template>
  <div>
    <div class="widget">
      <div class="chart_container" v-if="dataset">
        <h6 v-if="replaceName">{{replaceName}}</h6>
        <h6 v-else>{{dataset["nom"]}}</h6>
        <div class="linechart_tooltip">
            <div class="tooltip_header"></div>
            <div class="tooltip_body">
              <div class="tooltip_value">
                <span class="tooltip_dot"></span>
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
  name: 'LineChart',
  mixins: [mixin],
  data(){
    return {
      dataset:undefined,
      chartId: '',
      chart: undefined,
      unite: '',
      objectId: '',
    }
  },
  props: {
    indicateur: String,
    fetchtype: String,
    slug: String,
    apiurl: String,
    replaceName: String,
  },
  computed: {

    selectedPeriode () {
      return store.state.selectedPeriode
    }

  },
  methods: {

    async getData () {
      var url = ''
      if(this.fetchtype == 'file'){
        url = this.indicateur+"-"+this.selectedPeriode
        store.dispatch('getData', url).then(data => {
          this.dataset = data
          this.unite = data["unite"]
          this.createChart()
        })
      } else {
        url = this.apiurl + '/' + this.objectId + '/' + this.selectedPeriode
        
        store.dispatch('getDataUrl', url).then(data => {
          this.dataset = data
          this.unite = data["unite"]
          this.createChart()
        })
      }    
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
      let period = this.selectedPeriode

      setTimeout(function(){

        const ctx = document.getElementById(self.chartId).getContext('2d')
        let gradientFill
        this.display === 'big' ? gradientFill = ctx.createLinearGradient(0, 0, 0, 500) : gradientFill = ctx.createLinearGradient(0, 0, 0, 250)
        gradientFill.addColorStop(0, 'rgba(218, 218, 254, 0.6)')
        gradientFill.addColorStop(0.6, 'rgba(245, 245, 255, 0)')
        self.chart = new Chart(ctx, {
          data: {
            labels: labels,
            datasets: [{
              data: datapoints,
              backgroundColor: gradientFill,
              borderColor: '#146BB8',
              type: 'line',
              borderWidth: 4,
              pointRadius: 8,
              pointBackgroundColor: 'rgba(0, 0, 0, 0)',
              pointBorderColor: 'rgba(0, 0, 0, 0)',
              pointHoverBackgroundColor: 'rgba(0, 0, 145, 1)',
              pointHoverRadius: 6
            }]   
          },
          options: {
            animation: {
              easing: 'easeInOutBack'
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
                  maxTicksLimit: 5,
                  callback: function (value, index, values) {
                    if (value >= 1000000000 || value <= -1000000000) {
                      return value / 1e9 + 'B'
                    } else if (value >= 1000000 || value <= -1000000) {
                      return value / 1e6 + 'M'
                    } else if (value >= 1000 || value <= -1000) {
                      return value / 1e3 + 'K'
                    }
                    return value
                  }
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
            filter: function (tooltipItem) {
              return tooltipItem.datasetIndex === 0
            },
            enabled: false,
            displayColors: false,
            backgroundColor: '#6b6b6b',
            callbacks: {
              label: function (tooltipItems) {
                const int = self.convertFloatToHuman(tooltipItems.value)
                return int + ' ' + self.unite
              },
              title: function (tooltipItems) {
                var date = new Date(tooltipItems[0].label)
                const options = {day: 'numeric', month: 'long', year: 'numeric'};
                var ndate = date.toLocaleDateString('fr-FR',options)
                return ndate
              },
              labelTextColor: function () {
                return '#eeeeee'
              }
            },
            custom: function (context) {
              // Tooltip Element
              const tooltipEl = self.$el.querySelector('.linechart_tooltip')
              const tooltipModel = context
              if (tooltipModel.opacity === 0 || tooltipModel.title[0] === undefined) {
                tooltipEl.style.opacity = 0
                return
              }
              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform')
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign)
              } else {
                tooltipEl.classList.add('no-transform')
              }
              function getBody (bodyItem) {
                return bodyItem.lines
              }
              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || []
                const bodyLines = tooltipModel.body.map(getBody)
                const divDate = self.$el.querySelector('.tooltip_header')
                divDate.innerHTML = titleLines[0]
                const divValue = self.$el.querySelector('.tooltip_value')
                divValue.innerHTML = self.$el.querySelector('.tooltip_dot').outerHTML + ' ' + bodyLines[0]
              }
              const {
                offsetLeft: positionX,
                offsetTop: positionY
              } = self.chart.canvas

              const canvasWidth = Number(self.chart.canvas.style.width.replace(/\D/g, ''))
              const canvasHeight = Number(self.chart.canvas.style.height.replace(/\D/g, ''))
              tooltipEl.style.position = 'absolute'
              tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'
              tooltipEl.style.pointerEvents = 'none'
              let tooltipX = positionX + tooltipModel.caretX + 10
              let tooltipY = positionY + tooltipModel.caretY - 18
              if (tooltipX + tooltipEl.clientWidth + self.legendLeftMargin > positionX + canvasWidth) { // tooltip disappears at the right of the canvas
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10
              }
              if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) { // tooltip disappears at the bottom of the canvas
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 18
              }
              if (tooltipX < positionX) {
                tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2
                tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 18
              }
              tooltipEl.style.left = tooltipX + 'px'
              tooltipEl.style.top = tooltipY + 'px'
              tooltipEl.style.opacity = 1
            }
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
    if(this.slug) {
      var realslug = this.slug.split('/')[0]
      var idsite = ''
      if (this.slug.split('/').length > 1) {
        idsite = this.slug.split('/')[1]
      }
      fetch('https://www.data.gouv.fr/api/1/'+this.indicateur+'/'+realslug).then(res => {
        return res.json()
      }).then(data => {
        if(idsite == ''){
          this.objectId = data.id
        }else{
          this.objectId = data.id + '/' +idsite
        }
        this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
        console.log(document.getElementById(self.chartId))
        this.getData()
      })
    }else{
      this.chartId = 'myChart' + Math.floor(Math.random() * (1000))
      console.log(document.getElementById(self.chartId))
      this.getData()
    }
  },


}
</script>

<style scoped lang="scss">
  .widget{
    max-width: 500px;
  }

  @import "../../css/overload-fonts.css";
  @import "../../css/dsfr.min.css";

  .chart_container{
    width: 100%;
  }

  canvas{
    width: 100%;
  }

  .linechart_tooltip {
    width: 11.25rem;
    height: auto;
    background-color: white;
    position: fixed;
    z-index: 999;
    border-radius: 4px;
    box-shadow: 0 8px 16px 0 rgba(22, 22, 22, 0.12), 0 8px 16px -16px rgba(22, 22, 22, 0.32);
    text-align: left;
    pointer-events: none;
    font-size: 0.75rem;
    opacity: 0;
    .tooltip_header {
      width: 100%;
      height: 1.75rem;
      background-color: #f6f6f6;
      color: #6b6b6b;
      padding-left: 0.75rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
    .tooltip_body {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top:0.25rem;
      line-height: 1.67;
      .tooltip_dot {
        min-width: 0.7rem;
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background-color: #146BB8;
        display: inline-block;
        margin-top: 0.25rem;
      }
      .tooltip_place {
        color: #242424;
      }
      .tooltip_value {
        color: #242424;
        font-weight: bold;
      }
    }
  }

</style>