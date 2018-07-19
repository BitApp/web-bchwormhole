<template>
  <div>
    <ViaHeader/>
    <Alert/>
    <div class="f_viaBody f_viaBody_header_footer">
      <nuxt/>
    </div>
    <ViaFooter/>
  </div>
</template>

<script>

import ViaFooter from "~/components/Footer.vue"
import ViaHeader from "~/components/Header.vue"
import Alert from "~/components/Alert.vue"

export default {
  components: {
    ViaHeader,
    ViaFooter,
    Alert
  }
}
</script>