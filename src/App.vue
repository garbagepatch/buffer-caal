<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>
<style global>
@import '../public/assets/global.scss';
.popover{
    max-width: 100%; 
    /* Max Width of the popover (depending on the container!) */
}
</style>