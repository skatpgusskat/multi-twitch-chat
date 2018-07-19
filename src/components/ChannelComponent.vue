<template>
  <div class="channel">
    {{channel.channelName}}
    <div v-for="(chat, index) in channel.chats" :key="index">
      <ChatComponent :chat="chat"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ChatComponent from "./ChatComponent.vue";

@Component({
  components: {
    ChatComponent
  }
})
export default class ChannelComponent extends Vue {
  @Prop() private channel!: Channel;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
