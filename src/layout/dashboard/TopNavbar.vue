<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <div class="navbar-brand2" href="#">
          <img width="45px" src="@/assets/img/fhir.svg" alt="" />
          <i> Health Level7</i>
      </div>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-virus-covid" />
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-notes-medical" />
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-people-arrows" />
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-prescription" />
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-kit-medical" />
            </a>
          </li>
          <drop-down
            class="nav-item"
            title-classes="nav-link"
            icon="ti-bell"
          >
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-envelope" />
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-calendar-days" />
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <font-awesome-icon class="fa_icon" icon="fa-solid fa-user" />
            </a>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style>


  .fa_icon {
    font-size: 16px;
    margin-top: 4px;
    color: #093629;
  }

  .navbar .nav-link i {
    font-size: 16px;
    color: #093629;
  }

  .navbar-brand2 {
    font-weight: bold;
    margin-top: 4px;
    font-size: 18px;
    font-family: emoji;
    color: #c11d0c;
    text-transform: uppercase;
    display:inline-block;
  }

</style>
