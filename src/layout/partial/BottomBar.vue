<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation v-model="value" class="relative -z-10" color="teal" grow relative>
      <v-btn>
        <v-icon>fa-light fa-bell</v-icon>
      </v-btn>

      <!-- Floating QR Code Button -->
      <v-btn variant="filled" class="rounded-xl" transform="translate(-50%, -50%)">
        <v-icon size="40">fa-duotone fa-qrcode</v-icon>
      </v-btn>

      <v-btn>
        <v-icon>fa-light fa-user</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
export default {
  data: () => ({ value: 1 }),
};
</script>
