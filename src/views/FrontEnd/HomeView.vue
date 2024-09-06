<script setup lang="ts"></script>

<template>
  <main>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/dashboard">後台</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView></RouterView>
  </main>
</template>
