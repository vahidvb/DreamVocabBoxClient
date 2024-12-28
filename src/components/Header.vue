<template>
    <header class="main-header">
      <h1>{{ nickName }}</h1>
      <nav>
        <a href="/">خانه</a>
        <a href="/about">درباره ما</a>
        <a href="/contact">تماس با ما</a>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',   
     data() {
        return {
            nickName: localStorage.getItem("nickname"),
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
  