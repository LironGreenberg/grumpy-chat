<template>
    <div class="user-display">
        <div class="user-image-container">
            <img class="user-image" :src="picture || `https://robohash.org/${name}`" alt="user picture">
        </div>
        <div class="user-name">{{ name }}</div>
    </div>
</template>

<script>
    export default {
        name: "UserDisplay",
        props: {
            name: {
                type: String,
                required: true
            },
            picture: {
                type: String,
                default: ''
            },

        }
    }
</script>

<style lang="scss" scoped>

    .user-display {
        display: flex;
        padding: 5px;
        margin: 10px 5px;

        .user-name {
            top: -2px;
            padding-left: 7px;
            position: relative;
            font-weight: bold;
            word-break: break-word;
            align-self: center;
        }

        .user-image-container {
            align-self: center;
            .user-image {
                border-radius: 50%;
                border: 2px solid #42b983;
                width: 30px;
                height: 30px;
            }
        }
    }
</style>