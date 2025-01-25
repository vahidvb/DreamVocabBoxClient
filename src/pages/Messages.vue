<template>

    <v-list-item-group v-for="(message, messagesIndex) in messages" :key="messagesIndex">

        <v-list-item :prepend-avatar="`images/avatars/avatar-${message.Avatar}.png`">
            <v-list-item-title>{{ message.NickName }}</v-list-item-title>
                <v-list-item-subtitle>{{ message.UserName }}</v-list-item-subtitle>
                <v-list-item-action>
                    <v-text class="description-text">{{ message.LastMessage }}</v-text>
                </v-list-item-action>
                <template v-slot:append>
                    <v-badge :model-value="message.UnreadCount > 0" :content="message.UnreadCount" color="danger"
                class="w-100 pe-2">
            </v-badge>
                </template>
        </v-list-item>
        <v-list-item v-if="messagesIndex < messages.length - 1">
            <v-divider inset style="margin: 0; max-width: 100%"></v-divider>
        </v-list-item>

    </v-list-item-group>



</template>
<script>

export default {
    name: 'FriendsPage',
    components: {
    },
    data() {
        return {
            messages: [],

        };
    },
    async mounted() {
        await this.getMessages();
    },
    methods: {
        async getMessages() {
            const form = {
                "ListLength": 1000,
                "ListPosition": 0
            };
            const response = await this.postRequest('Messages', 'GetMessagesList', form, true);
            if (response.IsSuccess)
                this.messages = response.Data.Items;
            else
                this.messages = [];
        },

    }
}
</script>
