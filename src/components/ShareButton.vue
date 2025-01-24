<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" icon="mdi-share" size="x-small" :color="`${color}`"  :class="`${btnclass}`"
                @click="getFriendsListForShareWord(word)"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card :title="`Share ${word}`">

                <v-text-field v-model="shareMessage" label="Message (Optional)" hide-details></v-text-field>
                <UserList :users="friendList" type="share" :share-badge="returnBadge"
                    :share-message="shareMessage"
                    :refresh-method="() => { getFriendsListForShareWord(word) }" />

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
        word:{
            type: String,
            required: true,
        },
        color:{
            type: String,
            required: true,
        },
        btnclass:{
            type: String,
            required: true,
        }
    },
    data() {
        return {
            shareMessage:'',
            friendList:[],
        };
    },
    methods: {
        async getFriendsListForShareWord(word) {
            try {
                const response = await this.postRequest('Friendships', 'GetFriendsListForShareWord', word);
                this.friendList = response.Data;
            } catch (error) {
                console.error(error);
            }
        },
        returnBadge() {
            return {
                Attachments: [{
                    Type: 0,
                    Value: this.word,
                }]
            }
        }
    }
};
</script>