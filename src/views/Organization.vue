<template>
  <div class="homepage">
    <div class="page">
      <div class="menu">
        <div class="menuContent">
          <nav class="fr-sidemenu fr-sidemenu--sticky-full-height fr-pr-0" role="navigation" aria-label="Menu latéral">
            <div class="fr-sidemenu__inner">
              
              <div class="fr-pt-0 fr-pt-md-4w fr-pb-md-11w" id="fr-sidemenu-wrapper">
            
                <div class="fr-sidemenu__title">Choisissez un indicateur</div>
                <ul class="fr-sidemenu__list">
                  <li class="fr-sidemenu__item">
                    <div class="fr-collapse--expanded" id="vue_d_ensemble" style="max-height: none; --collapse:-312px;">
                      <ul class="fr-sidemenu__list">
                        <li :class="selectChart == '#visites' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#visites')" class="fr-sidemenu__link" href="#visites" target="_self">Visites totales</a>
                        </li>
                        <li :class="selectChart == '#visites-datasets' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#visites-datasets')" class="fr-sidemenu__link" href="#visites-datasets" target="_self">Visites Web</a>
                        </li>
                        <li :class="selectChart == '#topdatasets' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#topdatasets')" class="fr-sidemenu__link" href="#topdatasets" target="_self">Top vues des jeux de données</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="widgets">
        <h4 class="titleDataset">{{ organization.name }}</h4>
        <periode-selector></periode-selector>
        <div>
          <div id="visites" class="widget">
            <div>
              <div class="chart_container">
                  <line-chart indicateur="organizations" apiurl="organizations" fetchtype="api" :slug="slug" replaceName="Visites de la page de l'organisation"></line-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('visites')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'visites'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'visites'">
                    <br /><br />
                    <div class="content-description">To complete...</div>
                  </span>
              </div>
            </div>
          </div>


          <br />
        </div>


        <div>
          <div id="visites-datasets" class="widget">
            <div>
              <div class="chart_container">
                  <line-chart indicateur="organizations" apiurl='datasets/organizations' fetchtype="api" :slug="slug" replaceName="Visites des jeux de données de l'organisation"></line-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('visites-datasets')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'visites-datasets'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'visites-datasets'">
                    <br /><br />
                    <div class="content-description">To complete...</div>
                  </span>
              </div>
            </div>
          </div>
          <br />

          <div>
          
            <div id="topdatasets" class="widget">
              <div>
                <div class="chart_container">
                    <data-table indicateur="organizations" apiurl="organizations/datasets" fetchtype="api" :slug="slug" color="rgba(196, 206, 251, 0.5)"></data-table>
                </div>
                <div class="chart_info" @click="clickSelectInfo('topdatasets')">
                    <span v-if="this.selectInfo && this.selectInfoChart == 'topdatasets'">
                      <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                    </span>
                    <span v-else>
                      <img src="../static/images/play.png" width="12" />&nbsp;
                    </span>
                    <span>Que mesure cet indicateur ?</span>
                    <span v-if="this.selectInfo && this.selectInfoChart == 'topdatasets'">
                      <br /><br />
                      
                      <div class="content-description">Il s’agit des 10 pages de jeux de données les plus consultées sur ces douze derniers mois, le mois dernier ou la semaine dernière.</div>
                    </span>
                </div>
              </div>
            </div>
          </div>


          <br />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>

import BarChart from '@/components/BarChart'
import LineChart from '@/components/LineChart'

export default {
  name: 'Organization',
  mixins: [],
  components:{
    LineChart
  },
  data(){
    return {
      selectChart: '#visites',
      selectInfo: false,
      selectInfoChart: 'visites',
      selectPage: 'audience',
      slug: this.$route.params.slug,
      organization: {},
      datasets: {}
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    changeMenuSelection(menu){
      this.selectChart = menu
    },
    clickSelectInfo(chart){
      if(this.selectInfo == false || this.selectInfoChart == chart){
        this.selectInfo = !this.selectInfo;
      }
      this.selectInfoChart = chart;
    },
    changePage(item, chart){
      this.selectPage = item;
      this.selectChart = chart;
    },
  },
  watch:{
  },
  created(){
    fetch('https://www.data.gouv.fr/api/1/organizations/'+this.$route.params.slug).then(res => {
        return res.json()
      }).then(data => {
        this.organization = data
      })
  },


}
</script>

<style scoped lang="scss">

@import "../../css/custom.css";

@media screen and (max-width: 900px) {
  .menu{
    display: none;
  }
  .widgets{
    margin-left: 20px;
    width: 100%;
  }
  .widget{

    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ebebeb;
  }
  .pageSelector2{
    padding-top: 30px;
  }
}

@media screen and (min-width: 900px) {

  .widgets{
    margin-left: 80px;
  }
  .widget{
    max-width: 600px;
    margin-left: 0px;
    margin-right: 20px;
    padding: 20px;
    border: 1px solid #ebebeb;
  }

  .pageSelector{
    padding-top: 30px;
  }
  .pageSelector2{
    display: none;
  }
}

.titleDataset{
  padding-top: 30px;
}


.buttonsTypesActivites{
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}


.fr-sidemenu__inner{
  padding: 0 0 0 0;
}

.page {
    max-width: 1320px;
    display: flex;
    //flex-wrap: wrap;
    margin: 0 auto;
    //padding: 0;
    height: 100%;
}

.menu{
  min-width: 300px;
  //margin-left: auto;
}

.menuContent{
  width: 300px;
  //position: fixed;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
}

.widgets{
  margin-right: auto;
}

.widgetHeader{
  width: 100%;
  min-height: 100px;
}
.titleHeader{
  width: 100%;
  color: #000091;
}

.chart_container{
  max-width: 600px;
  margin-left: 30px;
}

.chart_info{
  max-width: 500px;
  font-weight: bold;
  margin-top: 15px;
  padding: 15px;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  cursor: pointer;
}

.content-description{
  max-width: 400px;
  margin: auto;
  font-size: 14px;
  font-weight: 400;
  cursor: text;
  text-justify: auto;
}

.fr-sidemenu__item, .fr-sidemenu__title{
  border: 0px;
}




</style>