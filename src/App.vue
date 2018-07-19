<template>
  <div id="app">
    <div v-for="(channel, channelName) in channels" :key="channelName">
      <ChannelComponent :channel="channel"/>
    </div>
    <button v-on:click="addNamse">Add Namse Channel!!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelComponent from "./components/ChannelComponent.vue";
import ChannelManager from "./ChannelManager";

@Component({
  components: {
    ChannelComponent
  }
})
export default class App extends Vue {
  channelManager: ChannelManager = new ChannelManager();
  channels: Channel[] = this.channelManager.channels;
  addNamse() {
    this.channelManager.addChannel("namse_");
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
