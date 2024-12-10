<template>
  <footer class="bottom-bar">
    <div class="footer-content">
      <p>&copy; 2024 PostIt. All rights reserved.</p>
      <p>
        <a href="/privacy-policy" class="footer-link">Privacy Policy</a> | 
        <a href="/terms-of-service" class="footer-link">Terms of Service</a>
      </p>
      <p><a href="/contactUs" class="footer-link">Contact us</a></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer-content {
  text-align: center;
  font-size: 14px;
  color: #888;
}

.footer-link {
  color: #888;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
  color: #555;
}
</style>
