<template>
  <div id="app">
    <div v-for="(channel, channelName) in channels" :key="channelName">
      <ChannelComponent
        :channel="channel"
        :channelHeight="channelHeight"
      />
    </div>
    <button v-on:click="openAddChannelDialog">채널 추가</button>

    <br/>
    <span>채팅창 높이</span><input v-model="channelHeight">
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
  channelHeight: number = 100;

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
  color: #dad8de;
  background-color: #0e0c13;
}
body {
  background-color: #0e0c13;
}
</style>
