<template>
  <footer>
    <div class="footer__content">
      <div class="footer__nav">
        <router-link to="/" class="footer__link">Community</router-link>
        <router-link to="/" class="footer__link">Company</router-link>
        <router-link to="/" class="footer__link">
          <img
            class="footer__logo"
            src="../../assets/LogoHiJiffy.png"
            alt="HiJiffy Logo"
          />
        </router-link>
        <router-link to="/" class="footer__link">Help Desk</router-link>
        <router-link to="/" class="footer__link">Blog</router-link>
      </div>
      <hr class="footer__divider" />

      <FooterSocials />
      <p class="footer__copyright">© HiJiffy 2021. We love our users!</p>
    </div>
  </footer>
</template>

<script>
import FooterSocials from "./FooterSocials";
export default {
  name: "Footer",
  components: {
    FooterSocials,
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding-bottom: 60px;
  max-height: 250px;
  .footer__nav {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer__link {
      text-decoration: none;
      color: $fontdark;
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 24px;
      width: 100px;
      text-align: center;
    }
    .footer__logo {
      width: 80px;
      height: 55px;
    }
  }
  .footer__divider {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 90vw;
    border-top: 1px solid black;
  }
  .footer__copyright {
    margin-top: 50px;
    text-align: center;
  }
}
header {
  color: yellow;
}
</style>