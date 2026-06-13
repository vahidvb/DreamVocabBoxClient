<template>
  <v-row class="boxes ma-0">
    <v-col v-for="(box, index) in boxes" :key="index" cols="12">
      <div class="box-card" :class="{
        'box-card--empty': box.AllCount == 0,
        'box-card--alert': box.UnCheckedCount > 0
      }">

        <!-- Top badge -->
        <div class="box-top">
          <div class="box-number">
            <img v-bind="activatorProps" :src="`/images/box.png`" alt="" />

            <span>
              {{ $t('pages.boxes.box') }} {{ box.BoxNumber }}
            </span>
          </div>

          <div class="box-status" :class="{
            'status-empty': box.AllCount == 0,
            'status-review': box.UnCheckedCount > 0,
            'status-checked': box.AllCount > 0 && box.UnCheckedCount == 0
          }">
            <template v-if="box.AllCount == 0">
              {{ $t('pages.boxes.empty') }}
            </template>

            <template v-else-if="box.UnCheckedCount > 0">
              {{ $t('pages.boxes.needsChecking') }}
            </template>

            <template v-else>
              {{ $t('pages.boxes.checked') }}
            </template>
          </div>
        </div>

        <!-- Stats -->
        <div class="box-stats">
          <div class="stat-item">
            <span class="stat-label">
              {{ $t('pages.boxes.total') }}
            </span>
            <span class="stat-value">{{ box.AllCount }}</span>
          </div>

          <div class="stat-item checked">
            <span class="stat-label">
              {{ $t('pages.boxes.checked') }}
            </span>
            <span class="stat-value">{{ box.CheckedCount }}</span>
          </div>

          <div class="stat-item highlight" v-if="box.UnCheckedCount > 0">
            <span class="stat-label">
              {{ $t('pages.boxes.waiting') }}
            </span>
            <span class="stat-value">{{ box.UnCheckedCount }}</span>
          </div>

          <div class="stat-item" v-else>
            <span class="stat-label">
              {{ $t('pages.boxes.waitingForCheck') }}
            </span>
            <span class="stat-value">0</span>
          </div>
        </div>

        <!-- Soon Time -->
        <div class="box-soon" v-if="box.AllCount > 0">
          <div class="soon-label">
            {{ $t('pages.boxes.closestReview') }}
          </div>

          <div class="soon-value">
            {{ formatDuration(box.SoonTime) || $t('pages.boxes.notScheduled') }}
          </div>
        </div>

        <!-- Special text for box 7 -->
        <div class="box-special" v-if="index == 6">
          <template v-if="box.CheckedCount > 0">
            {{ $t('pages.boxes.deeplyMemorized', { count: box.CheckedCount }) }}
          </template>

          <template v-else>
            {{ $t('pages.boxes.notReachedYet') }}
          </template>
        </div>

        <!-- Actions -->
        <div class="box-actions">

          <router-link :class="{ 'disabled': box.UnCheckedCount == 0 }" class="box-btn box-btn-success"
            :to="{ path: `/CheckVocabulary/${box.BoxNumber}` }">
            {{ $t('pages.boxes.startChecking') }}
          </router-link>

          <router-link v-if="box.AllCount > 0" class="box-btn box-btn-primary"
            :to="{ path: `/ReviewVocabulary/${box.BoxNumber}` }">
            {{ $t('pages.boxes.review') }}
          </router-link>

          <router-link class="box-btn box-btn-secondary" :to="{ path: `/Vocabularies/${box.BoxNumber}` }">
            {{ $t('pages.boxes.viewAllWords') }}
          </router-link>

          <router-link v-if="box.AllCount == 0 && index == 0" class="box-btn box-btn-success"
            :to="{ path: `/AddVocabulary` }">
            {{ $t('pages.boxes.addNew') }}
          </router-link>

          <span v-if="box.AllCount == 0 && index > 0" class="box-btn box-btn-disabled">
            {{ $t('pages.boxes.itsEmpty') }}
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
    formatDuration(seconds) {

      seconds = Math.max(0, seconds)

      const days = Math.floor(seconds / 86400)
      seconds %= 86400

      const hours = Math.floor(seconds / 3600)
      seconds %= 3600

      const minutes = Math.floor(seconds / 60)

      const parts = []

      if (days) parts.push(`${days} ${this.$t('time.day', days)}`)
      if (hours) parts.push(`${hours} ${this.$t('time.hour', hours)}`)
      if (minutes) parts.push(`${minutes} ${this.$t('time.minute', minutes)}`)

      return parts.join(' ')
    },
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
        if (newVal) {
          this.getVocabulariesBoxes();
          this.sharedMethods.toggle_getVocabulariesBoxes();
        }
      },
    },
  },
};

</script>
<style></style>