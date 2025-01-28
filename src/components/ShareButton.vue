<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" :icon="icon" size="x-small" :color="`${color}`" :class="`${btnclass}`"
                @click="getFriendsListForShareWord(words)"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card :title="`Share ${words.length == 1 ? words[0] : words[0] + '...'}`">
                <v-text-field v-model="shareMessage" label="Message (Optional)" hide-details></v-text-field>
                <UserList :users="friendList" type="share" :share-attachments="returnAttachments()"
                    :share-message="shareMessage" :refresh-method="() => { getFriendsListForShareWord(words) }" />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" @click="isActive.value = false"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script>
import UserList from './UserList.vue';

export default {
    name: "ShareButtonComponent",
    components: {
        UserList,
    },
    props: {
        words: {
            type: Array,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
            default: 'mdi-share'
        },
        btnclass: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            shareMessage: '',
            friendList: [],
        };
    },
    methods: {
        async getFriendsListForShareWord(words) {
            try {
                const response = await this.postRequest('Friendships', 'GetFriendsListForShareWord', words);
                this.friendList = response.Data;
            } catch (error) {
                console.error(error);
            }
        },
        returnAttachments() {
            return this.words.map(attachment => ({
                Type: 0,
                Value: attachment,
            }));
        }
    }
};
</script>