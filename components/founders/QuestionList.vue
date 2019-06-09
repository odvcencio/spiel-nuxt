<template>
  <div class="pt-2">
    <div v-for="question in questions"
         :key="question.id"
         class="home-bg question-cell"
         @click="cellClicked(question)">
       <div class="columns mx-auto is-mobile">
         <div class="column">
           <div class="has-text-left is-size-5">
             {{ question.question }}
           </div>
         </div>
         <div class="column is-3">
           <span v-if="question.answered" class="has-text-success is-pulled-right">
             Answered
           </span>
           <span v-else class="has-text-danger is-pulled-right">
             Unanswered
           </span>
         </div>
       </div>
       <div>
         <hr class="divider-card" />
       </div>
     </div>
  </div>
</template>

<script>
import questions from '@/api/questions'
import SpielRecorder from '@/components/spiels/SpielRecorder'
import SpielPlayer from '@/components/spiels/SpielPlayer'
import { toast } from "bulma-toast";

export default {
  name: 'QuestionList',
  props: {
    questions: {
      type: Array
    }
  },
  data() {
    return {
      question: {}
    };
  },
  methods: {
    cellClicked(question) {
      this.question = question

      if (question.answered) {
        if (question.spiels[0].video_url) {
          this.openPlayer(question.spiels[0].video_url);
        } else {
          this.$emit('notReadyYet')
          toast({
            message: "Video Is Not Ready Yet. Please try again in a few seconds.",
            type: "is-danger",
            dismissible: true,
            position: "top-center"
          });
        }

      } else {
        this.openRecorder(question.question, question.id);
      }
    },
    openRecorder(question, id) {
      this.$modal.open({
        parent: this,
        component: SpielRecorder,
        props: {
          question:    question,
          questionID:  id
        }
      })
    },
    openPlayer(url) {
      this.$modal.open({
        parent: this,
        component: SpielPlayer,
        props: {
          link:   url,
          retake: true
        },
        events: {
          'retake': () => {
            this.openRecorder(this.question.question, this.question.original_id)
          }
        }
      })
    },
  },
}
</script>

<style>
</style>
