<template>
    <div>
        <h2>Welcome to grumpy rooms!</h2>
        <div class="title"> please select a room</div>
        <br>
        <div class="title"> Generate a new one</div>
        <button class="btn btn-generate-room" @click="generateRoomIdAndRedirect">✨ Generate a new room ✨</button>
        <br>
        <br>
        <div> - OR - </div>
        <br>
        <div class="title">Enter a room path manually</div>
        <label>Room ID: </label>
        <input type="text"
               class="roomId-input"
               ref="roomInput"
               v-model="roomId"
               placeholder="Please enter a room ID"
               @keypress.enter="navigateToRoom"
        >
        <button class="btn btn-go" @click="navigateToRoom" :disabled="!roomId">Go!</button>
        <div v-if="displayError" class="error">Please enter a valid room ID</div>

    </div>
</template>

<script>
    import { generateRandomString } from '@/assets/utils.js'
    import { mapGetters } from "vuex";

    export default {
        name: "Rooms",
        data() {
            return {
                displayError: false,
                roomId: '',
            }
        },
        computed: {
            ...mapGetters(['getUserName']),
        },
        created() {
            this.$nextTick(() => {
                this.$refs.roomInput.focus();
            });

            if (!this.getUserName) {
                this.$router.push("/");
            }
        },
        methods: {
            generateRoomIdAndRedirect() {
                this.$router.push("room/" + generateRandomString(10))
            },
            navigateToRoom() {
                if (this.roomId) {
                    this.displayError = false;
                    this.$router.push("room/" + this.roomId)
                } else {
                    this.displayError = true;
                }
            }
        }

    }
</script>

<style lang="scss" scoped>

    .title {
        margin: 10px;
    }

    .error {
        color: red;
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

        &:disabled {
            background-color: darkslategrey;
            color: #cccccc;
        }
    }

    .btn-go, .roomId-input {
        padding: 10px;
    }

    .btn-generate-room {
        padding: 15px;
        border-radius: 15px;
        font-size: large;
    }

</style>