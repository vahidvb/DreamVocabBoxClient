<template>
    <v-container>
        <v-row>
            <v-col v-for="(message, index) in messages" :key="index" cols="12">
                <v-card class="pa-3 d-flex flex-column align-start">
                    <div style="display:inline-flex">

                        <!-- Avatar section -->
                         <div class="text-left me-2">
                             <v-avatar class="mb-3">
                                 <img :src="message.IsUserSent
                                     ? `images/avatars/avatar-${userInfoStore.avatar}.png`
                                     : `images/avatars/avatar-${friendProfile.Avatar}.png`" alt="Avatar" />
                             </v-avatar>
                    
                         </div>
    
                        <!-- Message content -->
                        <div class="text-left">
                            <div class="font-weight-bold text-h6">
                                {{ message.IsUserSent ? userInfoStore.nickname : friendProfile.UserName }}
                            </div>
                            <div class="text-body-2">
                                {{ message.Content }}                     
                            </div>
    
                            <!-- Attachments -->
                            <div v-if="message.Attachments.length > 0">
                                <v-text class="description-text font-weight-bold">Word Suggestions:<br></v-text>
                                <v-container class="pa-0 mt-2">
                                    <v-row v-for="(attach, attachIndex) in message.Attachments" :key="attachIndex" hide-details>
                                        <v-col class="py-0">
                                            <router-link :to="getVocabularyLink(attach)"
                                                class="text-decoration-none text-primary">
                                                {{ attach.Word }}
                                            </router-link>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </div>
                    </div>

                    <!-- Read status -->
                    <div class="text-right w-100">
                        <v-text class="description-text me-2">
                                    {{ message.RegisterDateHumanReadable }}
                                </v-text>
                        <v-icon v-if="!message.ReadAt" color="grey">mdi-check</v-icon>
                        <v-icon v-else color="primary">mdi-check-all</v-icon>
                        <!-- <v-text v-if="message.ReadAt" class="description-check text-grey-darken-1 ml-2">
                            {{ message.ReadAt }}
                        </v-text> -->
                    </div>
                </v-card>


            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { useUserInfoStore } from '../stores/userInfoStore';

export default {
    name: 'MessagesPage',
    components: {
    },
    data() {
        return {
            messages: [],
            friendProfile: {},
            userInfoStore: useUserInfoStore(),

        };
    },
    async mounted() {
        await this.getFriendProfile();
        await this.getMessages();
        this.userInfoStore.reloadValues();
    },
    methods: {
        async getMessages() {
            const form = {
                "FriendUserId": this.$route.params.userId,
                "ListLength": 1000,
                "ListPosition": 0
            };
            const response = await this.postRequest('Messages', 'GetMessages', form, true);
            if (response.IsSuccess)
                this.messages = response.Data.Items;
            else
                this.messages = [];
            console.log(this.messages);
        }, async getFriendProfile() {
            const response = await this.postRequest('Users', 'GetUserPublic', this.$route.params.userId);
            if (response.IsSuccess)
                this.friendProfile = response.Data;
            else
                this.friendProfile = {};
            console.log(response.Data);

        },
        getVocabularyLink(attach) {
            const params = new URLSearchParams();
            params.append('Word', attach.Word);
            if (attach.Meaning) params.append('Meaning', attach.Meaning);
            if (attach.Example) params.append('Example', attach.Example);
            if (attach.Description) params.append('Description', attach.Description);

            return attach.Meaning || attach.Description || attach.Example
                ? `/AddVocabulary?${params.toString()}`
                : `/AddVocabulary/${attach.Word}`;
        },

    }
}
</script>
