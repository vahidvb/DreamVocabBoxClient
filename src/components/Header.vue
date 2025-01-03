<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img :src="'images/avatars/avatar-' + avatar + '.png'" alt="User Avatar" style="width:40px;"
          class="rounded-pill">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/Boxes" class="nav-link">Boxes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/AddVocabulary" class="nav-link">Add New Word</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      nickName: localStorage.getItem("nickname"),
      avatar: localStorage.getItem("avatar"),
    };
  }
};
</script>

<style>
.main-header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

nav a {
  margin: 0 1rem;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}
</style>