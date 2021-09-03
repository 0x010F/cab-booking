<template>
  <div id="sidebar" :class="{ active: isActive }">
    <div class="sidebar-header">
      <img src="../../assets/logo_mkcl_w.svg" class="logo" />
    </div>

    <div class="custom-menu">
      <button
        type="button"
        id="sidebarCollapse"
        class="btn btn-primary"
        @click="toggleSideBar()"
      >
        <i class="mdi mdi-menu"></i>
        <span class="sr-only">Toggle Menu</span>
      </button>
    </div>

    <div v-bar>  
      <div class="sidebar-vbar">
        <ul>
          <!-- <template v-for="(page, i) in this.$router.options.routes">
            <li :key="i">
              <b-link :to="page.path"
                ><i class="sidebar-icon" :class="page.meta.icon"></i>
                {{ page.name }}</b-link
              >
            </li>
          </template> -->

          <li>
            <router-link to="/login"><i class="mdi mdi-account sidebar-icon"></i>Login</router-link>
          </li>

           <li>
            <router-link to="/registration"><i class="mdi mdi-account-edit sidebar-icon"></i>Registration</router-link>
          </li>

        </ul>
      </div>     
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data: function() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleSideBar() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style></style>
