<template>
  <div class="homepage">
    <div class="page">
      <div class="menu">
        <div class="menuContent">
          <nav class="fr-sidemenu fr-sidemenu--sticky-full-height fr-pr-0" role="navigation" aria-label="Menu latéral">
            <div class="fr-sidemenu__inner">
              
              <div class="pageSelector">
                <div class="fr-sidemenu__title">Type d'indicateurs</div>
                <div class="buttonsTypesActivites">
                  <div :class="selectPage === 'audience' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('audience', '#visites')">Audiences</div>
                  <div :class="selectPage === 'activites' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('activites', '#datasets')">Activités</div>
                  <div :class="selectPage === 'tops' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('tops', '#top10datasets')">Les tops</div>
                  <div :class="selectPage === 'trendings' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('trendings', '#top10datasetsTrendings')">Les tendances</div>
                </div>
              </div>
              
              <div class="fr-pt-0 fr-pt-md-4w fr-pb-md-11w" id="fr-sidemenu-wrapper" v-if="this.selectPage == 'audience'">
                
                <div class="fr-sidemenu__title">Choisissez un indicateur</div>
                <ul class="fr-sidemenu__list">
                  <li class="fr-sidemenu__item">
                    <div class="fr-collapse--expanded" id="vue_d_ensemble" style="max-height: none; --collapse:-312px;">
                      <ul class="fr-sidemenu__list">
                        <li :class="selectChart == '#visites' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#visites')" class="fr-sidemenu__link" href="#visites" target="_self">Visites</a>
                        </li>
                        <li :class="selectChart == '#visiteurs-uniques' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#visiteurs-uniques')" class="fr-sidemenu__link" href="#visiteurs-uniques" target="_self">Visiteurs uniques</a>
                        </li>
                        <li :class="selectChart == '#telechargements' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#telechargements')" class="fr-sidemenu__link" href="#telechargements" target="_self">Téléchargements</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                
                </ul>
              </div>
              <div class="fr-pt-0 fr-pt-md-4w fr-pb-md-11w" id="fr-sidemenu-wrapper" v-if="this.selectPage == 'activites'">
                <div class="fr-sidemenu__title">Choisissez un indicateur :</div>
                <ul class="fr-sidemenu__list">
                  <li class="fr-sidemenu__item">
                    <div class="fr-collapse--expanded" id="vue_d_ensemble" style="max-height: none; --collapse:-312px;">
                      <ul class="fr-sidemenu__list">
                        <li :class="selectChart == '#datasets' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#datasets')" class="fr-sidemenu__link" href="#datasets" target="_self">Nombre de nouveaux jeux de données</a>
                        </li>
                        <li :class="selectChart == '#reuses' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#reuses')" class="fr-sidemenu__link" href="#reuses" target="_self">Nombre de nouvelles réutilisations</a>
                        </li>
                        <li :class="selectChart == '#orgas' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#orgas')" class="fr-sidemenu__link" href="#orgas" target="_self">Nombre de nouvelles organisations</a>
                        </li>
                        <li :class="selectChart == '#discussions' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#discussions')" class="fr-sidemenu__link" href="#discussions" target="_self">Nombre de nouvelles discussions</a>
                        </li>
                        <li :class="selectChart == '#users' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#users')" class="fr-sidemenu__link" href="#users" target="_self">Nombre de nouveaux utilisateurs</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                
                </ul>
              </div>
              <div class="fr-pt-0 fr-pt-md-4w fr-pb-md-11w" id="fr-sidemenu-wrapper" v-if="this.selectPage == 'tops'">
                <div class="fr-sidemenu__title">Choisissez un indicateur :</div>
                <ul class="fr-sidemenu__list">
                  <li class="fr-sidemenu__item">
                    <div class="fr-collapse--expanded" id="vue_d_ensemble" style="max-height: none; --collapse:-312px;">
                      <ul class="fr-sidemenu__list">
                        <li :class="selectChart == '#top10datasets' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#top10datasets')" class="fr-sidemenu__link" href="#top10datasets" target="_self">Top 10 des jeux de données</a>
                        </li>
                        <li :class="selectChart == '#top10reuses' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#top10reuses')" class="fr-sidemenu__link" href="#top10reuses" target="_self">Top 10 des réutilisations</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                
                </ul>
              </div>
              <div class="fr-pt-0 fr-pt-md-4w fr-pb-md-11w" id="fr-sidemenu-wrapper" v-if="this.selectPage == 'trendings'">
                <div class="fr-sidemenu__title">Choisissez un indicateur :</div>
                <ul class="fr-sidemenu__list">
                  <li class="fr-sidemenu__item">
                    <div class="fr-collapse--expanded" id="vue_d_ensemble" style="max-height: none; --collapse:-312px;">
                      <ul class="fr-sidemenu__list">
                        <li :class="selectChart == '#top10datasetsTrendings' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#top10datasetsTrendings')" class="fr-sidemenu__link" href="#top10datasetsTrendings" target="_self">Top 10 des jeux de données en tendance</a>
                        </li>
                        <li :class="selectChart == '#top10reusesTrendings' ? 'fr-sidemenu__item fr-sidemenu__item--active' : 'fr-sidemenu__item'">
                          <a @click="changeMenuSelection('#top10reusesTrendings')" class="fr-sidemenu__link" href="#top10reusesTrendings" target="_self">Top 10 des réutilisations en tendance</a>
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
        <div>
          <div class="pageSelector2">
            <div class="fr-sidemenu__title">Type d'indicateurs</div>
            <div class="buttonsTypesActivites">
              <div :class="selectPage === 'audience' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('audience', '#visites')">Audience</div>
              <div :class="selectPage === 'activites' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('activites', '#datasets')">Activités</div>
              <div :class="selectPage === 'tops' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('tops', '#top10datasets')">les Tops</div>
              <div :class="selectPage === 'trendings' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePage('trendings', '#top10datasetsTrendings')">les Tendances</div>
            </div>
          </div>
        </div>
        <periode-selector></periode-selector>
        <div>


          <div id="visites" class="widget" v-if="this.selectPage == 'audience'">
            <div>
              <div class="chart_container">
                  <line-chart indicateur="matomo-stats-visits" fetchtype="file"></line-chart>
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
                    <div class="content-description">Cet indicateur mesure le nombre de visites sur data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="visiteurs-uniques" class="widget" v-if="this.selectPage == 'audience'">
            <div>
              <div class="chart_container">
                  <line-chart indicateur="matomo-stats-uniq_visits" fetchtype="file"></line-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('visiteurs-uniques')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'visiteurs-uniques'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'visiteurs-uniques'">
                    <br /><br />
                    
                    <div class="content-description">Cet indicateur mesure le nombre de visites uniques sur data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="telechargements" class="widget" v-if="this.selectPage == 'audience'">
            <div>
              <div class="chart_container">
                  <line-chart indicateur="matomo-stats-downloads" fetchtype="file"></line-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('telechargements')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'telechargements'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'telechargements'">
                    <br /><br />
                    
                    <div class="content-description">Cet indicateur mesure le nombre de téléchargements direct de ressources sur la plateforme data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="datasets" class="widget" v-if="this.selectPage == 'activites'">
            <div>
              <div class="chart_container">
                  <bar-chart indicateur="stats-datagouv-datasets" color="#3558a2"></bar-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('datasets')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'datasets'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'datasets'">
                    <br /><br />
                    
                    <div class="content-description">Cet histogramme représente le nombre de jeux de données publiés sur data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="reuses" class="widget" v-if="this.selectPage == 'activites'">
            <div>
              <div class="chart_container">
                  <bar-chart indicateur="stats-datagouv-reuses" color="#21AB8E"></bar-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('reuses')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'reuses'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'reuses'">
                    <br /><br />
                    
                    <div class="content-description">Cet histogramme représente le nombre de réutilisations publiées sur data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="orgas" class="widget" v-if="this.selectPage == 'activites'">
            <div>
              <div class="chart_container">
                  <bar-chart indicateur="stats-datagouv-orgas" color="#E4794A"></bar-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('orgas')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'orgas'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'orgas'">
                    <br /><br />
                    
                    <div class="content-description">Cet histogramme représente le nombre d'organisations créées sur data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="discussions" class="widget" v-if="this.selectPage == 'activites'">
            <div>
              <div class="chart_container">
                  <bar-chart indicateur="stats-datagouv-discussions" color="#34BAB5"></bar-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('discussions')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'discussions'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'discussions'">
                    <br /><br />
                    
                    <div class="content-description">Cet histogramme représente le nombre de discussions créées sur data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="users" class="widget" v-if="this.selectPage == 'activites'">
            <div>
              <div class="chart_container">
                  <bar-chart indicateur="stats-datagouv-users" color="#A558A0"></bar-chart>
              </div>
              <div class="chart_info" @click="clickSelectInfo('users')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'users'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'users'">
                    <br /><br />
                    
                    <div class="content-description">Cet histogramme représente le nombre d'utilisateurs créés sur data.gouv.fr à l'échelle mensuelle, hebdomadaire ou quotidienne.</div>
                  </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          
          <div id="top10datasets" class="widget" v-if="this.selectPage == 'tops'">
            <div>
              <div class="chart_container">
                  <data-table indicateur="matomo-tops-datasets" fetchtype="file" color="rgba(196, 206, 251, 0.5)"></data-table>
              </div>
              <div class="chart_info" @click="clickSelectInfo('top10datasets')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10datasets'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10datasets'">
                    <br /><br />
                    
                    <div class="content-description">Il s’agit des 10 pages de jeux de données les plus consultées sur ces douze derniers mois, le mois dernier ou la semaine dernière.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="top10reuses" class="widget" v-if="this.selectPage == 'tops'">
            <div>
              <div class="chart_container">
                  <data-table indicateur="matomo-tops-reuses" fetchtype="file" color="rgba(31,141,73,0.3)"></data-table>
              </div>
              <div class="chart_info" @click="clickSelectInfo('top10reuses')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10reuses'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10reuses'">
                    <br /><br />
                    
                    <div class="content-description">Il s’agit des 10 pages de réutilisations les plus consultées sur ces douze derniers mois, le mois dernier ou la semaine dernière.</div>
                  </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          

          <div id="top10datasetsTrendings" class="widget" v-if="this.selectPage == 'trendings'">
            <div>
              <div class="chart_container">
                  <data-table indicateur="tops-trending-datasets" fetchtype="file" color="rgba(196, 206, 251, 0.5)"></data-table>
              </div>
              <div class="chart_info" @click="clickSelectInfo('top10datasetsTrendings')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10datasetsTrendings'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10datasetsTrendings'">
                    <br /><br />
                    
                    <div class="content-description">Il s’agit des 10 pages de jeux de données créés récemment les plus consultées sur la période sélectionnée.</div>
                  </span>
              </div>
            </div>
          </div>

          <div id="top10reusesTrendings" class="widget" v-if="this.selectPage == 'trendings'">
            <div>
              <div class="chart_container">
                  <data-table indicateur="tops-trending-reuses" fetchtype="file" color="rgba(31,141,73,0.3)"></data-table>
              </div>
              <div class="chart_info" @click="clickSelectInfo('top10reusesTrendings')">
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10reusesTrendings'">
                    <img src="../static/images/down-filled-triangular-arrow.png" width="12" />&nbsp;
                  </span>
                  <span v-else>
                    <img src="../static/images/play.png" width="12" />&nbsp;
                  </span>
                  <span>Que mesure cet indicateur ?</span>
                  <span v-if="this.selectInfo && this.selectInfoChart == 'top10reusesTrendings'">
                    <br /><br />
                    
                    <div class="content-description">Il s’agit des 10 pages de réutilisations créées récemment les plus consultées sur la période sélectionnée.</div>
                  </span>
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
  name: 'HomepageWidget',
  mixins: [],
  components:{
    BarChart,
    LineChart
  },
  data(){
    return {
      selectChart: '#visites',
      selectInfo: false,
      selectInfoChart: 'visites',
      selectPage: 'audience',
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
    //width: 100%;
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
    width: 100%;
    max-width: 650px;
  }
  .widget{
    max-width: 800px;
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