<template>
    <v-card class="pa-4">
        <v-row no-gutters>
            <v-col cols="4">
                <v-divider></v-divider>
            </v-col>
            <v-col cols="4" class="text-center">
                <v-label style="font-weight: bold;">{{ title }}</v-label>
            </v-col>
            <v-col cols="4">
                <v-divider></v-divider>
            </v-col>
            <v-col cols="12" style="font-size: 14px;">
                <v-text>
                    <span v-html="formattedValue"></span>
                </v-text>

            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "DetailCardComponent",
    props: {
        title: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
    },
    computed: {
        formattedValue() {
            return this.value.replace(/\n/g, '<br>');
        }
    }
};
</script>
