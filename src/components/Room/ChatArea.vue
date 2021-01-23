<template>
    <div class="chat-area">
        <div ref="bubbleContainer" class="bubbles-container">
            <transition-group name="bubble">
                <bubble v-for="message in messages"
                        :key="message.time"
                        :sentBy="message.userId"
                        :time="message.time"
                        :text="message.text"
                ></bubble>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import Bubble from '@/components/Room/Bubble';

    export default {
        name: "ChatArea",
        props: {
            messages: {
                type: Array,
                default: () => []
            },
            participantColors: {
                type: Object,
                default: () => {}
            }
        },
        components: {
            Bubble
        },
        watch: {
            messages() {
                // scroll to bottom
                this.$nextTick(() => {
                    this.$refs.bubbleContainer.scrollTop = this.$refs.bubbleContainer.scrollHeight;
                })
            },
        },
    }
</script>

<style lang="scss" scoped>

    .chat-area {
        position: relative;
        width: 100%;
        height: 100%;
        background: url('../../assets/background.png');
        opacity: 0.9;
        background-size: cover;
        border-radius: 5px;

        .bubbles-container {
            position: absolute;
            height: 100%;
            overflow: auto;
            overflow-x: hidden;
            width: 100%;
            display: flex;
            flex-flow: column;

            .bubble-enter-active {
                transition: opacity .5s;
            }
            .bubble-enter {
                opacity: 0;
            }
        }
    }


</style>