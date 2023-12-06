<template>
    <div>
      <apexchart class="w-full h-full" type="pie" :options="options" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    data() {
      return {
        series: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        options: {
          chart: {
            type: 'pie'
          },
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      };
    },
    components: {
      apexchart: VueApexCharts,
    },
  };
  </script>
  