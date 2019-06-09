<template>
  <div>
    <div class="columns is-centered has-text-centered pt-5">
      <div class="column is-10">
        <div class="is-size-3 tight-line-height">
          Alex Cruz
        </div>
        <div class="is-size-5 pb-4">
          Chief Executive Officer - Founder
        </div>
        <div class="video-yt">
          <iframe
           :src="alexLink"
           frameborder="0"
           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
    <div class="columns is-centered has-text-centered">
      <div class="column is-10">
        <div class="is-size-3 tight-line-height">
          Don Kader
        </div>
        <div class="is-size-5 pb-4">
          Chief Operations Officer - Founder
        </div>
        <div class="video-yt">
          <iframe
           :src="donLink"
           frameborder="0"
           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
    <div class="columns is-centered has-text-centered mb-0">
      <div class="column is-10">
        <div class="is-size-3 tight-line-height">
          Oscar Villavicencio
        </div>
        <div class="is-size-5 pb-4">
          Chief Technical Officer - Founder
        </div>
        <div class="video-yt">
          <iframe
           :src="oscarLink"
           frameborder="0"
           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
    <div class="columns has-text-centered pt-3">
      <div class="column">
        <div class="is-size-3 tight-line-height">
          Makan Taghizadeh
        </div>
        <div class="is-size-5">
          Lead Backend Developer/Dev Ops Engineer
        </div>
      </div>
    </div>
    <div class="columns has-text-centered pt-3">
      <div class="column">
        <div class="is-size-3 tight-line-height">
          Behzad Ardehei
        </div>
        <div class="is-size-5">
          Lead Mobile Developer
        </div>
      </div>
    </div>
    <div class="columns has-text-centered pb-5 pt-3">
      <div class="column">
        <div class="is-size-3 tight-line-height">
          Danny Gonzalez
        </div>
        <div class="is-size-5">
          Marketing Director
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetTheTeam',
  data() {
      return {
        donLink:   'https://www.youtube.com/embed/1jD0eXaMFCQ',
        oscarLink: 'https://www.youtube.com/embed/Iz9xrOOABF4',
        alexLink:  'https://www.youtube.com/embed/VedBwVoKgps',
      };
    },
}
</script>

<style>
.video-yt {
  position: relative;
  padding-bottom: 56.25%; /*16:9*/
  padding-top: 30px;
  height: 0;
  overflow: none;
}

.video-yt iframe,
.video-yt object,
.video-yt embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 75%;
}
</style>
