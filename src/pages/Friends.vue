<template>
    <v-card>
        <v-card-title>
            <v-card class="mx-0 mt-2" color="surface-light">
                <v-card-text>
                    <v-text-field append-inner-icon="mdi-magnify" density="compact" clearable
                        label="Search in users" variant="solo" hide-details v-stop-typing="search"
                        @click:append-inner="search" @click:clear="search" v-model="searchText"></v-text-field>
                </v-card-text>
            </v-card>
        </v-card-title>

        <v-card-body>
            <v-list class="mt-2">
                <v-list-subheader>
                    Search List
                </v-list-subheader>
                <v-list-subheader v-if="users.length == 0">
                    <v-list-item-title>There are no users yet.</v-list-item-title>
                    <v-list-item-subtitle>You can search users and send a friend request</v-list-item-subtitle>
                </v-list-subheader>
                <UserList :users="users" :search="search" :getFriendList="getFriendList" />
            </v-list>
        </v-card-body>
        <v-card-body>
            <v-list class="mt-2">
                <v-list-subheader>
                    Friend List
                </v-list-subheader>
                <v-list-subheader v-if="friends.length == 0">
                    <v-list-item-title>There are no friends yet.</v-list-item-title>
                    <v-list-item-subtitle>You can search users and send a friend request</v-list-item-subtitle>
                </v-list-subheader>
                <UserList :users="friends" :search="search" :getFriendList="getFriendList" />
            </v-list>
        </v-card-body>
    </v-card>



</template>
<script>
import UserList from '@/components/UserList.vue';

export default {
    name: 'FriendsPage',
    components: {
        UserList,
    },
    data() {
        return {
            searchText: '',
            users: [],
            friends: [],
            userProfileStatics: {},
            friendshipStatuses: {
                Pending: 0,
                Accepted: 1,
                Nothing: 6,
            }
        };
    },
    async mounted() {
        await this.getFriendList();
    },
    methods: {
        async search() {
            if (this.searchText==null || this.searchText.length < 3) {
                this.users = [];
                return;
            }
            const response = await this.postRequest('Users', 'SearchUsers', this.searchText, false);
            if (response.IsSuccess)
                this.users = response.Data;
            else
                this.users = [];
        },
        async getFriendList() {
            const response = await this.postRequest('Friendships', 'GetFriendships', null, false);
            if (response.IsSuccess)
                this.friends = response.Data;
            else
                this.friends = [];
        },

    }
}
</script>
