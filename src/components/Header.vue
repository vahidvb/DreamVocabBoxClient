<template>
    <header class="main-header">
      <img v-bind:src="'images/avatars/avatar-' + avatar + '.png'">
      <h1>{{ nickName }}</h1>
      <nav>
        <a href="/Boxes">Boxes</a>
        <a href="/AddWord">Add New Word</a>
      </nav>
    </header>
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
  