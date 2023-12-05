<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation v-model="value" class="relative -z-10" color="teal" grow relative>
      <v-btn to="/beranda">
        <v-icon>fa-light fa-bell</v-icon>
      </v-btn>

      <v-btn to="/vote" variant="filled" class="rounded-xl" transform="translate(-50%, -50%)">
        <v-icon size="35">fa-light fa-check-to-slot</v-icon>
      </v-btn>

      <v-btn to="/device">
        <v-icon>fa-light fa-mobile</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
export default {
  data: () => ({ value: 2 }),
};
</script>
