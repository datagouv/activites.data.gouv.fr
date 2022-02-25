<template>
  <div class="periodSelector">
    <div class="fr-sidemenu__title">Changez de période</div>
    <div class="buttonsHeader">
      <div :class="selectedPeriode === 'monthly' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePeriod('monthly')">Ces douze derniers mois</div>
      <div :class="selectedPeriode === 'weekly' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePeriod('weekly')">Le mois dernier</div>
      <div :class="selectedPeriode === 'daily' ? 'buttonHeader buttonHeaderSelected' : 'buttonHeader'" @click="changePeriod('daily')">La semaine dernière</div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mixin } from '@/utils.js'
export default {
  name: 'PeriodeSelector',
  mixins: [mixin],
  data(){
    return {
      
    }
  },
  props: {
  },
  computed: {
    selectedPeriode () {
      return store.state.selectedPeriode
    }
  },
  methods: {
    changePeriod(periode){
      store.commit('setPeriode', periode)
    }
  },
  watch:{
    
  },
  created(){
  },
}
</script>

<style scoped lang="scss">
  @import "../../css/overload-fonts.css";
  @import "../../css/dsfr.min.css";
  @import "../../css/custom.css";

  .fr-sidemenu__item, .fr-sidemenu__title{
    border: 0px;
  }


@media screen and (max-width: 500px) {

  .periodSelector{
    padding-top: 0px;
  }
}

@media screen and (min-width: 500px) {

  .periodSelector{
    padding-top: 30px;
  }
}

</style>