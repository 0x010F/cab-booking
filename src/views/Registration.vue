<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="justify-content-center">
      <b-col>
        <b-form
          inline
          @submit.prevent="saveData"
          class="justify-content-center"
        >
          <b-input
            type="text"
            id="loginId"
            placeholder="loginId"
            v-model="loginId"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          />

          <b-input
            type="text"
            id="password"
            placeholder="password"
            v-model="password"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          />
          <b-form-file
            type="file"
            id="file"
            name="file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            class="mb-2 mr-sm-2 mb-sm-0 form-control "
          />
          <b-button
            variant="primary"
            type="submit"
          >
            Submit
          </b-button>
        </b-form>
        <div v-text="result" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      loginId: '',
      password: '',
      file: null,
      result: ''
    }
  },
  mounted () {
    let self = this
    document.getElementById('file').addEventListener(
      'change',
      function (evt) {
        var files = evt.target.files
        self.file = files[0]
      },
      false
    )
  },
  methods: {
    saveData () {
      const form = new FormData()
      form.set('enctype', 'multipart/form-data')
      form.append('file', this.file, this.file.name)
      form.append('loginId', this.loginId)
      form.append('password', this.password)
    }
  }
}
</script>

<style>
</style>
