<template>
  <div class="channel">
    <div>{{channel.channelName}}님의 채널</div>
    <div ref="chats" class ="chats">
      <div v-for="(chat, index) in channel.chats" :key="index">
        <ChatComponent :chat="chat"/>
      </div>
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

  $refs: {
    chats: HTMLElement;
  };

  updated() {
    const chatsElement = this.$refs.chats;
    if (!chatsElement) {
      return;
    }
    chatsElement.scrollTop = chatsElement.scrollHeight;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channel {
  height: 100%;
}
.chats {
  height: 100px;
  overflow-y: scroll;
  word-break: break-all;
}
</style>
