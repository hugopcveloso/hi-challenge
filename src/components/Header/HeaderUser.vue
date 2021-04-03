<template>
  <div class="header__user">
    <div class="user__notifications">
      <svg
        width="18"
        height="21"
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 17.2071V17.5H0.5V17.2071L2.35355 15.3536L2.5 15.2071V15V10C2.5 7.09437 4.02219 4.78092 6.61528 4.16653L7 4.07538V3.68V3C7 2.44614 7.44614 2 8 2C8.55386 2 9 2.44614 9 3V3.68V4.07506L9.38434 4.16644C11.9681 4.78076 13.5 7.10482 13.5 10V15V15.2071L13.6464 15.3536L15.5 17.2071ZM9.41352 19.5C9.20605 20.0806 8.64884 20.5 8 20.5C7.34433 20.5 6.79074 20.0813 6.58536 19.5H9.41352Z"
          fill="white"
          stroke="#C2CFE0"
        />
        <circle cx="13" cy="5" r="4.5" fill="#F7685B" stroke="white" />
      </svg>
    </div>

    <img class="user__avatar" src="../../assets/user-avatar.jpg" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header__user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.user__notifications {
  margin-right: 40px;
}
img {
  height: 40px;
  border-radius: 50%;
}
</style>

