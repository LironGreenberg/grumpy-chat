<template>
    <div class="text-editor">
        <textarea class="message-area" ref="messageArea" v-model="message" @keypress.prevent.enter="handleMessage"></textarea>
        <button class="btn btn-send" @click="handleMessage" :disabled="!message">Send</button>
    </div>
</template>

<script>
    export default {
        name: "TextEditor",
        props: {
            userName: {
                type: String,
                default: '',
            },
            userPicture: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                message: '',
            }
        },
        created() {
            this.$nextTick(() => {
                this.$refs.messageArea.focus();
            });
        },
        methods: {
            handleMessage() {
                if (this.$refs.messageArea.value) {
                    this.$emit('onMessage', this.$refs.messageArea.value);
                    this.$refs.messageArea.value = '';
                    this.message = '';
                }
            },
            appendEmoji(emoji) {
                const insertLocation = this.$refs.messageArea.selectionStart;
                this.message = this.message.slice(0, insertLocation) + emoji + this.message.slice(insertLocation);
                this.$refs.messageArea.focus();
                this.$nextTick(() => {
                    this.$refs.messageArea.selectionEnd = insertLocation + 1;
                })
            }
        }

    }
</script>

<style lang="scss" scoped>

    .text-editor {
        width: 100%;
        height: 100%;
        display: flex;

        textarea {
            width: 100%;
            resize: none;
            padding: 15px;
        }

        .btn {
            background-color: cadetblue;
            color: white;
            outline: none;
            transition: background-color 0.2s;
            font-weight: bold;
            border: 2px solid cadetblue;

            &:hover {
                background-color: lightseagreen;
            }
        }

        .btn-send {
            &:disabled {
                background-color: darkslategrey;
                color: #cccccc;
            }
        }
    }

</style>