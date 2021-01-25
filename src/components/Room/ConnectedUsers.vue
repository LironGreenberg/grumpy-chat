<template>
    <div div="connected-users">
        <div class="connected-users-title">
            Grumpies in this room ({{ onlineUsers.length }})
        </div>
        <div class="connected-users-container">
            <user-display v-for="user in onlineUsers" :key="user" :name="user"></user-display>
        </div>
    </div>

</template>

<script>
    import UserDisplay from "@/components/Room/UserDisplay";

    export default {
        name: "ConnectedUsers",
        components: {
            UserDisplay,
        },
        props: {
            onlineUsers: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="scss" scoped>

    .connected-users {
        display: flex;
        flex-flow: row;
        height: 100%;
    }

    .connected-users-container {
        position: absolute;
        width: 100%;
        height: calc(100% - 50px);
        overflow: auto;
    }

    .connected-users-title {
        margin: 5px;
        border-bottom: 1px dashed #42b983;
    }

</style>