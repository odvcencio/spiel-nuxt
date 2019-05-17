<template>
  <div class="home-bg mb-1">
    <div
      class="has-text-left has-text-weight-light has-text-grey is-size-7 pt-2 pl-2"
    >
      <span v-show="!askQuestion">Categories</span>
      <span v-show="askQuestion">Select a category</span>
    </div>
    <div class="scroll-menu pb-3 mx-2">
      <div class="columns is-mobile">
        <b-field>
          <div
            v-for="{ name, id } in categories"
            :key="id"
            class="column is-narrow"
          >
            <b-checkbox-button
              v-model="selectedCategoriesUnique"
              :native-value="id"
              type="is-blue"
              :size="buttonSize"
            >
              <span
                :class="[
                  { checked: isSelected(id) },
                  { unchecked: !isSelected(id) }
                ]"
                class="is-capitalized"
              >
                {{ name }}
              </span>
            </b-checkbox-button>
          </div>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoriesDisplay',
  data() {
    return {
      selectedCategories: []
    }
  },
  computed: {
    selectedCategoriesUnique: {
      get: function() {
        return this.selectedCategories
      },
      set: function(newValue) {
        if (this.askQuestion && newValue.length > 1) {
          this.selectedCategories = [newValue[1]]

          this.selectedCategory()

          return this.selectedCategories
        }
        const unique = [...new Set(newValue)]
        this.selectedCategories = unique

        this.selectedCategory()

        return unique
      }
    },
    ...mapState({
      categories: state => state.category.categories
    }),
    buttonSize: {
      get: function() {
        return this.askQuestion ? 'is-default' : 'is-default'
      }
    }
  },
  props: {
    askQuestion: {
      type: Boolean
    }
  },
  methods: {
    selectedCategory() {
      this.$emit('selected-categories', this.selectedCategories)
    },
    isSelected(id) {
      return this.selectedCategories.includes(id)
    }
  }
}
</script>

<style>
.checked {
  color: white;
}

.unchecked {
  color: #135bb0;
}

.b-checkbox.checkbox.button {
  border-color: #135bb0;
}
</style>
