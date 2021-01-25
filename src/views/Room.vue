<template>
    <div class="room">
        <div class="room-header">
            <div>~ Welcome to room {{ id }}, be grumpy! ~</div>
            <router-link to="/rooms"> ( Back to room selection ) </router-link>

        </div>
        <div class="chat-area-container">
            <div class="grid-item connected-users-area">
                <connected-users :onlineUsers="onlineUsers"></connected-users>
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
    import ConnectedUsers from "@/components/Room/ConnectedUsers";
    import { WSMessageTypes, SOCKET_PORT } from "@/assets/utils.js";


    export default {
        name: "Room",
        props: {
        },
        components: {
            TextEditor,
            ChatArea,
            ConnectedUsers
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
                this.ws = new WebSocket(`ws://localhost:${SOCKET_PORT}/?roomId=${this.id}'&userId=${this.getUserName}`);
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

            grid-template:
                "connnected chat-area" 3fr
                "connnected emoji-bar" min-content
                "connnected text-editor" 1fr
                    / min-content 1fr;

                /*"chat-area connnected" 1fr 1fr 1fr*/
                /*"chat-area emoji-bar" 1fr;*/
                /*"chat-area text-editor" 1fr 1fr ;*/


            .grid-item {
                border: 1px solid #BBB;
                border-radius: 5px;
            }

            .connected-users-area {
                grid-area: connnected;
                position: relative;
                grid-row: 1 / span 3;
                background-color: rgba(255, 255, 255, 0.9);
                overflow: hidden;
                resize: horizontal;
            }

            .chat-area {
                grid-area: chat-area;
                /*resize: vertical;*/
            }

            .emoji-bar {
                grid-area: emoji-bar;
                min-width: 140px;
                display: flex;
                flex-wrap: wrap;

                .emoji {
                    margin-top: 1px; // account for hover
                    padding: 0 7px 0 8px; // account for border
                    vertical-align: middle;
                    border: 1px solid transparent;
                    border-right: 1px double #42b983;
                    background-color: transparent;

                    &:hover {
                        position: relative;
                        bottom: 1px;
                        background-color: white;
                        transition: background-color 0.2s;
                    }
                }
            }

            .text-editor-container {
                grid-area: text-editor;
            }
        }
    }

</style>