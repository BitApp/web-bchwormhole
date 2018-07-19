<template>
  <div>
    <Header/>
    <Alert/>
    <div class="">
      <nuxt/>
    </div>
    <Footer position="mt-30"/>
  </div>
</template>

<script>

import Header from "~/components/Header.vue"
import Footer from "~/components/Footer.vue"
import Alert from "~/components/Alert.vue"

export default {
  components: {
    Header,
    Footer,
    Alert
  }
}
</script>
