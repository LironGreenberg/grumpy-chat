<template>
    <div class="room">
        <div class="room-header">
            <div>~ Welcome to room {{ id }}, be grumpy! ~</div>
            <router-link to="/rooms"> ( Back to room selection ) </router-link>

        </div>
        <div class="chat-area-container">
            <div class="grid-item connected-users-area">
                <div class="connected-users-title">
                    Grumpies in this room ({{ onlineUsers.length }})
                </div>
                <div class="connected-users-container">
                    <user-display v-for="user in onlineUsers" :key="user" :name="user"></user-display>
                </div>
            </div>
            <div class="grid-item chat-area">
                <chat-area :messages="messages"></chat-area>
            </div>
            <div class="grid-item emoji-bar">
                <button class="emoji" @click="addEmojiToEditor('😺')">😺</button>
                <button class="emoji" @click="addEmojiToEditor('😸')">😸</button>
                <button class="emoji" @click="addEmojiToEditor('😻')">😻</button>
                <button class="emoji" @click="addEmojiToEditor('😼')">😼</button>
                <button class="emoji" @click="addEmojiToEditor('🙀')">🙀</button>
                <button class="emoji" @click="addEmojiToEditor('😾')">😾</button>
                <button class="emoji" @click="addEmojiToEditor('😿')">😿</button>
                <button class="emoji" @click="addEmojiToEditor('😹')">😹</button>
            </div>
            <div class="grid-item text-editor-container">
                <text-editor ref="textEditor" @onMessage="sendMessage"></text-editor>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import TextEditor from "@/components/Room/TextEditor";
    import ChatArea from "@/components/Room/ChatArea";
    import UserDisplay from "@/components/Room/UserDisplay";
    import { WSMessageTypes } from "@/assets/utils.js";


    export default {
        name: "Room",
        props: {
        },
        components: {
            TextEditor,
            ChatArea,
            UserDisplay
        },
        computed: {
            ...mapGetters(['getUserName']),
        },
        created() {
            if (!this.getUserName) {
                this.$router.push("/");
                return;
            }
            this.initWS();
        },
        data() {
            return {
                id: this.$route.params.id,
                ws: null,
                onlineUsers: [],
                messages: [], //TODO get history?
            }
        },
        methods: {
            sendMessage(data) {
                if (!this.ws) {
                    console.log('No connection');
                    return;
                }
                this.ws.send(JSON.stringify({
                    userId: this.getUserName,
                    roomId: this.id,
                    text: data,
                    time: Date.now()
                }));
            },
            initWS() {
                if (this.ws) {
                    this.ws.onerror = this.ws.onopen = this.ws.onclose = null;
                }
                this.ws = new WebSocket('ws://localhost:9999/?roomId=' + this.id + '&userId=' + this.getUserName);
                this.ws.onopen = () => {
                    console.log('Connection opened for room ' + this.id);
                }
                this.ws.onmessage = ({ data }) => this.onNewMessage(data);
                this.ws.onclose = () => this.ws = null;
            },
            onNewMessage(data) {
                const parsedData = JSON.parse(data);
                switch (parsedData.type) {
                    case WSMessageTypes.PARTICIPANT_UPDATE:
                        this.onlineUsers = parsedData.content || [];
                        break;
                    case WSMessageTypes.INCOMING_MESSAGE:
                        this.messages.push(parsedData.content);
                        break;
                }
            },
            addEmojiToEditor(emoji) {
                this.$refs.textEditor.appendEmoji(emoji);
            }
        },
        destroyed() {
            this.ws?.close();
        }
    }
</script>

<style lang="scss" scoped>

    .room {
        display: flex;
        flex-flow: column;
        height: 100%;

        .room-header {
            padding: 20px;
            background-color: #EBF8F0;
        }

        .chat-area-container {
            padding: 5px;
            flex-grow : 1;
            background-color: #EEE;
            display: grid;
            grid-template-columns: minmax(50px, 150px) auto;
            grid-template-rows: 75% auto auto;
            row-gap: 5px;
            column-gap: 5px;

            .grid-item {
                border: 1px solid #BBB;
                border-radius: 5px;
            }

            .connected-users-area {
                position: relative;
                grid-row: 1 / span 3;
                background-color: rgba(255, 255, 255, 0.9);
                overflow: hidden;

                .connected-users-container {
                    position: absolute;
                    width: 100%;
                    height: calc(100% - 50px);
                    overflow: auto;
                }

                .connected-users-title {
                    margin: 5px;
                    height: 50px;
                    border-bottom: 1px dashed #42b983;
                }
            }

            .emoji-bar {
                min-width: 140px;
                display: flex;
                flex-wrap: wrap;

                .emoji {
                    vertical-align: middle;
                    border: 1px solid transparent;
                    background-color: transparent;

                    &:hover {
                        background-color: white;
                        transition: background-color 0.2s;
                    }
                }
            }
        }
    }

</style>