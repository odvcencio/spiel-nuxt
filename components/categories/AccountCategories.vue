<template>
  <div>
    <div class="py-2" v-for="{ name, id } in categories" :key="id">
      <div class="columns home-bg is-desktop category-border">
        <div class="column">
          <span class="is-capitalized">{{ name }}</span>
          <b-checkbox-button
              v-model="selectedCategoriesUnique"
              :native-value="id"
              type="is-blue"
              size="is-small"
              class="is-pulled-right">
              <span class="icon has-text-white mx-auto">
                <div v-bind:class="[{ checked:   isSelected(id) },
                                    { unchecked: !isSelected(id) }]" >
                  <b-icon icon="fas fa-plus"></b-icon>
                </div>
              </span>
          </b-checkbox-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AccountCategories',
  data() {
    return {
      selectedCategories: [],
    };
  },
  computed: {
    selectedCategoriesUnique: {
      get: function () {
        return this.selectedCategories
      },
      set: function (newValue) {
        let unique = [...new Set(newValue)];
        this.selectedCategories = unique;

        if (newValue.length == 1) {
          this.selectedCategories.push(newValue[0])
          this.selectedCategory();
          return this.selectedCategories
        }

        this.selectedCategory();
        return unique
      },
    },
    ...mapState({
      categories: state => state.category.categories,
    }),
    ...mapGetters({
      userCategoryIDs: 'user/categoryIDs'
    })
  },
  props: {
    userCategories: {
      type: Array
    }
  },
  methods: {
    selectedCategory() {
      this.$emit('selected-categories', this.selectedCategories)
    },
    isSelected(id)
    {
      return (this.selectedCategories.includes(id))
    }
  },
  watch: {
    userCategoryIDs (newArray) {
      if (newArray) {
        this.selectedCategories = newArray;
      }
    }
  },
  mounted: function (){
    this.selectedCategories = this.userCategoryIDs;
  }
}
</script>
<style>
.category-border {
  border:.1rem solid rgb(241,241,241);
}
</style>
