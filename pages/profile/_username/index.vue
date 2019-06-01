<template>
  <div class="">
    <div class="profileInfo">
      <div class="profileInfo columns is-centered pt-5">
        <div class="column is-half has-text-centered">
          <div class="avatar">
            <v-avatar
                size="73"
                color="grey lighten-4"
                class="mx-1"
                >
                <v-img :src="this.profilePhotoURL" alt="avatar"> </v-img>
            </v-avatar>
          </div>
          <div class='subheading'>{{ this.firstName + ' ' + this.lastName }}</div>
          <div class='subheading has-text-weight-semibold'>{{ this.title + ' at ' + this.company  }}</div>
          <div class='subheading'>Member since: {{ this.friendlyJoinDate }}</div>
          <hr class='hr'>
          <div class='subheading'>{{ this.aboutMe }}</div>
        </div>
      </div>
    </div>
    <div v-if="hasSpiels">
      <div class="columns is-centered pt-5">
        <div class="column is-4-desktop is-6-tablet is-10-mobile has-text-centered mx-auto">
          <SpielList :userSpiels="userSpiels"/>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="columns is-centered pt-5">
        <div class="column is-4-desktop is-6-tablet is-10-mobile has-text-centered mx-auto">
            User hasn't answered any questions yet.
        </div>
      </div>
    </div>
  </div> <!-- Root -->
</template>
<script>
import user from '@/api/user'
import SpielList from '@/components/profile/SpielList.vue'
export default {
  name: 'Profile',
  data(){
     return {
      firstName:        '',
      lastName:         '',
      profilePhotoURL:  '',
      title:            '',
      company:          '',
      friendlyJoinDate: '',
      aboutMe:          '',
      userSpiels:       [],
      hasSpiels:        Boolean,
      username:         this.$route.params.username
    };
  },
  methods: {
    getUser() {
      user.getUserByUsername(
        userAndSpiels => {
          this.firstName        = userAndSpiels.user.first_name;
          this.lastName         = userAndSpiels.user.last_name;
          this.profilePhotoURL  = userAndSpiels.user.profile_photo_url;
          this.title            = userAndSpiels.user.title;
          this.company          = userAndSpiels.user.company;
          this.friendlyJoinDate = userAndSpiels.user.friendly_join_date;
          this.aboutMe          = userAndSpiels.user.about_me;

          if (userAndSpiels.spiels !== null) {
            this.userSpiels = userAndSpiels.spiels;
            this.hasSpiels  = true
          } else {
            this.hasSpiels = false
          }
        },
        error => {
          this.$router.push({ name: 'home' });
        },
        this.username
      )
    },
  },
  mounted: function() {
    this.getUser();
  },
  components: {
    SpielList,
  }
}
</script>

<style>
.avatar {
  margin-bottom: 20px;
}
.profileInfo {
  margin-top: 20px;
}
.hr {
  width: 50%;
  margin-left: 25%;
  margin-right: 50%;
  border-bottom: 2px solid rgba(216, 216, 216, 1);
}
</style>
