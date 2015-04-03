'use strict';

angular
  .module('compta')
  .config(myConfig)
  .controller('MainCtrl', MainCtrl);;

function myConfig($routeProvider) {
  $routeProvider
    .when('/main', {
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: 'main/main.html'
    });
}

function MainCtrl($scope){
  var vm = this;

  activate();

  function activate() {
    vm.tjm = 505;
    vm.duration = 0;
    vm.salaire = 0;
    vm.percent = 0;
    vm.dureeTotal = 0;
    simulate();
  }

  function simulate() {
    calculate();
    watchChanges();
  }

  function calculate() {
    var brutToNet = .75,
        netToBrut = 1/.75;

    if (vm.durationtype) {
      //calcul si un nombre de jours fourni
      vm.ca = (vm.tjm * vm.duration).toFixed(2);
    } else {
      //calcul sur un nombre de mois en partant d'une base de 200 travaillés par ans
      vm.ca = (vm.tjm * (vm.duration * (200/12))).toFixed(2);
    }

    //Salaire fixed
    vm.benef = (vm.ca * (vm.percent/100));
    vm.snet = (vm.salaire);
    vm.sbrut = (vm.snet * netToBrut);
    vm.chargPatro = (vm.sbrut * .45);
    vm.coutSalarie = (vm.chargPatro + vm.sbrut) * (vm.durationtype ? (vm.duration / (200/12)):vm.duration);
    vm.delta = vm.ca - vm.coutSalarie - vm.benef;

    //Salaire not fixed
    vm.coutSalarieVariable = (vm.ca - vm.benef);
    var availableMoneyForAmonth = (vm.ca - vm.benef) / vm.dureeTotal;
    vm.sbrutVariable = availableMoneyForAmonth / 1.45;
    vm.chargPatroVariable = vm.sbrutVariable * .45;
    vm.snetVariable = vm.sbrutVariable * .75;
    vm.deltaVariable = vm.ca - vm.coutSalarieVariable - vm.benef;

    //cleaning vars
    vm.benef = vm.benef.toFixed(2);
    vm.snet = vm.snet.toFixed(2);
    vm.sbrut = vm.sbrut.toFixed(2);
    vm.chargPatro = vm.chargPatro.toFixed(2);
    vm.coutSalarie = vm.coutSalarie.toFixed(2);
    vm.delta = vm.delta.toFixed(2);
    vm.snetVariable = vm.snetVariable.toFixed(2);
    vm.sbrutVariable = vm.sbrutVariable.toFixed(2);
    vm.chargPatroVariable = vm.chargPatroVariable.toFixed(2);
    vm.coutSalarieVariable = vm.coutSalarieVariable.toFixed(2);
    vm.deltaVariable = vm.deltaVariable.toFixed(2);
  }

  function watchChanges() {
    $scope.$watch(
      angular.bind(vm, function () { return [this.tjm, this.salaire, this.duration, this.percent, this.dureeTotal]; }),
      function() { calculate(); }, true
    );
    $scope.$watch(
      angular.bind(vm, function () { return this.durationtype; }),
      function(value) {
        if (value) {
          vm.duration = vm.duration * (200/12);
        } else {
          vm.duration = vm.duration / (200/12);
        }
      }
    );
  }
}
