<template>
  <v-row class="boxes ma-0">
  <v-col
    v-for="(box, index) in boxes"
    :key="index"
    cols="12"
  >
    <div
      class="box-card"
      :class="{
        'box-card--empty': box.AllCount == 0,
        'box-card--alert': box.UnCheckedCount > 0
      }"
    >
      <!-- Top badge -->
      <div class="box-top">
        <div class="box-number">
                     <img
              v-bind="activatorProps"
              :src="`/images/box.png`"
              alt=""
     
            />
          <span>Box {{ box.BoxNumber }}</span> 
        </div>

        <div
          class="box-status"
          :class="{
            'status-empty': box.AllCount == 0,
            'status-review': box.UnCheckedCount > 0,
            'status-checked': box.AllCount > 0 && box.UnCheckedCount == 0
          }"
        >
        
          <template v-if="box.AllCount == 0">Empty</template>
          <template v-else-if="box.UnCheckedCount > 0">Needs Checking</template>
          <template v-else>Checked</template>
        </div>
      </div>



      <!-- Stats -->
      <div class="box-stats">
        <div class="stat-item">
          <span class="stat-label">Total</span>
          <span class="stat-value">{{ box.AllCount }}</span>
        </div>

        <div class="stat-item checked">
          <span class="stat-label">Checked</span>
          <span class="stat-value">{{ box.CheckedCount }}</span>
        </div>

        <div class="stat-item highlight" v-if="box.UnCheckedCount > 0">
          <span class="stat-label">Waiting</span>
          <span class="stat-value">{{ box.UnCheckedCount }}</span>
        </div>

        <div class="stat-item" v-else>
          <span class="stat-label">Waiting for check</span>
          <span class="stat-value">0</span>
        </div>
      </div>

      <!-- Soon Time -->
      <div class="box-soon" v-if="box.AllCount > 0">
        <div class="soon-label">Closest review</div>
        <div class="soon-value">
          {{ box.SoonTime || 'Not scheduled yet' }}
        </div>
      </div>

      <!-- Special text for box 7 -->
      <div class="box-special" v-if="index == 6">
        <template v-if="box.CheckedCount > 0">
          You have deeply memorized
          <b>{{ box.CheckedCount }}</b>
          words.
        </template>
        <template v-else>
          Oops! You haven't reached this box yet.
        </template>
      </div>

      <!-- Actions -->
      <div class="box-actions">
        <router-link
          :class="{'disabled': box.UnCheckedCount==0,}"
          class="box-btn box-btn-success"
          :to="{ path: `/CheckVocabulary/${box.BoxNumber}` }"
        >
          Start Checking
        </router-link>

        <router-link
          v-if="box.AllCount > 0"
          class="box-btn box-btn-primary"
          :to="{ path: `/ReviewVocabulary/${box.BoxNumber}` }"
        >
          Review
        </router-link>

        <router-link
          class="box-btn box-btn-secondary"
          :to="{ path: `/Vocabularies/${box.BoxNumber}` }"
        >
          View All Words
        </router-link>

        <router-link
          v-if="box.AllCount == 0 && index == 0"
          class="box-btn box-btn-success"
          :to="{ path: `/AddVocabulary` }"
        >
          Add New
        </router-link>

        <span
          v-if="box.AllCount == 0 && index > 0"
          class="box-btn box-btn-disabled"
        >
          It's Empty
        </span>
      </div>
    </div>
  </v-col>
</v-row>

</template>


<script>
import { useSharedMethods } from '../stores/sharedMethodsStore';

export default {
    name: 'BoxesPage',
    components: {

    },
    data() {
        return {
            boxes: [],
            sharedMethods: useSharedMethods(),
        };
    },
    methods: {
        async getVocabulariesBoxes() {
            const response = await this.postRequest('Vocabularies', 'GetVocabulariesBoxes', this.loginForm);
            this.boxes = response.Data;
        }
    },
    created() {
        this.getVocabulariesBoxes();
        const sharedStore = useSharedMethods();
        this.triggerAction_getVocabulariesBoxes = sharedStore.triggerAction_getVocabulariesBoxes;
    },
    watch: {
        'sharedMethods.triggerAction_getVocabulariesBoxes': {
            immediate: true,
            handler(newVal) {
                if (newVal){
                    this.getVocabulariesBoxes();
                    this.sharedMethods.toggle_getVocabulariesBoxes();
                }
            },
        },
    },
};

</script>
<style>


</style>