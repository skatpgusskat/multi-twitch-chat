<template>
  <div id="app">
    <div v-for="(channel, channelName) in channels" :key="channelName">
      <ChannelComponent :channel="channel"/>
    </div>
    <button v-on:click="openAddChannelDialog">채널 추가</button>
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

  openAddChannelDialog() {
    const channelName = prompt("스트리머의 영문 ID", "namse_");
    if (!channelName) {
      return;
    }
    this.channelManager.addChannel(channelName);
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
