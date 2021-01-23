<template>
    <div :class="['bubble-container', { 'current-user' : isCurrentUser }]">
        <div class="bubble">
            <div class="bubble-title">
                <div class="sender">{{ sentBy }}</div>
                <div class="time">{{ messageTime }}</div>
            </div>
            <div class="bubble-content">{{ text }}</div>
        </div>
    </div>
</template>

<script>

    import { formatMessageTime } from "@/assets/utils.js";

    import { mapGetters } from 'vuex';

    export default {
        name: "Bubble",
        props: {
            sentBy: {
                type: String,
                required: true,
            },
            time: {
                type: Number,
                required: true,
            },
            text: {
                type: String,
            }
        },
        computed: {
            ...mapGetters(['getUserName']),
            isCurrentUser() {
                return this.sentBy === this.getUserName;
            },
            messageTime() {
                return formatMessageTime(this.time);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $bubble-color: #00aabb;
    $current-user-bubble-color: #00aa99;

    .bubble-container {
        position: relative;
        display: flex;

        &.current-user {
            justify-content: flex-end;
            margin-right: 15px;

            .bubble {
                background: $current-user-bubble-color;

                &:after {
                    border: 25px solid transparent;
                    border-left-color: $current-user-bubble-color;
                    border-right: 0;
                    border-bottom: 0;
                    left: calc(100% + 15px);
                }
            }

        }

        .bubble {
            position: relative;
            background: $bubble-color;
            border-radius: 10px;
            min-height: 60px;
            padding: 5px;
            margin: 5px;
            margin-left: 20px;
            max-width: 80%;
            text-align: start;
            box-shadow: rgba(0, 0, 0, 0.3) 1px 3px 10px 1px;

            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                width: 0;
                height: 0;
                border: 25px solid transparent;
                border-right-color: #00aabb;
                border-left: 0;
                border-bottom: 0;
                margin-top: -20px;
                margin-left: -20px;
            }

            .bubble-title {
                min-width: 150px;
                display: flex;
                justify-content: space-between;
                overflow: hidden;

                .sender {
                    font-weight: bold;
                    color: white;
                    padding: 3px 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                }
                .time {
                    font-size: small;
                    color: white;
                }
            }

            .bubble-content {
                font-family: 'Inter';
                background-color: rgba(255,255,255, 0.7);
                border-radius: 5px;
                overflow-wrap: break-word;
                padding: 10px;
            }
        }
    }


</style>